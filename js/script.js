console.log("Script loaded");

//Map loader
window.onload = function() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY21veTA3IiwiYSI6ImNtaG1pbzYybjBldGIyanB2cWc5d3I2bWwifQ.Dt6Kn6SgzBmKqw4rPx1T_A';

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-84.059, 41.899], // Cords for center of AC
        zoom: 14
    });

    // Add zoom + rotate controls
    map.addControl(new mapboxgl.NavigationControl());

    // Optional: marker
    new mapboxgl.Marker()
        .setLngLat([-84.059, 41.899])
        .setPopup(new mapboxgl.Popup().setHTML("<h4>Adrian College</h4>"))
        .addTo(map);
};

// EVENT Calendar Initialization
document.addEventListener('DOMContentLoaded', function() {

    const calendarEl = document.getElementById('event_calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        
        buttonText: {
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day'
        },
        
        events: [ //Future Events added here for testing
            {
                title: 'Math Club Meeting',
                start: '2025-11-15T14:00',
                end:  '2025-11-15T16:00',
                description: 'Meetings held every week. Join if you like to stretch your math mind!',
                hostProfile: 'Current Math Grads',
                hostContact: 'Curr_Math_Grads@university.edu',
            },
            {
                title: 'Basketball Game', 
                start: '2025-11-21T19:30',
                description: 'Come watch the warthogs play against the reigning champs: the Bumblebees! Concessions are available on the stadiums main floor.',
                hostProfile: 'Campus Sports',
                hostContact: 'sports@university.edu',
            },
        ],

        eventClick: function (info) {
            // Prevent calendar from navigating
            info.jsEvent.preventDefault();

            // Update tab content
            document.querySelector('#summary-tab-pane p').textContent =
                info.event.extendedProps.description ?? 'No description provided.';

            document.querySelector('#profile-tab-pane p').textContent =
                info.event.extendedProps.hostProfile ?? 'No host profile available.';

            document.querySelector('#contact-tab-pane p').textContent =
                info.event.extendedProps.hostContact ?? 'No contact info available.';

            // Switch to the "Summary" tab when event is clicked
            const trigger = document.querySelector('#summary-tab');
            const tab = new bootstrap.Tab(trigger);
            tab.show();
        }

    });

    calendar.render();

    document.getElementById('add_event_btn').addEventListener('click', function () {
        const title = document.getElementById('event_title').value;

        const startDate = document.getElementById('event_start_date').value;
        const startTime = document.getElementById('event_start_time').value;

        const endDate = document.getElementById('event_end_date').value;
        const endTime = document.getElementById('event_end_time').value;

        // Validate required fields
        if (!title || !startDate || !startTime || !endDate || !endTime) {
            alert("Please fill out all fields (start & end).");
            return;
        }

        const startDateTime = `${startDate}T${startTime}`;
        const endDateTime = `${endDate}T${endTime}`;

        // Make sure end date is after start date
        if (new Date(endDateTime) <= new Date(startDateTime)) {
            alert("End time must be after start time.");
            return;
        }

        // Add event to FullCalendar
        calendar.addEvent({
            title: title,
            start: startDateTime,
            end: endDateTime
        });

        // Clear form
        document.querySelectorAll('#new_event_form input').forEach(i => i.value = "");
    });
});

// DINING Calendar Initialization
document.addEventListener('DOMContentLoaded', function() {

    const calendarEl = document.getElementById('dining_calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        
        buttonText: {
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day'
        },
        
        events: [ //Future Events added here for testing
            {
                title: 'Monkey Bread!',
                date: '2025-11-15'
            },
        ]

    });

    calendar.render();
});

// Temporary in-memory storage (deleted on refresh)
let posts = [
    {
        title: "Welcome to the Student Forums!",
        user: "Admin",
        category: "General",
        body: "This is a sample post to show how posts will appear here.",
        time: new Date().toLocaleString()
    }
];

renderPosts();

// Handle form submit
document.getElementById("postForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("post_title").value;
    const user = document.getElementById("post_user").value;
    const category = document.getElementById("post_category").value;
    const body = document.getElementById("post_body").value;

    // Create post object
    const post = {
        title,
        user,
        category,
        body,
        time: new Date().toLocaleString()
    };

    // Store in memory only
    posts.push(post);

    // Re-render posts
    renderPosts();

    // Reset form fields
    document.getElementById("postForm").reset();
});

function renderPosts() {
    const container = document.getElementById("post_list");
    container.innerHTML = ""; // Clear previous posts

    posts.forEach(post => {
        const card = document.createElement("div");
        card.classList = "card p-3 mb-3 border-dark border-3";

        card.innerHTML = `
            <h4>${post.title}</h4>
            <p class="text-muted mb-1">Posted by <strong>${post.user}</strong> in <em>${post.category}</em></p>
            <p class="text-muted">${post.time}</p>
            <p>${post.body}</p>
        `;

        container.appendChild(card);
    });
}