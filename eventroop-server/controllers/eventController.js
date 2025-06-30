const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyEvents = async (req, res) => {
    try {
        const { id } = req.params;
        const events = await Event.find({ postedById: id }).sort({ date: -1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, postedById, postedByName, date, location, description } = req.body;
    const event = new Event({ title, postedById, postedByName, date, location, description });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.joinEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.body;
    console.log(userId, eventId)
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.attendeeId.includes(userId)) {
      return res.status(400).json({ message: "You already joined this event!" });
    }

    event.attendeeId.push(userId);
    event.attendeeCount = event.attendeeId.length; 

    await event.save();
    res.json({ message: "Joined event successfully!", event });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
