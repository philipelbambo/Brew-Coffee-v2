import React from 'react';
import { Trash2, Plus, Minus, CreditCard, Cast as Cash } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart: React.FC = () => {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = React.useState('');
  const [showPayment, setShowPayment] = React.useState(false);

  // For cash payment input & validation
  const [customerCash, setCustomerCash] = React.useState('');
  const [cashError, setCashError] = React.useState('');

  // Receipt popup
  const [showReceipt, setShowReceipt] = React.useState(false);
  const [receiptData, setReceiptData] = React.useState({
    method: '',
    total: 0,
    cash: 0,
    change: 0,
    customerName: '',
    currentDate: '',
    currentTime: ''
  });

  const handleQuantityChange = (id: string, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.0825; // 8.25% tax rate
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleCheckout = () => {
    setShowPayment(true);
  };

  const handlePayment = async () => {
    const total = calculateTotal();
    let change = 0; // Define 'change' with a default value

    if (paymentMethod === 'cash') {
      const cashAmount = parseFloat(customerCash);
      if (isNaN(cashAmount) || cashAmount < total) {
        setCashError('Insufficient cash provided.');
        return;
      }
      change = cashAmount - total; // Update 'change' here
      setReceiptData({
        method: 'Cash',
        total,
        cash: cashAmount,
        change,
        customerName: cartItems.length > 0 ? cartItems[0].customerName : '',
        currentDate: new Date().toLocaleDateString(),
        currentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
   } else {
  // For credit card or GCash
  setReceiptData({
    method: paymentMethod === 'gcash' ? 'GCash' : 'Credit Card',
    total,
    cash: 0,
    change: 0,
    customerName: cartItems.length > 0 ? cartItems[0].customerName : '',
    currentDate: new Date().toLocaleDateString(),
    currentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
}

    try {
      const response = await axios.post('http://localhost:8000/api/carts', {
        customer_name: cartItems.length > 0 ? cartItems[0].customerName : '',
        items: cartItems,
        subtotal: calculateSubtotal(),
        tax: calculateTax(),
        total: calculateTotal(),
        payment_method: paymentMethod,
        cash: paymentMethod === 'cash' ? parseFloat(customerCash) : null,
        change: paymentMethod === 'cash' ? change : null,
      });

      console.log('Cart saved:', response.data);
    } catch (error) {
      console.error('Error saving cart:', error);
    }

    setShowReceipt(true);
  };

  const handleBrowseMenu = () => {
    navigate('/menu');
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
                    <td>${data.cash.toFixed(2)}</td>
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
              onClick={() => {
                onClose();
                setCartItems([]);
                setShowPayment(false);
                setCustomerCash('');
                setCashError('');
                setPaymentMethod('');
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
          <p className="text-gray-600">Review and modify your order</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {cartItems.length > 0 ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <li
                    key={item.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center"
                  >
                    <div className="flex-shrink-0 h-20 w-20 bg-gray-200 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="mt-2 sm:mt-0 sm:ml-4 flex-grow">
                      <h3 className="text-lg font-medium text-gray-800">
                        {item.name}
                      </h3>
                      <div className="text-sm text-gray-500 space-y-1 mt-1">
                        {item.options.map((option, index) => (
                          <p key={index}>
                            {option.name}: {option.value}
                          </p>
                        ))}
                        <p><strong>Customer Name:</strong> {item.customerName}</p>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-0 flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          className="px-2 py-1 text-gray-600 hover:text-gray-800"
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 py-1 text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          className="px-2 py-1 text-gray-600 hover:text-gray-800"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="flex sm:mt-3 items-center">
                        <span className="text-lg font-medium text-gray-800 mr-3">
                          ₱{(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-4">
                Add some delicious items from our menu!
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded" onClick={handleBrowseMenu}>
                Browse Menu
               </button>
                  </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Order Summary
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800">
                  ₱{calculateSubtotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-800">₱{calculateTax().toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="text-lg font-medium text-gray-900">Total</span>
                <span className="text-lg font-medium text-primary-700">
                  ₱{calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>

            {showPayment ? (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">
                  Select Payment Method
                </h4>

                <div className="space-y-2">
                  <div
                    className={`border rounded-md p-3 cursor-pointer flex items-center ${
                      paymentMethod === 'credit_card'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200'
                    }`}
                    onClick={() => {
                      setPaymentMethod('credit_card');
                      setCashError('');
                      setCustomerCash('');
                    }}
                  >
                    <CreditCard className="mr-2 text-primary-600" size={20} />
                    <span>Credit Card</span>
                  </div>

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
    onClick={handlePayment}
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
) : (
  <button
    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
    disabled={cartItems.length === 0}
    onClick={handleCheckout}
  >
    Proceed to Checkout
  </button>
)}

          </div>
        </div>
      </div>

      {showReceipt && (
        <ReceiptPopup
          data={receiptData}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </div>
  );
};

export default Cart;

