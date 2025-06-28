// src/index.jsx
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/ContextProvider';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NNaF1cXGJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWXlceHVRRmZZUE10X0VWYUA=');
// Syncfusion styles (these stay imported up front)
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-react-navigations/styles/material.css';
import '@syncfusion/ej2-react-schedule/styles/material.css';
import '@syncfusion/ej2-react-kanban/styles/material.css';
import '@syncfusion/ej2-react-grids/styles/material.css';

import './index.css';

// Lazy‐loaded components
const MainLayout     = lazy(() => import('./layout/MainLayout'));
const DashboardPage  = lazy(() => import('./App'));
const CalendarPage   = lazy(() => import('./pages/Calendar'));
const TablesPage     = lazy(() => import('./pages/Tables'));
const ChartsPage     = lazy(() => import('./pages/Charts'));
const KanbanPage     = lazy(() => import('./pages/Kanban'));
const SettingsPage   = lazy(() => import('./pages/Settings'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        {/* Wrap your routes in one Suspense boundary */}
        <Suspense fallback={<div style={{ padding: 20 }}>Loading…</div>}>
          <Routes>
            {/* All pages share the same sidebar/navbar layout */}
            <Route path="/" element={<MainLayout />}>
              {/* Dashboard at “/” */}
              <Route index element={<DashboardPage />} />

              {/* Other pages */}
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="table"    element={<TablesPage />} />
              <Route path="chart"    element={<ChartsPage />} />
              <Route path="kanban"   element={<KanbanPage />} />
              <Route path="settings" element={<SettingsPage />} />

              {/* Unknown paths redirect to Dashboard */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
