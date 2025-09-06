    // DessertOrderingSystem.tsx - Main React component
    import React, { useState, useRef } from 'react';
    import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Smartphone, FileText, Upload, X, ArrowLeft } from 'lucide-react';

    // Import types, data, and utilities
    import { Dessert, CartItem, CustomerDetails, Order } from './Types';
    import { desserts } from './Data';
    import {
    calculateTotalPrice,
    calculateTotalItems,
    createOrder,
    validateCustomerDetails,
    getDefaultCustomerDetails,
    printReceipt
    } from './Utils';

    const DessertOrderingSystem: React.FC = () => {
    // State management
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showCart, setShowCart] = useState<boolean>(false);
    const [showCheckout, setShowCheckout] = useState<boolean>(false);
    const [showReceipt, setShowReceipt] = useState<boolean>(false);
    const [showDessertModal, setShowDessertModal] = useState<boolean>(false);
    const [selectedDessert, setSelectedDessert] = useState<Dessert | null>(null);
    const [orderDetails, setOrderDetails] = useState<Order | null>(null);
    const [paymentScreenshot, setPaymentScreenshot] = useState<string | null>(null);
    const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(getDefaultCustomerDetails());
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Cart functions
    const addToCart = (dessert: Dessert) => {
        setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === dessert.id);
        if (existingItem) {
            return prevCart.map(item =>
            item.id === dessert.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        }
        return [...prevCart, { ...dessert, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const updateQuantity = (id: number, change: number) => {
        setCart(prevCart =>
        prevCart
            .map(item => {
            if (item.id === id) {
                const newQuantity = item.quantity + change;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
            }
            return item;
            })
            .filter((item): item is CartItem => item !== null)
        );
    };

    // Modal functions
    const openDessertModal = (dessert: Dessert) => {
        setSelectedDessert(dessert);
        setShowDessertModal(true);
    };

    const closeDessertModal = () => {
        setShowDessertModal(false);
        setSelectedDessert(null);
    };

    // File upload functions
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setPaymentScreenshot(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        }
    };

    const removeScreenshot = () => {
        setPaymentScreenshot(null);
        if (fileInputRef.current) {
        fileInputRef.current.value = '';
        }
    };

    // Checkout and order functions
    const handleCheckout = () => {
        if (!validateCustomerDetails(customerDetails)) {
        alert('Please fill in all required fields');
        return;
        }
        const order = createOrder(cart, customerDetails, paymentScreenshot);
        setOrderDetails(order);
        setShowReceipt(true);
        setShowCheckout(false);
        setCart([]);
    };

    const startNewOrder = () => {
        setShowReceipt(false);
        setShowCart(false);
        setOrderDetails(null);
        setCustomerDetails(getDefaultCustomerDetails());
        setPaymentScreenshot(null);
    };

    return (
        <div className="min-h-screen bg-white w-full">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="w-full px-6 sm:px-8 lg:px-12 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <button
                onClick={() => window.history.back()}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                style={{ color: '#4B352A' }}
                >
                <ArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-bold" style={{ color: '#4B352A' }}>Sweet Delights</h1>
            </div>
            <button
                onClick={() => setShowCart(true)}
                className="relative text-white p-3 rounded-full hover:opacity-80 transition-colors"
                style={{ backgroundColor: '#4B352A' }}
            >
                <ShoppingCart size={24} />
                {calculateTotalItems(cart) > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {calculateTotalItems(cart)}
                </span>
                )}
            </button>
            </div>
        </header>

        {/* Main Content */}
        <main className="w-full px-6 sm:px-8 lg:px-12 py-8">
            <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#4B352A' }}>Our Delicious Desserts</h2>
            <p className="text-xl" style={{ color: '#4B352A' }}>Satisfy your sweet tooth with our premium desserts</p>
            </div>

            {/* Dessert Grid - Only the boxes (cards) are widened */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {desserts.map(dessert => (
                <div
                key={dessert.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow w-full max-w-md" // Changed from max-w-xs to max-w-md
                >
                <img
                    src={dessert.image}
                    alt={dessert.name}
                    className="w-full h-auto object-contain cursor-pointer"
                    style={{ maxHeight: '280px' }}
                    onClick={() => openDessertModal(dessert)}
                />
                <div className="p-5">
                    <h3
                    className="text-xl font-bold mb-3 cursor-pointer hover:opacity-80 transition-colors text-center"
                    style={{ color: '#4B352A' }}
                    onClick={() => openDessertModal(dessert)}
                    >
                    {dessert.name}
                    </h3>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    <span className="text-2xl font-bold" style={{ color: '#4B352A' }}>₱{dessert.price}</span>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <button
                        onClick={() => {
                            addToCart(dessert);
                            setShowCart(true);
                        }}
                        className="text-white px-4 py-2 rounded-lg hover:opacity-80 transition-colors flex items-center gap-1 text-sm flex-1 sm:flex-none"
                        style={{ backgroundColor: '#4B352A' }}
                        >
                        <Plus size={14} />
                        Add to Cart
                        </button>
                        <button
                        onClick={() => {
                            setCart([{ ...dessert, quantity: 1 }]);
                            setShowCheckout(true);
                        }}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1 text-sm flex-1 sm:flex-none"
                        >
                        🚀 Order Now
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </main>

        {/* All modals remain unchanged in width */}
        {/* Cart Modal */}
        {showCart && (
            <div className="fixed inset-0 backdrop-blur-md bg-white/30 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
                    <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                    </button>
                </div>
                {cart.length === 0 ? (
                    <p className="text-center py-8" style={{ color: '#4B352A' }}>Your cart is empty</p>
                ) : (
                    <>
                    {cart.map(item => (
                        <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-lg" />
                        <div className="flex-1">
                            <h3 className="font-semibold" style={{ color: '#4B352A' }}>{item.name}</h3>
                            <p style={{ color: '#4B352A' }}>₱{item.price}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                            >
                            <Minus size={16} />
                            </button>
                            <span className="font-semibold" style={{ color: '#4B352A' }}>{item.quantity}</span>
                            <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                            >
                            <Plus size={16} />
                            </button>
                            <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 ml-2"
                            >
                            <Trash2 size={16} />
                            </button>
                        </div>
                        </div>
                    ))}
                    <div className="mt-6 p-5 bg-gray-50 rounded-lg">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xl font-bold">
                        <span style={{ color: '#4B352A' }}>Total: ₱{calculateTotalPrice(cart)}</span>
                        <button
                            onClick={() => {
                            setShowCart(false);
                            setShowCheckout(true);
                            }}
                            className="text-white px-6 py-3 rounded-lg hover:opacity-80 transition-colors w-full sm:w-auto"
                            style={{ backgroundColor: '#4B352A' }}
                        >
                            Checkout
                        </button>
                        </div>
                    </div>
                    </>
                )}
                </div>
            </div>
            </div>
        )}

        {/* Dessert Detail Modal */}
        {showDessertModal && selectedDessert && (
            <div className="fixed inset-0 backdrop-blur-md bg-white/30 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold" style={{ color: '#4B352A' }}>{selectedDessert.name}</h2>
                    <button onClick={closeDessertModal} className="hover:opacity-70" style={{ color: '#4B352A' }}>
                    <X size={24} />
                    </button>
                </div>
                <img
                    src={selectedDessert.image}
                    alt={selectedDessert.name}
                    className="w-full h-auto object-contain rounded-lg mb-6"
                    style={{ maxHeight: '400px' }}
                />
                <div className="space-y-6">
                    <p className="text-lg leading-relaxed" style={{ color: '#4B352A' }}>{selectedDessert.description}</p>
                    {/* Ingredients */}
                    <div className="border-t pt-4">
                    <h4 className="font-bold text-lg mb-3" style={{ color: '#4B352A' }}>Ingredients</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedDessert.ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4B352A' }}></span>
                            <span className="text-sm" style={{ color: '#4B352A' }}>{ingredient}</span>
                        </div>
                        ))}
                    </div>
                    </div>
                    {/* Nutritional Info */}
                    <div className="border-t pt-4">
                    <h4 className="font-bold text-lg mb-3" style={{ color: '#4B352A' }}>Nutritional Information</h4>
                    <div className="grid grid-cols-2 gap-3">
                        {Object.entries(selectedDessert.nutritionalInfo).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                            <span className="font-medium" style={{ color: '#4B352A' }}>{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                            <span style={{ color: '#4B352A' }}>{value}</span>
                        </div>
                        ))}
                    </div>
                    </div>
                    {/* Additional Info */}
                    <div className="border-t pt-4">
                    <h4 className="font-bold text-lg mb-3" style={{ color: '#4B352A' }}>Dessert Information</h4>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                        <span className="font-medium" style={{ color: '#4B352A' }}>Serving Size:</span>
                        <span style={{ color: '#4B352A' }}>{selectedDessert.servingSize}</span>
                        </div>
                        <div className="flex justify-between">
                        <span className="font-medium" style={{ color: '#4B352A' }}>Preparation Time:</span>
                        <span style={{ color: '#4B352A' }}>{selectedDessert.preparationTime}</span>
                        </div>
                        <div className="flex justify-between">
                        <span className="font-medium" style={{ color: '#4B352A' }}>Difficulty:</span>
                        <span style={{ color: '#4B352A' }}>{selectedDessert.difficulty}</span>
                        </div>
                    </div>
                    </div>
                    {/* Allergens */}
                    <div className="border-t pt-4">
                    <h4 className="font-bold text-lg mb-3" style={{ color: '#4B352A' }}>Allergen Information</h4>
                    <div className="flex flex-wrap gap-2">
                        {selectedDessert.allergens.map((allergen, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 rounded-full text-sm text-white"
                            style={{ backgroundColor: '#4B352A' }}
                        >
                            {allergen}
                        </span>
                        ))}
                    </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <button
                        onClick={() => {
                        addToCart(selectedDessert);
                        closeDessertModal();
                        }}
                        className="flex-1 text-white px-5 py-3 rounded-lg hover:opacity-80 transition-colors flex items-center justify-center gap-2"
                        style={{ backgroundColor: '#4B352A' }}
                    >
                        <Plus size={16} />
                        Add to Cart
                    </button>
                    <button
                        onClick={() => {
                        setCart([{ ...selectedDessert, quantity: 1 }]);
                        closeDessertModal();
                        setShowCheckout(true);
                        }}
                        className="flex-1 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                        🚀 Order Now
                    </button>
                    <button
                        onClick={closeDessertModal}
                        className="flex-1 border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )}

        {/* Checkout Modal */}
        {showCheckout && (
            <div className="fixed inset-0 backdrop-blur-md bg-white/30 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold" style={{ color: '#4B352A' }}>Checkout</h2>
                    <button onClick={() => setShowCheckout(false)} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                    </button>
                </div>
                <div className="space-y-6">
                    <div>
                    <h3 className="font-bold mb-3" style={{ color: '#4B352A' }}>Customer Details</h3>
                    <div className="space-y-4">
                        <input
                        type="text"
                        placeholder="Full Name"
                        value={customerDetails.name}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                        style={{ borderColor: '#4B352A' }}
                        />
                        <input
                        type="email"
                        placeholder="Email"
                        value={customerDetails.email}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                        style={{ borderColor: '#4B352A' }}
                        />
                        <input
                        type="tel"
                        placeholder="Phone Number"
                        value={customerDetails.phone}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                        style={{ borderColor: '#4B352A' }}
                        />
                        <textarea
                        placeholder="Delivery Address"
                        value={customerDetails.address}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                        style={{ borderColor: '#4B352A' }}
                        rows={3}
                        />
                    </div>
                    </div>
                    <div>
                    <h3 className="font-bold mb-3" style={{ color: '#4B352A' }}>Payment Method</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-4 border rounded-lg" style={{ borderColor: '#4B352A' }}>
                        <CreditCard style={{ color: '#4B352A' }} />
                        <span style={{ color: '#4B352A' }}>Credit/Debit Card</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 border rounded-lg" style={{ borderColor: '#4B352A' }}>
                        <Smartphone style={{ color: '#4B352A' }} />
                        <span style={{ color: '#4B352A' }}>Mobile Payment (GCash, PayMaya, etc.)</span>
                        </div>
                    </div>
                    </div>
                    <div>
                    <h3 className="font-bold mb-3" style={{ color: '#4B352A' }}>Upload Payment Screenshot</h3>
                    <div className="border-2 border-dashed p-6 rounded-lg text-center" style={{ borderColor: '#4B352A' }}>
                        {paymentScreenshot ? (
                        <div className="relative">
                            <img src={paymentScreenshot} alt="Payment Screenshot" className="max-h-40 mx-auto" />
                            <button
                            onClick={removeScreenshot}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            >
                            <X size={16} />
                            </button>
                        </div>
                        ) : (
                        <>
                            <Upload style={{ color: '#4B352A', margin: '0 auto' }} />
                            <p className="mt-2" style={{ color: '#4B352A' }}>Upload your payment screenshot here</p>
                            <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept="image/*"
                            className="hidden"
                            />
                            <button
                            onClick={() => fileInputRef.current?.click()}
                            className="mt-3 text-white px-4 py-2 rounded-lg hover:opacity-80 transition-colors"
                            style={{ backgroundColor: '#4B352A' }}
                            >
                            Choose File
                            </button>
                        </>
                        )}
                    </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <button
                        onClick={handleCheckout}
                        className="flex-1 text-white px-6 py-3 rounded-lg hover:opacity-80 transition-colors flex items-center justify-center gap-2"
                        style={{ backgroundColor: '#4B352A' }}
                    >
                        <FileText size={16} />
                        Place Order
                    </button>
                    <button
                        onClick={() => setShowCheckout(false)}
                        className="flex-1 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )}

        {/* Receipt Modal */}
        {showReceipt && orderDetails && (
            <div className="fixed inset-0 backdrop-blur-md bg-white/30 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold" style={{ color: '#4B352A' }}>Order Receipt</h2>
                    <button onClick={startNewOrder} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                    </button>
                </div>
                <div className="space-y-6">
                    <div className="border-b pb-4">
                    <h3 className="font-bold mb-3" style={{ color: '#4B352A' }}>Order Summary</h3>
                    <div className="space-y-3">
                        {orderDetails.items.map(item => (
                        <div key={item.id} className="flex justify-between">
                            <span style={{ color: '#4B352A' }}>{item.name} x {item.quantity}</span>
                            <span style={{ color: '#4B352A' }}>₱{item.price * item.quantity}</span>
                        </div>
                        ))}
                    </div>
                    <div className="flex justify-between font-bold mt-4 pt-4 border-t" style={{ color: '#4B352A' }}>
                        <span>Total</span>
                        <span>₱{orderDetails.total}</span>
                    </div>
                    </div>
                    <div className="border-b pb-4">
                    <h3 className="font-bold mb-3" style={{ color: '#4B352A' }}>Customer Details</h3>
                    <div className="space-y-2">
                        <p style={{ color: '#4B352A' }}><strong>Name:</strong> {orderDetails.customer.name}</p>
                        <p style={{ color: '#4B352A' }}><strong>Email:</strong> {orderDetails.customer.email}</p>
                        <p style={{ color: '#4B352A' }}><strong>Phone:</strong> {orderDetails.customer.phone}</p>
                        <p style={{ color: '#4B352A' }}><strong>Address:</strong> {orderDetails.customer.address}</p>
                    </div>
                    </div>
                    <div className="border-b pb-4">
                    <h3 className="font-bold mb-3" style={{ color: '#4B352A' }}>Payment</h3>
                    {orderDetails.paymentScreenshot ? (
                        <img src={orderDetails.paymentScreenshot} alt="Payment Screenshot" className="max-h-40 mx-auto" />
                    ) : (
                        <p style={{ color: '#4B352A' }}>No payment screenshot uploaded</p>
                    )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <button
                        onClick={() => printReceipt()}
                        className="flex-1 text-white px-6 py-3 rounded-lg hover:opacity-80 transition-colors flex items-center justify-center gap-2"
                        style={{ backgroundColor: '#4B352A' }}
                    >
                        <FileText size={16} />
                        Print Receipt
                    </button>
                    <button
                        onClick={startNewOrder}
                        className="flex-1 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        New Order
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )}
        </div>
    );
    };

    export default DessertOrderingSystem;