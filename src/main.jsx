import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/ContextProvider';

import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NNaF1cWWhPYVFxWmFZfVtgdVdMYlRbR3RPIiBoS35Rc0VlW39fcnZdRWJYUkRxVEBU');

import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-react-navigations/styles/material.css';
import '@syncfusion/ej2-react-schedule/styles/material.css';
import '@syncfusion/ej2-react-kanban/styles/material.css';
import '@syncfusion/ej2-react-grids/styles/material.css';


import './index.css';

import MainLayout from './layout/MainLayout';
import App        from './App';
import Calendar   from './pages/Calendar';
import Tables     from './pages/Tables';
import Charts     from './pages/Charts';
import Kanban    from './pages/Kanban';
import Settings   from './pages/Settings';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* All pages share the same sidebar/navbar layout */}
          <Route path="/" element={<MainLayout />}>
            {/* Dashboard at “/” */}
            <Route index element={<App />} />
            {/* Other pages */}
            <Route path="calendar"    element={<Calendar />} />
            <Route path="table"       element={<Tables />} />
            <Route path="chart"       element={<Charts />} />
            <Route path="kanban"      element={<Kanban />} />
            <Route path="settings"      element={<Settings />} />


            {/* Unknown paths redirect to Dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);