import React, { useEffect, useState } from 'react';
import { CalendarDays, MapPin, UserPlus, Search, Filter, Calendar, Users, Clock } from 'lucide-react';

function Events() {
  const [events, setEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [customDate, setCustomDate] = useState('');
  const [dateRangeStart, setDateRangeStart] = useState('');
  const [dateRangeEnd, setDateRangeEnd] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const dummyData = [
      {
        _id: '1',
        title: 'Tech Conference 2025',
        postedBy: 'Toufikul Islam',
        dateTime: '2025-07-01T18:00',
        location: 'Dhaka Convention Center',
        description: 'Join the most anticipated tech event of the year! Discover cutting-edge technologies and network with industry leaders.',
        attendeeCount: 23
      },
      {
        _id: '2',
        title: 'Startup Pitch Fest',
        postedBy: 'Imran Hossain',
        dateTime: '2025-06-29T14:30',
        location: 'Sylhet Startup Hub',
        description: 'Present your startup and win funding! Connect with investors and mentors.',
        attendeeCount: 10     },
      {
        _id: '3',
        title: 'AI for Bangladesh',
        postedBy: 'Ayesha Nasrin',
        dateTime: '2025-06-30T16:00',
        location: 'Chittagong AI Center',
        description: 'Learn how AI is transforming Bangladesh and shaping our future.',
        attendeeCount: 45
      },
      {
        _id: '4',
        title: 'Digital Marketing Workshop',
        postedBy: 'Rashid Ahmed',
        dateTime: '2025-06-25T10:00',
        location: 'Rajshahi Business Center',
        description: 'Master the art of digital marketing with hands-on experience.',
        attendeeCount: 32      },
      {
        _id: '5',
        title: 'Web Development Bootcamp',
        postedBy: 'Fatima Khan',
        dateTime: '2025-06-22T09:00',
        location: 'Dhaka Tech Hub',
        description: 'Intensive bootcamp covering modern web development technologies.',
        attendeeCount: 18
      }
    ];

    const sorted = dummyData.sort(
      (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
    );
    setEvents(sorted);
  }, []);

  const getDateRange = (filter) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (filter) {
      case 'today':
        return {
          start: today,
          end: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        };
      case 'current-week':
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 7);
        return { start: startOfWeek, end: endOfWeek };
      case 'last-week':
        const lastWeekStart = new Date(today);
        lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
        const lastWeekEnd = new Date(lastWeekStart);
        lastWeekEnd.setDate(lastWeekStart.getDate() + 7);
        return { start: lastWeekStart, end: lastWeekEnd };
      case 'current-month':
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        return { start: startOfMonth, end: endOfMonth };
      case 'last-month':
        const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 1);
        return { start: lastMonthStart, end: lastMonthEnd };
      case 'custom-date':
        if (customDate) {
          const selectedDate = new Date(customDate);
          const nextDay = new Date(selectedDate);
          nextDay.setDate(selectedDate.getDate() + 1);
          return { start: selectedDate, end: nextDay };
        }
        return null;
      case 'date-range':
        if (dateRangeStart && dateRangeEnd) {
          const startDate = new Date(dateRangeStart);
          const endDate = new Date(dateRangeEnd);
          endDate.setDate(endDate.getDate() + 1);
          return { start: startDate, end: endDate };
        }
        return null;
      default:
        return null;
    }
  };

  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (dateFilter !== 'all') {
      const dateRange = getDateRange(dateFilter);
      if (dateRange) {
        filtered = filtered.filter(event => {
          const eventDate = new Date(event.dateTime);
          return eventDate >= dateRange.start && eventDate < dateRange.end;
        });
      }
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, dateFilter, customDate, dateRangeStart, dateRangeEnd]);

  const handleJoin = (id) => {
    if (joinedEvents.includes(id)) return;

    setEvents(prev =>
      prev.map(event =>
        event._id === id
          ? { ...event, attendeeCount: event.attendeeCount + 1 }
          : event
      )
    );
    setJoinedEvents([...joinedEvents, id]);
  };

  const isEventToday = (dateTime) => {
    const eventDate = new Date(dateTime);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  };

  const isEventUpcoming = (dateTime) => {
    const eventDate = new Date(dateTime);
    const now = new Date();
    return eventDate > now;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
            🎉 Discover Amazing Events
          </h1>
          <p className="text-gray-600 text-lg">Find and join events that inspire you</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 backdrop-blur-sm border border-gray-100">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={dateFilter}
                  onChange={(e) => {
                    setDateFilter(e.target.value);
                    if (e.target.value !== 'custom-date') setCustomDate('');
                    if (e.target.value !== 'date-range') {
                      setDateRangeStart('');
                      setDateRangeEnd('');
                    }
                  }}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white min-w-[200px] transition-all duration-200"
                >
                  <option value="all">All Events</option>
                  <option value="today">Today</option>
                  <option value="current-week">Current Week</option>
                  <option value="last-week">Last Week</option>
                  <option value="current-month">Current Month</option>
                  <option value="last-month">Last Month</option>
                  <option value="custom-date">Custom Date</option>
                  <option value="date-range">Date Range</option>
                </select>
              </div>
            </div>

            {dateFilter === 'custom-date' && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Calendar className="w-5 h-5 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">Select Date:</label>
                <input
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
                {customDate && (
                  <button
                    onClick={() => {
                      setCustomDate('');
                      setDateFilter('all');
                    }}
                    className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            )}

            {dateFilter === 'date-range' && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl flex-wrap">
                <Calendar className="w-5 h-5 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">Date Range:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={dateRangeStart}
                    onChange={(e) => setDateRangeStart(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    placeholder="Start date"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="date"
                    value={dateRangeEnd}
                    onChange={(e) => setDateRangeEnd(e.target.value)}
                    min={dateRangeStart}
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    placeholder="End date"
                  />
                  {(dateRangeStart || dateRangeEnd) && (
                    <button
                      onClick={() => {
                        setDateRangeStart('');
                        setDateRangeEnd('');
                        setDateFilter('all');
                      }}
                      className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center gap-4 text-sm text-gray-600 flex-wrap">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Showing {filteredEvents.length} events</span>
            </div>
            {searchTerm && (
              <div className="flex items-center gap-1">
                <Search className="w-4 h-4" />
                <span>Search: "{searchTerm}"</span>
              </div>
            )}
            {dateFilter === 'custom-date' && customDate && (
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                <span>Date: {new Date(customDate).toLocaleDateString()}</span>
              </div>
            )}
            {dateFilter === 'date-range' && dateRangeStart && dateRangeEnd && (
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                <span>
                  Range: {new Date(dateRangeStart).toLocaleDateString()} - {new Date(dateRangeEnd).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {filteredEvents.map(event => (
              <div key={event._id} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors">
                          {event.title}
                        </h2>
                        {isEventToday(event.dateTime) && (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                            Today
                          </span>
                        )}
                        {isEventUpcoming(event.dateTime) && !isEventToday(event.dateTime) && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                            Upcoming
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        Posted by <span className="font-medium text-gray-700">{event.postedBy}</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="flex items-center justify-center w-10 h-10 bg-teal-100 rounded-lg">
                        <CalendarDays className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {new Date(event.dateTime).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(event.dateTime).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-800">{event.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed">{event.description}</p>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                        <Users className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{event.attendeeCount} attendees</span>
                    </div>
                    <button
                      disabled={joinedEvents.includes(event._id)}
                      onClick={() => handleJoin(event._id)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                        joinedEvents.includes(event._id)
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:from-teal-700 hover:to-blue-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      <UserPlus className="w-4 h-4" />
                      {joinedEvents.includes(event._id) ? 'Joined' : 'Join Event'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;