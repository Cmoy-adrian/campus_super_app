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
            {
                title: 'Halloween Celebration', 
                start: '2025-10-31',
                description: 'This year we are celebrating halloween with a scavenger hunt & trick or treating!',
                hostProfile: 'Campus Festivities',
                hostContact: 'festivities@university.edu',
            },
            {
                title: 'Dios de Los Muertos', 
                start: '2025-11-01',
                end: '2025-11-02T11:59',
                description: 'Celebrate the Day of The Dead with us!',
                hostProfile: 'Campus Festivities',
                hostContact: 'festivities@university.edu',
            },
            {
                title: 'Winter Festival', 
                start: '2025-12-12',
                end: '2025-12-15T11:59',
                description: 'Join us for games, food, and other festivities as we celebrate the winter season!',
                hostProfile: 'Campus Festivities',
                hostContact: 'festivities@university.edu',
            },
        ],

        // Connect Calendar to Info Panel.
        eventClick: function (info) {
            info.jsEvent.preventDefault();

            // Format start & end times
            const start = info.event.start;
            const end = info.event.end;

            const formatOptions = {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
            };

            const startStr = start ? start.toLocaleString([], formatOptions) : "No start time";
            const endStr   = end ? end.toLocaleString([], formatOptions) : "No end time specified";

            // Summary tab
            const summaryHTML = `
                <strong>${info.event.title}</strong><br>
                <strong>Starts:</strong> ${startStr}<br>
                <strong>Ends:</strong> ${endStr}<br><br>
                <strong>Description:</strong><br>
                ${info.event.extendedProps.description ?? 'No description provided.'}
            `;

            document.querySelector('#summary-tab-pane').innerHTML = summaryHTML;

            // Host Profile tab
            const profileHTML = `
                <strong>Host Profile</strong><br><br>
                ${info.event.extendedProps.hostProfile ?? 'No host profile available.'}
            `;

            document.querySelector('#profile-tab-pane').innerHTML = profileHTML;

            // Host Contact tab
            const contactHTML = `
                <strong>Contact Information</strong><br><br>
                ${info.event.extendedProps.hostContact ?? 'No contact information available.'}
            `;

            document.querySelector('#contact-tab-pane').innerHTML = contactHTML;

            // Switch to Summary tab
            const trigger = document.querySelector('#summary-tab');
            const tab = new bootstrap.Tab(trigger);
            tab.show();
        }

    });

    calendar.render();

    // Auto-fill End Date/Time Function
    function updateEndFields() {
        const startDate = document.getElementById('event_start_date').value;
        const startTime = document.getElementById('event_start_time').value;

        if (!startDate || !startTime) return;

        const start = new Date(`${startDate}T${startTime}`);
        const end = new Date(start.getTime() + 60 * 60 * 1000); // +1 hour

        document.getElementById('event_end_date').value = end.toISOString().slice(0, 10);
        document.getElementById('event_end_time').value = end.toTimeString().slice(0, 5);
    }

    // Listen for start date/time changes
    document.getElementById('event_start_date').addEventListener('change', updateEndFields);
    document.getElementById('event_start_time').addEventListener('change', updateEndFields);

    // Add Event Form (Button functionality)
    document.getElementById('add_event_btn').addEventListener('click', function () {
        const title = document.getElementById('event_title').value;

        const startDate = document.getElementById('event_start_date').value;
        const startTime = document.getElementById('event_start_time').value;

        const endDate = document.getElementById('event_end_date').value;
        const endTime = document.getElementById('event_end_time').value;

        const eventDes = document.getElementById('event_description').value;

        // Validate required fields
        if (!title || !startDate || !startTime || !endDate || !endTime || !eventDes) {
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
            end: endDateTime,
            description: eventDes,
        });

        // Clear form
        document.querySelectorAll('#new_event_form input, #new_event_form textarea').forEach(i => i.value = "");
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
                date: '2025-11-15',
                diningHall: 'Main Dining Hall',
                description: 'Fresh baked Monkey Bread served warm!',
            },
            {
                title: 'Chicken Alfredo',
                date: '2025-11-22',
                diningHall: 'North Hall',
                description: 'Creamy Alfredo served fresh.',
            },
            {
                title: 'Spaghetti',
                date: '2025-11-25',
                diningHall: 'South Hall',
                description: 'Spaghetti served with homemade meat sauce.',
            },
        ],

        eventClassNames: function(arg) {
            const hall = arg.event.extendedProps.diningHall;
            if (hall === 'Main Dining Hall') return ['event-main'];
            if (hall === 'North Hall') return ['event-north'];
            if (hall == 'South Hall') return ['event-south'];
            return [];
        },

        eventDidMount: function(info) {
            const hall = info.event.extendedProps.diningHall;
            const desc = info.event.extendedProps.description;

            const tooltipText = `
                <b>${hall}</b><br>
                ${desc}
            `;

            info.el.setAttribute('data-bs-toggle', 'tooltip');
            info.el.setAttribute('data-bs-placement', 'top');
            info.el.setAttribute('data-bs-html', 'true');
            info.el.setAttribute('title', tooltipText);

            new bootstrap.Tooltip(info.el);
        }

    });

    calendar.render();
});

// Load existing posts from localStorage OR use default sample
let posts = JSON.parse(localStorage.getItem("forum_posts")) || [
    {
        title: "Welcome to the Student Forums!",
        user: "Admin",
        category: "General",
        body: "This is a sample post to show how posts will appear here.",
        time: new Date().toLocaleString(),
        upvotes: 0,
        comments: []
    }
];

function savePosts() {
    localStorage.setItem("forum_posts", JSON.stringify(posts));
};

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
        time: new Date().toLocaleString(),
        upvotes: 0,
        comments: []
    };

    posts.unshift(post); // new posts appear at top
    savePosts();
    renderPosts();

    // Re-render posts
    renderPosts();

    // Reset form fields
    document.getElementById("postForm").reset();
});

function renderPosts() {
    const container = document.getElementById("post_list");
    container.innerHTML = "";

    posts.forEach((post, index) => {
        const card = document.createElement("div");
        card.classList = "card p-3 mb-3 border-dark border-3";

        card.innerHTML = `
            <h4>${post.title}</h4>
            <p class="text-muted mb-1">
                Posted by <strong>${post.user}</strong>
                in <em>${post.category}</em>
            </p>
            <p class="text-muted">${post.time}</p>
            <p>${post.body}</p>

            <!-- Upvote Button -->
            <button class="btn btn-outline-dark btn-sm mb-2" onclick="upvote(${index})">
                👍 ${post.upvotes}
            </button>

            <!-- Comment Section -->
            <div class="mt-3">
                <h6>Comments</h6>
                <div id="comments_${index}">
                    ${post.comments.map(c => `<p class="ms-3">• ${c}</p>`).join("")}
                </div>

                <input id="comment_input_${index}" 
                       class="form-control form-control-sm mt-2" 
                       placeholder="Add a comment...">

                <button class="btn btn-secondary btn-sm mt-2" onclick="addComment(${index})">
                    Post Comment
                </button>
            </div>
        `;

        container.appendChild(card);
    });
}

function upvote(index) {
    posts[index].upvotes++;
    savePosts();
    renderPosts();
}

function addComment(index) {
    const input = document.getElementById(`comment_input_${index}`);
    const text = input.value.trim();

    if (!text) return;

    posts[index].comments.push(text);
    savePosts();
    renderPosts();
}