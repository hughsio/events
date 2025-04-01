// index.js

const express = require('express');
const bodyParser = require('body-parser');
const eventsRouter = require('./routes/events');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Use the events router for /api/events routes
app.use('/api/events', eventsRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
