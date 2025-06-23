// src/pages/App.jsx
import React from 'react';
import bannerImg from './assets/dashboard-banner.png';  // your 8×2 cm banner
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  ColumnSeries,
  Category,
  Legend,
  Tooltip,
  DataLabel
} from '@syncfusion/ej2-react-charts';
import {
  FaUsers,
  FaDollarSign,
  FaShoppingCart,
  FaChartLine
} from 'react-icons/fa';

export default function App() {
  // dummy data for the charts
  const lineChartData = [
    { month: 'Jan', sale: 400 },
    { month: 'Feb', sale: 600 },
    { month: 'Mar', sale: 800 },
    { month: 'Apr', sale: 700 },
    { month: 'May', sale: 900 },
    { month: 'Jun', sale: 1000 },
  ];
  const barChartData = [
    { month: 'Jan', expense: 240 },
    { month: 'Feb', expense: 350 },
    { month: 'Mar', expense: 280 },
    { month: 'Apr', expense: 300 },
    { month: 'May', expense: 450 },
    { month: 'Jun', expense: 500 },
  ];

  // stats cards
  const stats = [
    { label: 'Users',    value: '1.2k',  icon: <FaUsers />       },
    { label: 'Revenue',  value: '$4.5k', icon: <FaDollarSign />  },
    { label: 'Orders',   value: '320',   icon: <FaShoppingCart />},
    { label: 'Growth',   value: '8%',    icon: <FaChartLine />   },
  ];

  return (
    <div className="space-y-6 p-6 bg-bg text-fg">
      {/* Banner */}
      <img
        src={bannerImg}
        alt="Welcome Banner"
        className="w-full h-52 rounded-lg  shadow"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex items-center p-4 bg-secondary dark:bg-secondary rounded-lg shadow"
          >
            <div className="text-3xl text-primary">{s.icon}</div>
            <div className="ml-4">
              <p className="text-xl font-semibold">{s.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="border-muted" />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-bg dark:bg-bg rounded-lg shadow p-4">
          <ChartComponent height="300px"
            primaryXAxis={{ valueType: 'Category' }}
            tooltip={{ enable: true }}
            legendSettings={{ visible: true }}
          >
            <Inject services={[LineSeries, Category, Legend, Tooltip, DataLabel]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={lineChartData}
                xName="month"
                yName="sale"
                name="Sales"
                type="Line"
                marker={{ visible: true, dataLabel: { visible: true } }}
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>

        {/* Bar Chart */}
        <div className="bg-bg dark:bg-bg rounded-lg shadow p-4">
          <ChartComponent height="300px"
            primaryXAxis={{ valueType: 'Category' }}
            tooltip={{ enable: true }}
            legendSettings={{ visible: true }}
          >
            <Inject services={[ColumnSeries, Category, Legend, Tooltip, DataLabel]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={barChartData}
                xName="month"
                yName="expense"
                name="Expenses"
                type="Column"
                marker={{ dataLabel: { visible: true } }}
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    </div>
  );
}
