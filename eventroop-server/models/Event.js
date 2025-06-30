const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  postedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postedByName: String,
  date: String,
  location: { type: String, required: true },
  description: { type: String },
  attendeeCount: { type: Number, default: 0 },
  attendeeId: Array
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;