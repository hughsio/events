// routes/events.js

const express = require('express');
const router = express.Router();

// Mock database
let events = [];

// Middleware to simulate user authentication
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token === 'Bearer valid-token') {
        next();
    } else {
        res.sendStatus(403);
    }
}

// Route to add an event
router.post('/add-event', authenticateToken, (req, res) => {
    const { eventId, name, description } = req.body;
    events.push({ id: eventId, name, description });
    res.json({ success: true, message: 'Event added successfully' });
});

// Route to remove an event
router.delete('/remove-event/:eventId', authenticateToken, (req, res) => {
    const { eventId } = req.params;
    events = events.filter(event => event.id !== eventId);
    res.json({ success: true, message: 'Event removed successfully' });
});

// Route to get all events
router.get('/my-events', authenticateToken, (req, res) => {
    res.json({ success: true, events });
});

module.exports = router;
