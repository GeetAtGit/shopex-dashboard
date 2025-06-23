// src/pages/Charts.jsx
import React from 'react';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  ColumnSeries,
  Category,
  Legend,
  Tooltip,
  DataLabel,
  Inject
} from '@syncfusion/ej2-react-charts';

// Sample Sales Data
const salesData = [
  { month: 'Jan', sales: 35 },
  { month: 'Feb', sales: 28 },
  { month: 'Mar', sales: 34 },
  { month: 'Apr', sales: 32 },
  { month: 'May', sales: 40 },
  { month: 'Jun', sales: 32 },
];

const Charts = () => (
  <div className="flex justify-center p-6 chart-wrapper">
    <div className="chart-card">
      <h2 className="chart-title">Monthly Sales</h2>

      <ChartComponent
        primaryXAxis={{
          valueType: 'Category',
          title: 'Month',
          titleStyle: { color: 'var(--color-primary)' },
          labelStyle: { color: 'var(--color-primary)' }
        }}
        primaryYAxis={{
          title: 'Sales (in thousands)',
          titleStyle: { color: 'var(--color-primary)' },
          labelStyle: { color: 'var(--color-primary)' }
        }}
        tooltip={{ enable: true }}
        legendSettings={{ visible: true }}
        width="100%"
        height="350px"
      >
        <Inject services={[ColumnSeries, Category, Legend, Tooltip, DataLabel]} />

        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={salesData}
            xName="month"
            yName="sales"
            name="Sales"
            type="Column"

            /* Explicit fill & border so bars never blend in */
            fill="var(--color-primary)"
            border={{ color: 'var(--color-secondary)', width: 2 }}

            marker={{
              dataLabel: {
                visible: true,
                position: 'Top',
                font: { color: 'var(--color-bg)', weight: '600' }
              }
            }}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  </div>
);

export default Charts;
