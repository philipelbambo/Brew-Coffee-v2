// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './context/CartContext';
import { ReceiptProvider } from './context/ReceiptContext';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './components/Dessert/AuthLayout';

import Dashboard from './pages/Dashboard';
import Menu from './pages/Menu';
import BrewCoffeeOrderManagement from './components/CustomerOrders/BrewCoffeeOrderManagement';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Inventory from './pages/Inventory';
import Login from './layouts/Login';

import About from './pages/About';
import BrewCoffeeHomepage from './components/Homepage/BrewCoffeeHomepage';
import BrewCoffeeOrderSystem from './components/Coffee/BrewCoffeeOrderSystem';
import DessertOrderingSystem from "./components/Dessert/DessertOrderingSystem";
import RiderDashboard from "./components/Dashboard1/RiderDashboard";
import NotFound from './pages/NotFound';
import ProductInventory from './components/inventory/ProductInventory';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <CartProvider>
        <ReceiptProvider>
          <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              {/* You can add auth-related routes here */}
            </Route>

            {/* Main App Routes */}
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/orders" element={<BrewCoffeeOrderManagement />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<ProductInventory />} />
            </Route>

            {/* Public Routes */}
            <Route path="/" element={<BrewCoffeeHomepage />} />
            <Route path="/BrewCoffeeOrderSystem" element={<BrewCoffeeOrderSystem />} />
            <Route path="/DessertOrderingSystem" element={<DessertOrderingSystem />} />
            <Route path="/login" element={<Login />} />
            <Route path="/RiderDashboard" element={<RiderDashboard />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ReceiptProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
