import React, { useState, useEffect } from 'react';
import { Search, Trash2, Cast as Cash } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { coffeeProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  popular?: boolean;
}

interface CategoryFilter {
  id: string;
  name: string;
  icon?: string;
}

const categoryFilters: CategoryFilter[] = [
  { id: 'all', name: 'All' },
  { id: 'coffee', name: 'Coffee', icon: '☕' },
  { id: 'tea', name: 'Tea', icon: '🍵' },
  { id: 'bakery', name: 'Bakery', icon: '🥐' },
  { id: 'lunch', name: 'Lunch', icon: '🥗' },
];

const Menu: React.FC = () => {
  const [products] = useState<Product[]>(coffeeProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [customerCash, setCustomerCash] = useState('');
  const [cashError, setCashError] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState({
    method: '',
    total: 0,
    cash: 0,
    change: 0,
    customerName: '',
    currentDate: '',
    currentTime: ''
  });
  const { cartItems, addToCart, setCartItems } = useCart();
  const [showCopied, setShowCopied] = useState(false);
  const gcashNumber = '09123456789'; // Dummy GCash number

  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString());
    setCurrentTime(now.toLocaleTimeString());
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'all' || product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleConfirmPayment = async () => {
    if (!customerName) {
      alert('Please enter customer name');
      return;
    }

    if (cartItems.length === 0) {
      alert('Cart is empty');
      return;
    }

    const total = calculateTotal();
    let change = 0;

    if (paymentMethod === 'cash') {
      const cashAmount = parseFloat(customerCash);
      if (isNaN(cashAmount) || cashAmount < total) {
        setCashError('Insufficient cash provided.');
        return;
      }
      change = cashAmount - total;
      setReceiptData({
        method: 'Cash',
        total,
        cash: cashAmount,
        change,
        customerName,
        currentDate,
        currentTime
      });
    } else {
      setReceiptData({
        method: 'GCash',
        total,
        cash: 0,
        change: 0,
        customerName,
        currentDate,
        currentTime
      });
    }

    try {
      // Format the items data to match server expectations
      const formattedItems = cartItems.map(item => ({
        product_id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        options: item.options || []
      }));

      const response = await axios.post('http://localhost:8000/api/carts', {
        customer_name: customerName,
        items: formattedItems,
        subtotal: calculateSubtotal(),
        total: calculateTotal(),
        tax: 0,
        payment_method: paymentMethod,
        cash_amount: paymentMethod === 'cash' ? parseFloat(customerCash) : null,
        change_amount: paymentMethod === 'cash' ? change : null,
        order_date: currentDate,
        order_time: currentTime
      });

      console.log('Order saved:', response.data);
      
      // Clear the cart and form
      setCartItems([]);
      setCustomerName('');
      setCustomerCash('');
      setPaymentMethod('');
      setShowPayment(false);
      setShowReceipt(true);
    } catch (error) {
      console.error('Error saving order:', error);
      if (axios.isAxiosError(error) && error.response) {
        // Log the specific validation errors from the server
        console.error('Validation errors:', error.response.data);
        alert(`Error saving order: ${error.response.data.message || 'Please check your input and try again.'}`);
      } else {
        alert('Error saving order. Please try again.');
      }
    }
  };

  const copyGcashNumber = () => {
    navigator.clipboard.writeText(gcashNumber);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const ReceiptPopup = ({
    data,
    onClose,
  }: {
    data: typeof receiptData;
    onClose: () => void;
  }) => {
    const handlePrint = () => {
      const printWindow = window.open('', '', 'width=600,height=800');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Receipt</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h2 { margin-bottom: 20px; text-align: center; }
                .receipt-container { max-width: 300px; margin: 0 auto; }
                .receipt-header { text-align: center; margin-bottom: 20px; }
                .receipt-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                .receipt-table td { padding: 5px 0; border-bottom: 1px dashed #ddd; }
                .receipt-table .label { font-weight: bold; width: 50%; }
                .total-row { font-weight: bold; border-top: 2px solid #000; }
                .thank-you { text-align: center; margin-top: 20px; font-style: italic; }
              </style>
            </head>
            <body>
              <div class="receipt-container">
                <div class="receipt-header">
                  <h2>Order Receipt</h2>
                </div>
                <table class="receipt-table">
                  <tr>
                    <td class="label">Customer Name:</td>
                    <td>${data.customerName}</td>
                  </tr>
                  <tr>
                    <td class="label">Date:</td>
                    <td>${data.currentDate}</td>
                  </tr>
                  <tr>
                    <td class="label">Time:</td>
                    <td>${data.currentTime}</td>
                  </tr>
                  <tr>
                    <td class="label">Payment Method:</td>
                    <td>${data.method}</td>
                  </tr>
                  <tr>
                    <td class="label">Total:</td>
                    <td>₱${data.total.toFixed(2)}</td>
                  </tr>
                  ${data.method === 'Cash' ? `
                  <tr>
                    <td class="label">Cash:</td>
                    <td>₱${data.cash.toFixed(2)}</td>
                  </tr>
                  <tr class="total-row">
                    <td class="label">Change:</td>
                    <td>₱${data.change.toFixed(2)}</td>
                  </tr>
                  ` : `
                  <tr class="total-row">
                    <td colspan="2">Paid in full by ${data.method}</td>
                  </tr>
                  `}
                </table>
                <div class="thank-you">Thank you for your order!</div>
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h3 className="text-xl font-bold mb-4 text-center">Order Receipt</h3>

          <div className="mb-6">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-medium text-gray-700">Customer Name:</td>
                  <td className="py-2 text-gray-900">{data.customerName}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-medium text-gray-700">Date:</td>
                  <td className="py-2 text-gray-900">{data.currentDate}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-medium text-gray-700">Time:</td>
                  <td className="py-2 text-gray-900">{data.currentTime}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-medium text-gray-700">Method:</td>
                  <td className="py-2 text-gray-900">{data.method}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-medium text-gray-700">Total:</td>
                  <td className="py-2 text-gray-900">₱{data.total.toFixed(2)}</td>
                </tr>
                {data.method === 'Cash' && (
                  <>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 font-medium text-gray-700">Cash:</td>
                      <td className="py-2 text-gray-900">₱{data.cash.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-gray-700">Change:</td>
                      <td className="py-2 text-gray-900">₱{data.change.toFixed(2)}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 space-y-2">
            <button
              className="btn btn-primary w-full"
              onClick={handlePrint}
            >
              Print Receipt
            </button>
            <button
              className="btn btn-outline w-full"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto pb-10">
      <div className="flex flex-col mb-6">
        {/* Search bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search menu items..."
            className="input pl-10 w-full"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {/* Category filters */}
       <div className="flex overflow-x-auto pb-2 space-x-2">
      {categoryFilters.map((category) => (
          <button
         key={category.id}
          className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap flex items-center
           ${activeCategory === category.id
          ? 'bg-green-600 text-white'
          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setActiveCategory(category.id)}
    >
            {category.icon && <span className="mr-2">{category.icon}</span>}
           {category.name}
          </button>
         ))}
      </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Customer name and timestamp */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="input w-full"
                placeholder="Enter your name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="text-sm text-gray-600">
              <p><strong>Date:</strong> {currentDate}</p>
              <p><strong>Time:</strong> {currentTime}</p>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Order Summary</h2>
            </div>
            
            <div className="p-4">
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-start space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <div className="text-sm text-gray-600">
                            {item.options.map((opt, index) => (
                              <span key={index}>
                                {opt.name}: {opt.value}
                                {index < item.options.length - 1 ? ', ' : ''}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              -
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              +
                            </button>
                            <span className="ml-auto font-medium">
                              ₱{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-800">₱{calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium text-lg pt-3 border-t">
                      <span>Total</span>
                      <span>₱{calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  {!showPayment ? (
                    <button
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded mt-6"
                      onClick={() => setShowPayment(true)}
                    >
                      Proceed to Payment
                    </button>
                  ) : (
                    <div className="mt-6 space-y-4">
                      <h4 className="font-medium text-gray-800">Select Payment Method</h4>

                      <div className="space-y-2">
                        <div
                          className={`border rounded-md p-3 cursor-pointer flex items-center ${
                            paymentMethod === 'cash'
                              ? 'border-primary-600 bg-primary-50'
                              : 'border-gray-200'
                          }`}
                          onClick={() => setPaymentMethod('cash')}
                        >
                          <Cash className="mr-2 text-primary-600" size={20} />
                          <span>Cash</span>
                        </div>

                        <div
                          className={`border rounded-md p-3 cursor-pointer flex items-center ${
                            paymentMethod === 'gcash'
                              ? 'border-primary-600 bg-primary-50'
                              : 'border-gray-200'
                          }`}
                          onClick={() => {
                            setPaymentMethod('gcash');
                            setCashError('');
                            setCustomerCash('');
                          }}
                        >
                          <img src="/path-to-your-gcash-icon.png" alt="GCash" className="w-5 h-5 mr-2" />
                          <span>GCash</span>
                        </div>
                      </div>

                      {paymentMethod === 'gcash' && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-md">
                          <p className="text-sm text-gray-600 mb-2">Send payment to:</p>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{gcashNumber}</span>
                            <button
                              onClick={copyGcashNumber}
                              className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                            >
                              {showCopied ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'cash' && (
                        <div className="mt-4">
                          <label className="block text-gray-700 mb-1" htmlFor="cashInput">
                            Enter cash amount:
                          </label>
                          <input
                            id="cashInput"
                            type="number"
                            min={0}
                            step="0.01"
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={customerCash}
                            onChange={e => {
                              setCustomerCash(e.target.value);
                              setCashError('');
                            }}
                          />
                          {cashError && (
                            <p className="text-red-600 text-sm mt-1">{cashError}</p>
                          )}
                        </div>
                      )}

                      <div className="mt-6 space-y-2">
                        <button
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
                          disabled={
                            !paymentMethod ||
                            (paymentMethod === 'cash' &&
                              (customerCash.trim() === '' ||
                                parseFloat(customerCash) < calculateTotal()))
                          }
                          onClick={handleConfirmPayment}
                        >
                          Complete Order
                        </button>
                        <button
                          className="w-full border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium py-2 px-4 rounded"
                          onClick={() => setShowPayment(false)}
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          addToCart={addToCart}
          customerName={customerName}
          currentDate={currentDate}
          currentTime={currentTime}
        />
      )}

      {showReceipt && (
        <ReceiptPopup
          data={receiptData}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </div>
  );
};

export default Menu;

