// src/components/Sidebar.jsx
import React, { useRef, useEffect } from 'react';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { Link, useLocation } from 'react-router-dom';
import {
  FaBars,
  FaHome,
  FaTable,
  FaChartBar,
  FaCalendarAlt,
  FaTasks,
  FaCog,
} from 'react-icons/fa';

const items = [
  { label: 'Dashboard', icon: <FaHome />,       path: '/'         },
  { label: 'Table',     icon: <FaTable />,      path: '/table'    },
  { label: 'Chart',     icon: <FaChartBar />,   path: '/chart'    },
  { label: 'Calendar',  icon: <FaCalendarAlt />,path: '/calendar' },
  { label: 'Kanban',    icon: <FaTasks />,      path: '/kanban'   },
  { label: 'Settings',  icon: <FaCog />,        path: '/settings' },
];

export default function Sidebar({ isOpen, toggle }) {
  const sidebarRef = useRef(null);
  const loc = useLocation();

  useEffect(() => {
    sidebarRef.current?.refresh();
  }, [loc.pathname]);

  // mobile if width < 768px
  const isMobile = () => !window.matchMedia('(min-width: 768px)').matches;

  return (
   <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>

    <SidebarComponent
      ref={sidebarRef}
      width="240px"
      dockSize="60px"
      enableDock
      isOpen={isOpen}
      target=".main-content"
      type={isMobile() ? 'Over' : 'Push'}
      showBackdrop={false}                // ← disable the grey backdrop entirely
      closeOnDocumentClick={false}    
      onClose={toggle}
      
      style={{ height: '100vh', backgroundColor: 'var(--color-primary)', color: 'var(--color-fg)', transition: 'background-color var(--transition-speed)' }}
      

    >
      <ul className="p-4 mt-2 space-y-2">
        {/* Toggle button when collapsed */}
        {!isOpen && (
          <li>
            <button
              onClick={e => { e.stopPropagation(); toggle(); }}
              className="flex justify-center w-full py-2 text-bg hover:text-secondary"
              aria-label="Expand sidebar"
            >
              <FaBars size={20} />
            </button>
          </li>
        )}

        {/* Navigation items */}
        {items.map(item => {
          const active = loc.pathname === item.path;
          const justify = isOpen ? 'justify-between' : 'justify-center';
          const linkClasses = [
            'flex items-center',
            justify,
            'px-3 py-2 rounded-lg transition-colors',
            active ? 'bg-secondary text-bg' : 'hover:bg-secondary hover:dark:bg-secondary'
          ].join(' ');

          return (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={() => { if (isMobile()) toggle(); }}
                className={linkClasses}
              >
                <div className="flex items-center space-x-2">
                  <div className="text-xl">{item.icon}</div>
                 
                <span className={`${isOpen ? 'inline' : 'hidden'} text-sm font-medium …`}>
           {item.label}
         </span>
                </div>
                {/* Collapse button next to Dashboard when expanded */}
                {isOpen && item.path === '/' && (
                  <button
                    onClick={toggle}
                    className="text-bg hover:text-secondary"
                    aria-label="Collapse sidebar"
                  >
                    <FaBars />
                  </button>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </SidebarComponent>
    </div>
  );
}