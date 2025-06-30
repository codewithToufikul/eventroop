const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, eventController.getAllEvents);

router.get('/my-events/:id', verifyToken, eventController.getMyEvents);

router.post('/', verifyToken, eventController.createEvent);

router.put('/:id', verifyToken, eventController.updateEvent);

router.delete('/:id', verifyToken, eventController.deleteEvent);

router.post('/join-event/:eventId', verifyToken, eventController.joinEvent)

module.exports = router;
