const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['outdoor', 'sports', 'networking', 'nightlife']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);

// Save event to localStorage
function saveEvent(event) {
    let events = getEvents();
    event.id = Date.now(); // Simple way to generate unique IDs
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
}

// Get all events from localStorage
function getEvents() {
    const events = localStorage.getItem('events');
    return events ? JSON.parse(events) : [];
}

// Delete event from localStorage
function deleteEvent(eventId) {
    let events = getEvents();
    events = events.filter(event => event.id !== eventId);
    localStorage.setItem('events', JSON.stringify(events));
}

// Usage in your form submission:
eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(eventForm);
    const eventData = Object.fromEntries(formData.entries());
    saveEvent(eventData);
    eventForm.reset();
    loadEvents(); // Refresh the display
});