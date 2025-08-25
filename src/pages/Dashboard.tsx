import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Coffee, 
  ShoppingCart, 
  ClipboardList, 
  TrendingUp,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { dashboardData } from '../data/dashboard';

const Dashboard: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">{currentDate}</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Link to="/menu" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded">
            New Order
          </Link>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Today's Sales */}
        <div className="card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Today's Sales</p>
              <h3 className="text-2xl font-bold text-gray-800">₱{dashboardData.todaySales.toFixed(2)}</h3>
              <div className="flex items-center mt-1 text-sm">
                <TrendingUp className="text-green-500 mr-1" size={16} />
                <span className="text-green-500">+4.5%</span>
                <span className="text-gray-500 ml-1">from yesterday</span>
              </div>
            </div>
            <div className="p-3 bg-primary-100 rounded-full">
              <TrendingUp className="text-primary-600" size={20} />
            </div>
          </div>
        </div>
        
        {/* Today's Orders */}
        <div className="card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Today's Orders</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashboardData.todayOrders}</h3>
              <div className="flex items-center mt-1 text-sm">
                <TrendingUp className="text-green-500 mr-1" size={16} />
                <span className="text-green-500">+2.8%</span>
                <span className="text-gray-500 ml-1">from yesterday</span>
              </div>
            </div>
            <div className="p-3 bg-secondary-100 rounded-full">
              <ClipboardList className="text-secondary-600" size={20} />
            </div>
          </div>
        </div>
        
        {/* Open Orders */}
        <div className="card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Open Orders</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashboardData.openOrders}</h3>
              <div className="mt-1 text-sm">
                <span className="text-gray-500">Need attention</span>
              </div>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <ShoppingCart className="text-yellow-600" size={20} />
            </div>
          </div>
        </div>
        
        {/* Inventory Alerts */}
        <div className="card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Inventory Alerts</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashboardData.inventoryAlerts}</h3>
              <div className="mt-1 text-sm">
                <span className="text-gray-500">Items low in stock</span>
              </div>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <AlertCircle className="text-red-600" size={20} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 card">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">Recent Orders</h2>
            <Link to="/orders" className="text-sm text-primary-600 hover:text-primary-800 flex items-center">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="divide-y divide-gray-200">
            {dashboardData.recentOrders.map((order) => (
              <div key={order.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₱{order.total.toFixed(2)}</p>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1
                      ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Popular Items */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">Popular Items Today</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {dashboardData.popularItems.map((item, index) => (
              <div key={index} className="p-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <Coffee size={16} className="text-gray-700" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.count} orders today</p>
                </div>
                <div className="text-primary-700 font-medium">
                  ₱{item.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;