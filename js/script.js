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
                end:  '2025-11-15T16:00'
            },
            {
                title: 'Basketball Game', 
                start: '2025-11-21T19:30',
            },
        ]

        // Eventually add event click-ability and their info pop ups in the info tab
    });

    calendar.render();

    // Add event button
    document.getElementById('add_event_btn').addEventListener('click', function () {
        const title = document.getElementById('event_title').value;
        const date = document.getElementById('event_date').value;
        const time = document.getElementById('event_time').value;

        if (!title || !date || !time) {
            alert("Please fill out all fields.");
            return;
        }

        const startDateTime = `${date}T${time}`;

        // Add event to calendar
        calendar.addEvent({
            title: title,
            start: startDateTime
        });

        // Clear form
        document.getElementById('event_title').value = "";
        document.getElementById('event_date').value = "";
        document.getElementById('event_time').value = "";
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