// src/pages/Kanban.jsx
import React, { useState } from 'react';
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective
} from '@syncfusion/ej2-react-kanban';

// Initial dummy data
const initialData = [
  { Id: 'Task 1', Status: 'To Do',       Summary: 'Set up project repo',   Assignee: 'Alice'   },
  { Id: 'Task 2', Status: 'To Do',       Summary: 'Install dependencies',   Assignee: 'Bob'     },
  { Id: 'Task 3', Status: 'In Progress', Summary: 'Build Sidebar',          Assignee: 'Charlie' },
  { Id: 'Task 4', Status: 'In Progress', Summary: 'Implement Navbar',       Assignee: 'Diana'   },
  { Id: 'Task 5', Status: 'Done',        Summary: 'Configure Routing',      Assignee: 'Evan'    },
  { Id: 'Task 6', Status: 'Done',        Summary: 'Add Dark Mode support', Assignee: 'Alice'   }
];

export default function Kanban() {
  const [cards, setCards]           = useState(initialData);
  const [newSummary, setNewSummary] = useState('');
  const [newStatus, setNewStatus]   = useState('To Do');

  const handleAddTask = () => {
    if (!newSummary.trim()) return;
    const nextId = cards.length + 1;
    setCards([
      { Id: `Task ${nextId}`, Status: newStatus, Summary: newSummary.trim(), Assignee: 'Alice' },
      ...cards
    ]);
    setNewSummary('');
    setNewStatus('To Do');
  };

  return (
    <div className="p-6 bg-bg text-fg transition-colors">
      {/* Outer panel */}
      <div className="bg-bg dark:bg-bg rounded-lg  p-6 space-y-6">
        
        {/* Violet‐themed Header + New Task Form */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-primary dark:text-primary">
            Kanban Board
          </h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-2 bg-violet-50 dark:bg-violet-100 p-4 rounded-lg border border-violet-200 dark:border-violet-700">
            <input
              type="text"
              placeholder="New task summary"
              className="
                flex-1 px-4 py-2
                
                rounded focus:outline-none focus:ring focus:ring-violet-300
                bg-bg dark:bg-bg
                text-violet-800 dark:text-violet-800
              "
              value={newSummary}
              onChange={e => setNewSummary(e.target.value)}
            />
            <select
              className="
                px-4 py-2
                border border-violet-300 dark:border-violet-500
                rounded focus:outline-none focus:ring focus:ring-violet-300
                bg-violet-50 dark:bg-violet-800
                text-violet-700 dark:text-violet-300
              "
              value={newStatus}
              onChange={e => setNewStatus(e.target.value)}
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
            <button
              onClick={handleAddTask}
              className="
                px-5 py-2
                bg-violet-500 text-white
                rounded-lg hover:bg-violet-600
                dark:bg-violet-400 dark:hover:bg-violet-300
                transition-colors
              "
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Kanban Board */}
      <div className="bg-white dark:bg-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 shadow-inner p-4 overflow-visible">
          <KanbanComponent
            id="kanban"
            keyField="Status"
           dataSource={cards}
            cardSettings={{ contentField: 'Summary', headerField: 'Id' }}
           allowDragAndDrop={true}
           height="auto"                  // let it grow with content
         >
            <ColumnsDirective>
              <ColumnDirective headerText="To Do"       keyField="To Do"       />
              <ColumnDirective headerText="In Progress" keyField="In Progress" />
              <ColumnDirective headerText="Done"        keyField="Done"        />
            </ColumnsDirective>
          </KanbanComponent>
        </div>
      </div>
    </div>
  );
}
