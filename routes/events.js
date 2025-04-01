const express = require('express');
const router = express.Router();

// GET /my-events - Get all events
router.get('/my-events', async (req, res) => {
    try {
        // ... existing code ...
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /add-event - Add a new event
router.post('/add-event', async (req, res) => {
    try {
        const event = new Event({
            title: req.body.title,
            date: req.body.date,
            location: req.body.location,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            image: req.body.image
        });
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /remove-event/:id - Remove an event
router.delete('/remove-event/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        await event.remove();
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 