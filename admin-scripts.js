document.addEventListener('DOMContentLoaded', () => {
    const eventList = document.getElementById('event-list');
    const addEventForm = document.getElementById('add-event-form');

    // --- Fetch and Display Events ---
    async function fetchEvents() {
        try {
            const response = await fetch('/api/my-events'); // Use the correct API endpoint
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const events = await response.json();

            eventList.innerHTML = ''; // Clear loading message or previous list

            if (events.length === 0) {
                eventList.innerHTML = '<p>No events found.</p>';
                return;
            }

            events.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.classList.add('event-list-item');
                // Format date for better readability
                const eventDate = new Date(event.date).toLocaleDateString('en-US', {
                     year: 'numeric', month: 'long', day: 'numeric'
                });

                eventElement.innerHTML = `
                    <div>
                        <h4>${event.title}</h4>
                        <p><strong>Date:</strong> ${eventDate}</p>
                        <p><strong>Location:</strong> ${event.location}</p>
                        <p><strong>Category:</strong> ${event.category}</p>
                        <p><strong>Price:</strong> $${event.price.toFixed(2)}</p>
                        <p><em>ID: ${event._id}</em></p> {/* Display ID for reference */}
                    </div>
                    <button class="delete-button" data-id="${event._id}">Delete</button>
                `;

                // Add event listener for the delete button
                const deleteButton = eventElement.querySelector('.delete-button');
                deleteButton.addEventListener('click', () => {
                    deleteEvent(event._id);
                });

                eventList.appendChild(eventElement);
            });

        } catch (error) {
            console.error('Error fetching events:', error);
            eventList.innerHTML = '<p>Error loading events. Please try again later.</p>';
        }
    }

    // --- Add New Event ---
    addEventForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = new FormData(addEventForm);
        const eventData = Object.fromEntries(formData.entries());

        // Basic validation (ensure price is a number)
        eventData.price = parseFloat(eventData.price);
        if (isNaN(eventData.price)) {
             alert('Please enter a valid price.');
             return;
        }

        try {
            const response = await fetch('/api/add-event', { // Use the correct API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const newEvent = await response.json();
            console.log('Event added:', newEvent);
            addEventForm.reset(); // Clear the form
            fetchEvents(); // Refresh the event list

        } catch (error) {
            console.error('Error adding event:', error);
            alert(`Error adding event: ${error.message}`);
        }
    });

    // --- Delete Event ---
    async function deleteEvent(eventId) {
        if (!confirm('Are you sure you want to delete this event?')) {
            return; // Do nothing if user cancels
        }

        try {
            const response = await fetch(`/api/remove-event/${eventId}`, { // Use the correct API endpoint
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Event deleted:', result.message);
            fetchEvents(); // Refresh the event list

        } catch (error) {
            console.error('Error deleting event:', error);
            alert(`Error deleting event: ${error.message}`);
        }
    }

    // --- Initial Load ---
    fetchEvents();
}); 