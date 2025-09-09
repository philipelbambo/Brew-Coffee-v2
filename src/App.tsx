// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './context/CartContext';
import { ReceiptProvider } from './context/ReceiptContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './components/Dessert/AuthLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Inventory from './pages/Inventory';
import Login from './layouts/Login';

import About from './pages/About';
import Homepage from './pages/Homepage';
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
          
            </Route>

            {/* Main App Routes */}
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
              <Route path="products" element={<ProductInventory />} />
            </Route>
              
            <Route path ="/" element={<Homepage />} />
            <Route path ="/BrewCoffeeOrderSystem" element={<BrewCoffeeOrderSystem />} />
            <Route path ="/DessertOrderingSystem" element={<DessertOrderingSystem />} />
            <Route path ="/login" element={<Login />} />
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
