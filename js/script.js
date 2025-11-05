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
