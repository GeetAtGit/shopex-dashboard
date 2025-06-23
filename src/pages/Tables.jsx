// src/pages/Tables.jsx
import React, { useRef, useState } from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Filter,
  Search,
  Edit,
  Inject
} from '@syncfusion/ej2-react-grids';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

// 1) Static lists for your dropdowns
const roleOptions = [
  { role: 'Admin' },
  { role: 'Employee' },
  { role: 'Manager' },
];

const statusOptions = [
  { status: 'Active' },
  { status: 'Inactive' },
  { status: 'Pending' },
];

// Sample User Data
const userData = [
  { id: 1, name: 'Alice Johnson', role: 'Admin',    status: 'Active'   },
  { id: 2, name: 'Bob Smith',     role: 'Employee', status: 'Inactive' },
  { id: 3, name: 'Carol Lee',     role: 'Employee', status: 'Active'   },
  { id: 4, name: 'David Kim',     role: 'Manager',  status: 'Active'   },
  { id: 5, name: 'Eva Patel',     role: 'Employee', status: 'Pending'  },
];

// Status badge component
const StatusBadge = ({ status }) => {
  let bg, text;
  if (status === 'Active') {
    bg = 'bg-green-100'; text = 'text-green-800';
  } else if (status === 'Inactive') {
    bg = 'bg-red-100';   text = 'text-red-800';
  } else {
    bg = 'bg-yellow-100';text = 'text-yellow-800';
  }
  return (
    <span className={`${bg} ${text} px-2 py-1 rounded-full text-xs font-semibold`}>
      {status}
    </span>
  );
};

export default function Tables() {
  const gridRef = useRef(null);
  const [searchText, setSearchText] = useState('');

  

  const onSearchChange = e => {
    const val = e.target.value;
    setSearchText(val);
    gridRef.current?.search(val);
  };

  const onAdd = ()    => gridRef.current?.addRecord();
  const onEdit = ()   => {
    const sel = gridRef.current?.getSelectedRecords() || [];
    if (!sel.length) return alert('Select a row to edit');
    gridRef.current.startEdit();
  };
  const onDelete = () => {
    const sel = gridRef.current?.getSelectedRecords() || [];
    if (!sel.length) return alert('Select a row to delete');
    gridRef.current.deleteRecord('id', sel);
  };

  return (
    <div className="p-4 sm:p-6 bg-bg text-fg transition-colors">
      {/* Header + Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-primary dark:text-secondary">
          User Management
        </h2>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchText}
              onChange={onSearchChange}
              placeholder="Search users..."
              className="w-full md:w-64 pl-10 pr-4 py-2 bg-bg dark:bg-gray-300 border border-muted rounded-lg focus:outline-none focus:ring focus:ring-primary/50 text-fg dark:text-violet-900"
            />
          </div>
          <button onClick={onAdd} className="flex items-center px-4 py-2 bg-primary text-bg rounded-lg hover:bg-primary/90 transition-colors">
            <FaPlus className="mr-2" /> Add
          </button>
          <button onClick={onEdit} className="flex items-center px-4 py-2 bg-secondary text-bg rounded-lg hover:bg-secondary/90 transition-colors">
            <FaEdit className="mr-2" /> Edit
          </button>
          <button onClick={onDelete} className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800 transition-colors">
            <FaTrash className="mr-2" /> Delete
          </button>
        </div>
      </div>

      {/* Mobile: card list */}
      <div className="space-y-4 md:hidden">
        {userData.map(user => (
          <div key={user.id} className="bg-white dark:bg-gray-300 rounded-lg shadow p-4 border border-muted">
            <div className="flex justify-between items-center">
              <span className="font-semibold">#{user.id} {user.name}</span>
              <StatusBadge status={user.status} />
            </div>
            <p className="mt-2"><span className="font-semibold">Role:</span> {user.role}</p>
          </div>
        ))}
      </div>

      {/* Tablet & Desktop: grid */}
      <div className="hidden md:block overflow-x-auto">
        <GridComponent
          ref={gridRef}
          dataSource={userData}
          allowPaging
          pageSettings={{ pageSize: 10 }}
          allowSorting
          allowFiltering
          filterSettings={{ type: 'Menu' }}
          allowResizing
          height="auto"
          width="auto"
          editSettings={{
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            mode: 'Dialog',
          }}
          selectionSettings={{ type: 'Single' }}
        >
          <ColumnsDirective>
            <ColumnDirective field="id"     headerText="User ID" minWidth="80"  textAlign="Center" isPrimaryKey />
            <ColumnDirective field="name"   headerText="Name"    minWidth="150" />
            <ColumnDirective
              field="role"
              headerText="Role"
              minWidth="120"
              editType="dropdownedit"
              edit={{ params: { dataSource: roleOptions, fields: { text: 'role', value: 'role' }, placeholder: 'Select role' } }}
            />
            <ColumnDirective
              field="status"
              headerText="Status"
              minWidth="120"
              template={StatusBadge}
              editType="dropdownedit"
              edit={{ params: { dataSource: statusOptions, fields: { text: 'status', value: 'status' }, placeholder: 'Select status' } }}
            />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Search, Edit]} />
        </GridComponent>
      </div>
    </div>
  );
}
