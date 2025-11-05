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
            { title: 'Math Club Meeting', date: '2025-11-15' },
            { title: 'Basketball Game', date: '2025-11-21' }
        ]
    });

    calendar.render();
});