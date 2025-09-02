import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { TrendingUp, TrendingDown, Coffee, Package, AlertTriangle, Box } from 'lucide-react';

// Philippine Peso Icon
const PhilippinePesoIcon = () => (
  <div className="w-20 h-20 flex items-center justify-center text-black font-bold text-5xl">
    ₱
  </div>
);

// === TYPES ===
interface DailySalesData {
  day: string;
  espresso: number;
  latte: number;
  cappuccino: number;
  coldBrew: number;
  total: number;
}

interface MonthlySalesData {
  month: string;
  espresso: number;
  latte: number;
  cappuccino: number;
  coldBrew: number;
  revenue: number;
}

interface CoffeeType {
  name: string;
  value: number;
  color: string;
}

interface StockItem {
  product: string;
  sizes: Record<string, number>;
  totalStock: number;
  lowStock: boolean;
  reorderLevel: number;
}

interface TopProduct {
  name: string;
  sales: number;
  revenue: number;
  type: 'Drink' | 'Beans';
}

interface KpiCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
}

// === SAMPLE DATA ===
const dailySalesData: DailySalesData[] = [
  { day: 'Mon', espresso: 34, latte: 45, cappuccino: 23, coldBrew: 15, total: 117 },
  { day: 'Tue', espresso: 41, latte: 52, cappuccino: 31, coldBrew: 18, total: 142 },
  { day: 'Wed', espresso: 28, latte: 38, cappuccino: 19, coldBrew: 12, total: 97 },
  { day: 'Thu', espresso: 52, latte: 67, cappuccino: 41, coldBrew: 25, total: 185 },
  { day: 'Fri', espresso: 68, latte: 89, cappuccino: 56, coldBrew: 34, total: 247 },
  { day: 'Sat', espresso: 82, latte: 124, cappuccino: 78, coldBrew: 45, total: 329 },
  { day: 'Sun', espresso: 75, latte: 98, cappuccino: 62, coldBrew: 38, total: 273 },
];

const monthlySalesData: MonthlySalesData[] = [
  { month: 'Jan', espresso: 950, latte: 1200, cappuccino: 800, coldBrew: 450, revenue: 38500 },
  { month: 'Feb', espresso: 880, latte: 1100, cappuccino: 720, coldBrew: 420, revenue: 36200 },
  { month: 'Mar', espresso: 1020, latte: 1450, cappuccino: 950, coldBrew: 580, revenue: 44800 },
  { month: 'Apr', espresso: 980, latte: 1380, cappuccino: 890, coldBrew: 540, revenue: 43200 },
  { month: 'May', espresso: 1150, latte: 1620, cappuccino: 1100, coldBrew: 670, revenue: 51800 },
  { month: 'Jun', espresso: 1080, latte: 1550, cappuccino: 1050, coldBrew: 640, revenue: 49100 },
];

const coffeeTypes: CoffeeType[] = [
  { name: 'Latte', value: 35, color: '#4B352A' },
  { name: 'Espresso', value: 25, color: '#4B352A' },
  { name: 'Cappuccino', value: 20, color: '#4B352A' },
  { name: 'Cold Brew', value: 15, color: '#4B352A' },
  { name: 'Americano', value: 5, color: '#4B352A' },
];

const totalCoffeeValue = coffeeTypes.reduce((acc, item) => acc + item.value, 0);

const stockData: StockItem[] = [
  {
    product: 'Ethiopian Light Roast',
    sizes: { '250': 45, '500': 32, '1000': 28 },
    totalStock: 105,
    lowStock: false,
    reorderLevel: 50,
  },
  {
    product: 'Colombian Medium Roast',
    sizes: { '250': 38, '500': 42, '1000': 35 },
    totalStock: 115,
    lowStock: false,
    reorderLevel: 60,
  },
  {
    product: 'Sumatra Dark Roast',
    sizes: { '250': 22, '500': 18, '1000': 12 },
    totalStock: 52,
    lowStock: true,
    reorderLevel: 60,
  },
  {
    product: 'Decaf Blend',
    sizes: { '250': 30, '500': 25, '1000': 18 },
    totalStock: 73,
    lowStock: false,
    reorderLevel: 50,
  },
  {
    product: 'Seasonal Pumpkin Spice',
    sizes: { '250': 15, '500': 10, '1000': 5 },
    totalStock: 30,
    lowStock: true,
    reorderLevel: 50,
  },
];

const topProducts: TopProduct[] = [
  { name: 'Vanilla Latte', sales: 245, revenue: 6125, type: 'Drink' },
  { name: 'Ethiopian Light Roast (1kg)', sales: 189, revenue: 9450, type: 'Beans' },
  { name: 'Iced Cold Brew', sales: 167, revenue: 4175, type: 'Drink' },
  { name: 'Colombian Medium Roast (500g)', sales: 156, revenue: 7800, type: 'Beans' },
  { name: 'Caramel Cappuccino', sales: 134, revenue: 4690, type: 'Drink' },
];

