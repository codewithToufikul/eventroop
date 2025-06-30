import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/AuthContext';
import axiosInstance from '../../Hooks/axiosInstance';
import Loading from '../../components/Loading';
import { Calendar, MapPin, Users, Edit, Trash2, X, Save } from 'lucide-react';
import { useAlert } from '../../components/AlertContext';

function MyEvents() {
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const { user, userLoading } = useAuth();
    const { showAlert } = useAlert();

  const [updateForm, setUpdateForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: ''
  });

useEffect(() => {
  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/api/events/my-events/${user._id}`);
      setMyEvents(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch my events:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!userLoading && user?._id) {
    fetchMyEvents();
  }
}, [user, userLoading]);

if (userLoading || loading) return <Loading />;

  const handleUpdateClick = (event) => {
    setSelectedEvent(event);
    const eventDate = new Date(event.date);
    setUpdateForm({
      title: event.title || '',
      description: event.description || '',
      date: eventDate.toISOString().split('T')[0],
      time: eventDate.toTimeString().slice(0, 5),
      location: event.location || ''
    });
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      setUpdateLoading(true);
      const updatedDateTime = new Date(`${updateForm.date}T${updateForm.time}`);
      
      const updatedEvent = {
        title: updateForm.title,
        description: updateForm.description,
        date: updatedDateTime.toISOString(),
        location: updateForm.location
      };

      const res = await axiosInstance.put(`/api/events/${selectedEvent._id}`, updatedEvent);
      
      setMyEvents(myEvents.map(event => 
        event._id === selectedEvent._id ? { ...event, ...updatedEvent } : event
      ));
      
      setShowUpdateModal(false);
      setSelectedEvent(null);
    } catch (err) {
      console.error("❌ Failed to update event:", err);
    } finally {
      setUpdateLoading(false);
    }
  };

const handleDeleteEvent = async (eventId) => {
  showAlert({
    message: "Are you sure you want to Delete?",
    onConfirm: async () => {
      try {
        setDeleteLoading(eventId);
        await axiosInstance.delete(`/api/events/${eventId}`);
        setMyEvents(prevEvents =>
          prevEvents.filter(event => event._id !== eventId)
        );
      } catch (err) {
        console.error("❌ Failed to delete event:", err);
      } finally {
        setDeleteLoading(null);
      }
    },
    onCancel: () => {
      console.log("❌ Delete cancelled");
    },
  });
};


  const formatDateTime = (date) => {
    const eventDate = new Date(date);
    return {
      date: eventDate.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: eventDate.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-teal-800 mb-2">🎉 My Events</h1>
          <p className="text-teal-600">Manage your created events</p>
        </div>

        {/* Events Grid */}
        {myEvents.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Events Yet</h3>
              <p className="text-gray-500">You haven't created any events yet. Start by creating your first event!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myEvents.map(event => {
              const { date, time } = formatDateTime(event.date);
              
              return (
                <div key={event._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-teal-100">
                  {/* Event Header */}
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 rounded-t-2xl">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{event.title}</h3>
                    <div className="flex items-center text-teal-100">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">By {event.createdBy?.name || user?.name || 'You'}</span>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6 space-y-4">
                    {/* Date and Time */}
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-3 text-teal-500" />
                      <div>
                        <div className="font-medium">{date}</div>
                        <div className="text-sm text-gray-500">{time}</div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-3 text-teal-500" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>

                    {/* Description */}
                    <div className="text-gray-700">
                      <p className="line-clamp-3 text-sm leading-relaxed">{event.description}</p>
                    </div>

                    {/* Attendee Count */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-teal-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">
                          {event.attendeeCount || 0} Attendees
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleUpdateClick(event)}
                        className="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium"
                      >
                        <Edit className="w-4 h-4" />
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event._id)}
                        disabled={deleteLoading === event._id}
                        className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium"
                      >
                        {deleteLoading === event._id ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Update Modal */}
        {showUpdateModal && (
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(8px)'
          }} className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-teal-800">Update Event</h2>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Title
                  </label>
                  <input
                    type="text"
                    value={updateForm.title}
                    onChange={(e) => setUpdateForm({...updateForm, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter event title"
                    required
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={updateForm.date}
                      onChange={(e) => setUpdateForm({...updateForm, date: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={updateForm.time}
                      onChange={(e) => setUpdateForm({...updateForm, time: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={updateForm.location}
                    onChange={(e) => setUpdateForm({...updateForm, location: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter event location"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={updateForm.description}
                    onChange={(e) => setUpdateForm({...updateForm, description: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Describe your event"
                    required
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowUpdateModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdateSubmit}
                    disabled={updateLoading}
                    className="flex-1 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
                  >
                    {updateLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                    {updateLoading ? 'Updating...' : 'Update Event'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyEvents;