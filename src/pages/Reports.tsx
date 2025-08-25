import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { reportData } from '../data/reports';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const timePeriods = [
  { id: 'week', name: 'Week' },
  { id: 'month', name: 'Month' },
  { id: 'year', name: 'Year' },
];

const Reports: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState('week');
  
  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Sales Revenue',
      },
    },
  };

  // Chart data
  const chartData = {
    labels: reportData.dailySales.map(item => item.date),
    datasets: [
      {
        label: 'Revenue ($)',
        data: reportData.dailySales.map(item => item.amount),
        backgroundColor: '#4caf50',
      },
    ],
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-gray-600">View your sales data and performance metrics</p>
        </div>
        
        <div className="flex space-x-2 mt-4 md:mt-0">
          {timePeriods.map((period) => (
           <button
  key={period.id}
  className={`px-4 py-2 rounded-md text-sm font-medium 
    ${timePeriod === period.id 
      ? 'bg-green-600 text-white' 
      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
  onClick={() => setTimePeriod(period.id)}
>
  {period.name}
</button>

          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
              <span className="text-primary-700 text-xl">₱</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-800">₱{reportData.totalRevenue.toFixed(2)}</h3>
            </div>
          </div>
        </div>
        
        {/* Total Orders */}
        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-secondary-100 flex items-center justify-center mr-4">
              <span className="text-secondary-700 text-xl">📋</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-800">{reportData.totalOrders}</h3>
            </div>
          </div>
        </div>
        
        {/* Average Ticket */}
        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-accent-blue/10 flex items-center justify-center mr-4">
              <span className="text-accent-blue text-xl">📈</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Ticket</p>
              <h3 className="text-2xl font-bold text-gray-800">₱{reportData.averageTicket.toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Sales</h3>
          <div className="h-80">
            <Bar options={options} data={chartData} />
          </div>
        </div>
        
        {/* Top Selling Items */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Items</h3>
          <div className="space-y-4">
            {reportData.topSellingItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div>
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.quantity} sold</p>
                </div>
                <span className="text-primary-700 font-medium">₱{item.revenue.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;