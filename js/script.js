//Calendar Initialization
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
    });

    calendar.render();
});