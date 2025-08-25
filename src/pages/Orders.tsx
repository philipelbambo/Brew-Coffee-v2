import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ChevronRight } from 'lucide-react';

interface CartItem {
  id: string;
  customer_name: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    options: Array<{
      name: string;
      value: string;
    }>;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  payment_method: string;
  cash?: number;
  change?: number;
  created_at: string;
  updated_at: string;
}

const Orders: React.FC = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/carts');
        setCartData(response.data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
          <p className="text-gray-600">{new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</p>
        </div>

       <div className="mt-4 md:mt-0">
  <Link
    to="/menu"
    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
  >
    New Order
  </Link>
</div>
</div>

      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Recent Orders</h2>
          <Link to="/orders" className="text-sm text-primary-600 hover:text-primary-800 flex items-center">
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="divide-y divide-gray-200">
          {cartData.map((cart) => (
            <div key={cart.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-800">Order #{cart.id}</h3>
                  <p className="text-sm text-gray-500">{cart.customer_name}</p>
                  <p className="text-sm text-gray-500">{new Date(cart.created_at).toLocaleTimeString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ₱{typeof cart.total === 'number' ? cart.total.toFixed(2) : parseFloat(cart.total).toFixed(2)}
                  </p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1
                    ${cart.payment_method === 'cash' ? 'bg-green-100 text-green-800' :
                      cart.payment_method === 'credit_card' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                    {cart.payment_method.charAt(0).toUpperCase() + cart.payment_method.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