// === COMPONENTS ===
const BreadcrumbSearch = () => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center space-x-4">
      <input
        type="search"
        placeholder="Search coffee products..."
        className="px-4 py-2 rounded-lg border border-[#4B352A] focus:outline-none focus:ring-2 focus:ring-[#4B352A]"
      />
    </div>
  </div>
);

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, icon: Icon }) => (
  <div className="p-6 rounded-lg bg-white shadow-md border border-[#4B352A]">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <div className="flex items-center mt-2">
          {change.startsWith('+') ? (
            <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1 text-red-600" />
          )}
          <span
            className={`text-sm ${
              change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {change}
          </span>
        </div>
      </div>
      <Icon
        className={`text-[#4B352A] ${
          title === 'Low Stock Alerts' && Number(value) > 0 ? 'text-red-500' : ''
        }`}
      />
    </div>
  </div>
);

// === MAIN DASHBOARD ===
const Dashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'daily' | 'monthly'>('daily');

  const totalStock = stockData.reduce((sum, item) => sum + item.totalStock, 0);
  const lowStockItems = stockData.filter(
    (item) => item.lowStock || item.totalStock <= item.reorderLevel
  ).length;

  return (
    <div className="h-screen bg-gradient-to-br from-white to-white p-5 font-sans">
      <BreadcrumbSearch />
      <p className="text-gray-600 mb-6">Daily operations & sales analytics</p>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Daily Revenue', value: '₱5,247', change: '+22.1%', icon: PhilippinePesoIcon },
          { title: 'Cups Sold Today', value: 329, change: '+15.3%', icon: Coffee },
          { title: 'Total Stock (bags)', value: totalStock, change: '-3.8%', icon: Package },
          { title: 'Low Stock Alerts', value: lowStockItems, change: '+1', icon: AlertTriangle },
        ].map((card, index) => (
          <KpiCard key={index} {...card} />
        ))}
      </div>

      {/* Sales Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Daily/Monthly Sales Chart */}
        <div className="p-6 rounded-lg bg-white shadow-md border border-[#4B352A]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Coffee Sales</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('daily')}
                className={`px-3 py-1 rounded text-sm ${
                  viewMode === 'daily'
                    ? 'bg-[#4B352A] text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setViewMode('monthly')}
                className={`px-3 py-1 rounded text-sm ${
                  viewMode === 'monthly'
                    ? 'bg-[#4B352A] text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            {viewMode === 'daily' ? (
              <AreaChart data={dailySalesData}>
                <CartesianGrid stroke="#f5f0ec" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#4B352A" />
                <YAxis stroke="#4B352A" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="espresso"
                  stackId="1"
                  stroke="#4B352A"
                  fill="#4B352A"
                  name="Espresso"
                />
                <Area
                  type="monotone"
                  dataKey="latte"
                  stackId="1"
                  stroke="#4B352A"
                  fill="#4B352A"
                  name="Latte"
                />
                <Area
                  type="monotone"
                  dataKey="cappuccino"
                  stackId="1"
                  stroke="#4B352A"
                  fill="#4B352A"
                  name="Cappuccino"
                />
                <Area
                  type="monotone"
                  dataKey="coldBrew"
                  stackId="1"
                  stroke="#4B352A"
                  fill="#4B352A"
                  name="Cold Brew"
                />
              </AreaChart>
            ) : (
              <BarChart data={monthlySalesData}>
                <CartesianGrid stroke="#f5f0ec" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#4B352A" />
                <YAxis stroke="#4B352A" />
                <Tooltip />
                <Legend />
                <Bar dataKey="espresso" fill="#4B352A" name="Espresso" />
                <Bar dataKey="latte" fill="#4B352A" name="Latte" />
                <Bar dataKey="cappuccino" fill="#4B352A" name="Cappuccino" />
                <Bar dataKey="coldBrew" fill="#4B352A" name="Cold Brew" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Coffee Type Distribution */}
        <div className="p-6 rounded-lg bg-white shadow-md border border-[#4B352A]">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Coffee Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={coffeeTypes}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#4B352A"
                dataKey="value"
                label={({ name, payload }) => {
                  const value = payload?.value;
                  if (!value || totalCoffeeValue === 0) return null;
                  const percent = ((value / totalCoffeeValue) * 100).toFixed(0);
                  return `${name} ${percent}%`;
                }}
              >
                {coffeeTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`, 'Popularity']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stock & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Stock Management */}
        <div className="p-6 rounded-lg bg-white shadow-md border border-[#4B352A]">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Box className="w-5 h-5 mr-2 text-[#4B352A]" />
            Bean Inventory
          </h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {stockData.map((item, index) => (
              <div key={index} className="border-b border-[#4B352A] pb-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-800 text-sm">{item.product}</p>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        item.lowStock || item.totalStock <= item.reorderLevel
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {item.totalStock} bags
                    </span>
                    {(item.lowStock || item.totalStock <= item.reorderLevel) && (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                  {Object.entries(item.sizes).map(([size, count]) => (
                    <div key={size} className="text-center">
                      <div className="text-xs">{size}g</div>
                      <div className="font-medium">{count}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="p-6 rounded-lg bg-white shadow-md border border-[#4B352A]">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Best Sellers</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between border-b border-[#4B352A] pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#4B352A] to-[#5c4435] flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{product.name}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{product.sales} sold</span>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          product.type === 'Drink'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {product.type}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="font-semibold text-gray-800 text-sm">
                  ₱{product.revenue.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="p-6 rounded-lg mb-8 bg-white shadow-md border border-[#4B352A]">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlySalesData}>
            <CartesianGrid stroke="#f5f0ec" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#4B352A" />
            <YAxis stroke="#4B352A" />
            <Tooltip formatter={(value) => [`₱${value.toLocaleString()}`, 'Revenue']} />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#4B352A"
              strokeWidth={3}
              dot={{ fill: '#4B352A', strokeWidth: 2, r: 6 }}
              name="Monthly Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;