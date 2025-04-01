document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('add-event-form');
    const eventList = document.getElementById('event-list');

    // Load events
    function loadEvents() {
        fetch('/api/my-events')
            .then(response => response.json())
            .then(events => {
                eventList.innerHTML = '';
                events.forEach(event => {
                    const eventElement = createEventElement(event);
                    eventList.appendChild(eventElement);
                });
            })
            .catch(error => {
                console.error('Error loading events:', error);
                eventList.innerHTML = '<p>Error loading events. Please try again.</p>';
            });
    }

    // Create event element
    function createEventElement(event) {
        const div = document.createElement('div');
        div.className = 'event-card';
        
        const date = new Date(event.date).toLocaleDateString();
        
        div.innerHTML = `
            <div class="event-info">
                <h4>${event.title}</h4>
                <p>Date: ${date}</p>
                <p>Location: ${event.location}</p>
                <p>Category: ${event.category}</p>
                <p>Price: $${event.price}</p>
            </div>
            <button class="delete-btn" data-id="${event._id}">Delete</button>
        `;

        // Add delete event listener
        const deleteBtn = div.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteEvent(event._id));

        return div;
    }

    // Add event
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(eventForm);
        const eventData = Object.fromEntries(formData.entries());

        fetch('/api/add-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData)
        })
        .then(response => response.json())
        .then(data => {
            eventForm.reset();
            loadEvents();
        })
        .catch(error => {
            console.error('Error adding event:', error);
            alert('Error adding event. Please try again.');
        });
    });

    // Delete event
    function deleteEvent(id) {
        if (confirm('Are you sure you want to delete this event?')) {
            fetch(`/api/remove-event/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                loadEvents();
            })
            .catch(error => {
                console.error('Error deleting event:', error);
                alert('Error deleting event. Please try again.');
            });
        }
    }

    // Initial load
    loadEvents();
}); 