// src/pages/Calendar.jsx
import React, { useState, useRef } from 'react';
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from '@syncfusion/ej2-react-schedule';

export default function Calendar() {
  const [events, setEvents] = useState([
    { Id: 1, Subject: 'Team Meeting', StartTime: new Date(2025,5,21,10,0), EndTime: new Date(2025,5,21,11,0) },
    { Id: 2, Subject: 'Product Demo', StartTime: new Date(2025,5,22,14,0), EndTime: new Date(2025,5,22,15,30) },
  ]);

  const [subject, setSubject]     = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime]     = useState('');
  const nextId = useRef(3);

  const addEvent = () => {
    if (!subject || !startTime || !endTime) return;
    const start = new Date(startTime), end = new Date(endTime);
    if (end <= start) return alert('End must be after start');
    setEvents([...events, { Id: nextId.current++, Subject: subject, StartTime: start, EndTime: end }]);
    setSubject(''); setStartTime(''); setEndTime('');
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gray-200 dark:bg-bg text-fg transition-colors">
      {/* Form */}
      <div className="mb-4 bg-bg dark:bg-bg p-4 rounded-lg shadow border
                      flex flex-col sm:flex-row sm:items-end gap-4">
        <input
          type="text"
          placeholder="Event title"
          value={subject}
          onChange={e=>setSubject(e.target.value)}
          className="flex-1 px-3 py-2 bg-bg dark:bg-gray-300 border rounded
                     focus:ring focus:ring-primary/50 text-fg"
        />
        <input
          type="datetime-local"
          value={startTime}
          onChange={e=>setStartTime(e.target.value)}
          className="px-3 py-2 bg-bg dark:bg-gray-300 border rounded
                     focus:ring focus:ring-primary/50 text-fg"
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={e=>setEndTime(e.target.value)}
          className="px-3 py-2 bg-bg dark:bg-gray-300 border rounded
                     focus:ring focus:ring-primary/50 text-fg"
        />
        <button
          onClick={addEvent}
          className="px-4 py-2 bg-primary text-bg rounded hover:bg-secondary transition-colors"
        >
          Add Event
        </button>
      </div>

      {/* Responsive Calendar */}
      <div
        className="
          w-full 
          md:w-3/4 
          lg:w-2/3 
          xl:w-2/3
          mx-auto 
          flex-1 
          bg-bg dark:bg-bg
          rounded-lg shadow border border-gray-200 dark:border-gray-700
          overflow-hidden
        "
      >
        <ScheduleComponent
          width="100%"
          height="100%"
          selectedDate={new Date()}
          eventSettings={{ dataSource: events }}
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </div>
    </div>
  );
}
