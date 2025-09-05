    // components/OrderModal.tsx
    import React, { useState } from 'react';
    import {
    ShoppingCart,
    Plus,
    Minus,
    X,
    CheckCircle,
    Upload,
    CreditCard,
    Smartphone,
    Truck,
    ArrowLeft,
    } from 'lucide-react';
    import { toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import { CartItem, CoffeeProduct, Dessert, PaymentMethod, CheckoutForm, OrderData } from './Types';
    import { formatPrice } from './FormatPrice';

    interface OrderModalProps {
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
    isCheckoutOpen: boolean;
    setIsCheckoutOpen: (open: boolean) => void;
    desserts: Dessert[];
    paymentMethods: PaymentMethod[];
    regions: string[];
    orderPlaced: boolean;
    setOrderPlaced: (placed: boolean) => void;
    placedOrderData: OrderData | null;
    setPlacedOrderData: React.Dispatch<React.SetStateAction<OrderData | null>>;
    addToCart: (coffee: CoffeeProduct) => void;
    isOrderingNow: CoffeeProduct | false;
    setIsOrderingNow: (coffee: CoffeeProduct | false) => void;
    selectedDesserts: { [key: string]: number };
    setSelectedDesserts: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
    }

    export const OrderModal: React.FC<OrderModalProps> = ({
    cart,
    setCart,
    isCartOpen,
    setIsCartOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    desserts,
    paymentMethods,
    regions,
    orderPlaced,
    setOrderPlaced,
    placedOrderData,
    setPlacedOrderData,
    addToCart,
    isOrderingNow,
    setIsOrderingNow,
    selectedDesserts,
    setSelectedDesserts,
    }) => {
    const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        shippingAddress: '',
        region: '',
        paymentMethod: '',
        paymentScreenshot: null,
    });

    const getTotalPrice = (): string => {
        return cart
        .reduce((total, item) => {
            const coffeeTotal = item.price * item.quantity;
            const dessertTotal =
            item.desserts?.reduce((sum, d) => sum + d.price * d.quantity, 0) || 0;
            return total + coffeeTotal + dessertTotal;
        }, 0)
        .toFixed(2);
    };

    const getTotalItems = (): number => {
        return cart.reduce((total, item) => {
        const dessertCount = item.desserts?.reduce((sum, d) => sum + d.quantity, 0) || 0;
        return total + item.quantity + dessertCount;
        }, 0);
    };

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity <= 0) {
        setCart((prev) => prev.filter((item) => item.id !== id));
        } else {
        setCart((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
        );
        }
    };

    const updateDessertQuantity = (cartItemId: string, dessertId: string, newQty: number) => {
        if (newQty <= 0) {
        setCart((prev) =>
            prev.map((item) => {
            if (item.id !== cartItemId) return item;
            return {
                ...item,
                desserts: item.desserts?.filter((d) => d.id !== dessertId),
            };
            })
        );
        } else {
        setCart((prev) =>
            prev.map((item) => {
            if (item.id !== cartItemId) return item;
            return {
                ...item,
                desserts: item.desserts?.map((d) =>
                d.id === dessertId ? { ...d, quantity: newQty } : d
                ),
            };
            })
        );
        }
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const handleFormChange = (field: keyof CheckoutForm, value: string) => {
        setCheckoutForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        setCheckoutForm((prev) => ({ ...prev, paymentScreenshot: file }));
        }
    };

    const validateForm = (): boolean => {
        const required: Array<keyof Omit<CheckoutForm, 'paymentScreenshot'>> = [
        'firstName',
        'lastName',
        'email',
        'contactNumber',
        'shippingAddress',
        'region',
        'paymentMethod',
        ];
        return required.every((field) => checkoutForm[field].trim() !== '');
    };

    const handlePlaceOrder = () => {
        if (!validateForm()) {
        toast.error('Please fill in all required fields.', {
            position: 'top-center',
            autoClose: 3000,
        });
        return;
        }

        const orderData: OrderData = {
        customer: `${checkoutForm.firstName} ${checkoutForm.lastName}`,
        email: checkoutForm.email,
        contact: checkoutForm.contactNumber,
        address: checkoutForm.shippingAddress,
        region: checkoutForm.region,
        paymentMethod:
            paymentMethods.find((p) => p.id === checkoutForm.paymentMethod)?.name || '',
        items: cart.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            desserts: item.desserts || [],
        })),
        total: getTotalPrice(),
        date: new Date().toLocaleString(),
        };

        setPlacedOrderData(orderData);
        setOrderPlaced(true);

        toast(
        <div className="text-center text-black">
            <p className="font-bold text-lg mb-2">🎉 Order Confirmed!</p>
            <p className="text-sm mb-4">Your order has been placed successfully.</p>
            <div className="flex justify-center space-x-3">
            <button
                onClick={() => {
                window.print();
                toast.dismiss();
                }}
                className="bg-[#4B352A] text-white px-5 py-2 rounded font-semibold hover:bg-[#3a3912] transition text-sm"
            >
                Print Receipt
            </button>
            <button
                onClick={() => toast.dismiss()}
                className="bg-gray-300 text-[#4B352A] px-5 py-2 rounded font-semibold hover:bg-gray-400 transition text-sm"
            >
                Close
            </button>
            </div>
        </div>,
        {
            position: 'top-center',
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            style: { width: '400px', padding: '16px', textAlign: 'left' },
        }
        );

        setCart([]);
        setCheckoutForm({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        shippingAddress: '',
        region: '',
        paymentMethod: '',
        paymentScreenshot: null,
        });
        setIsCheckoutOpen(false);
    };

    return (
        <>
        {/* Order Now Modal */}
        {isOrderingNow && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
                <div className="flex items-center mb-4">
                <button
                    onClick={() => setIsOrderingNow(false)}
                    className="hover:bg-gray-100 p-2 rounded-full transition-colors mr-3"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h3 className="text-2xl font-bold">Customize Your Order</h3>
                </div>
                <p className="text-gray-600 mb-6">
                Would you like to add desserts to your {(isOrderingNow as CoffeeProduct).name}?
                </p>
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                {desserts.map((dessert) => (
                    <div
                    key={dessert.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                    <div className="flex items-center space-x-3">
                        <img
                        src={dessert.image}
                        alt={dessert.name}
                        className="w-12 h-12 rounded object-cover"
                        />
                        <div>
                        <p className="font-medium">{dessert.name}</p>
                        <p className="text-sm text-gray-500">{formatPrice(dessert.price)}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                        onClick={() =>
                            setSelectedDesserts((prev) => ({
                            ...prev,
                            [dessert.id]: Math.max(0, (prev[dessert.id] || 0) - 1),
                            }))
                        }
                        className="bg-gray-200 hover:bg-gray-300 p-1 rounded w-8 text-center"
                        >
                        <Minus className="w-4 h-4 mx-auto" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                        {selectedDesserts[dessert.id] || 0}
                        </span>
                        <button
                        onClick={() =>
                            setSelectedDesserts((prev) => ({
                            ...prev,
                            [dessert.id]: (prev[dessert.id] || 0) + 1,
                            }))
                        }
                        className="bg-[#4B352A] hover:bg-[#4B352A] text-white p-1 rounded w-8 text-center"
                        >
                        <Plus className="w-4 h-4 mx-auto" />
                        </button>
                    </div>
                    </div>
                ))}
                </div>
                <div className="flex space-x-4">
                <button
                    onClick={() => {
                    addToCart(isOrderingNow as CoffeeProduct);
                    setIsOrderingNow(false);
                    }}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-[#4B352A] py-3 rounded-lg font-semibold"
                >
                    Add to Cart
                </button>
                <button
                    onClick={() => {
                    addToCart(isOrderingNow as CoffeeProduct);
                    setIsOrderingNow(false);
                    setIsCartOpen(true);
                    }}
                    className="flex-1 bg-[#4B352A] hover:bg-[#4B352A] text-white py-3 rounded-lg font-semibold"
                >
                    Order Now
                </button>
                </div>
            </div>
            </div>
        )}

        {/* Cart Modal */}
        {isCartOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
                <div className="bg-[#4B352A] text-white p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center space-x-2">
                    <ShoppingCart className="w-6 h-6" />
                    <span>Your Cart</span>
                </h2>
                <button
                    onClick={() => setIsCartOpen(false)}
                    className="hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-96">
                {cart.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">Your cart is empty</p>
                ) : (
                    <div className="space-y-6">
                    {cart.map((item) => (
                        <div key={item.id} className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden">
                                <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-[#4B352A] font-bold">{formatPrice(item.price)}</p>
                            </div>
                            </div>
                            <div className="flex items-center space-x-3">
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-semibold w-8 text-center">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="bg-[#4B352A] hover:bg-[#4B352A] text-white p-2 rounded-full"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full ml-2"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            </div>
                        </div>

                        {item.desserts && item.desserts.length > 0 && (
                            <div className="ml-20 mt-3 space-y-2 border-t pt-3">
                            <p className="text-sm font-semibold text-gray-700">With Desserts:</p>
                            {item.desserts.map((d) => (
                                <div
                                key={d.id}
                                className="flex justify-between items-center text-sm"
                                >
                                <span>
                                    {d.name} x{d.quantity}
                                </span>
                                <div className="flex items-center space-x-2">
                                    <button
                                    onClick={() =>
                                        updateDessertQuantity(item.id, d.id, d.quantity - 1)
                                    }
                                    className="bg-gray-200 hover:bg-gray-300 p-1 rounded w-6"
                                    >
                                    <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="font-medium">
                                    {formatPrice(d.price * d.quantity)}
                                    </span>
                                    <button
                                    onClick={() =>
                                        updateDessertQuantity(item.id, d.id, d.quantity + 1)
                                    }
                                    className="bg-[#4B352A] hover:bg-[#4B352A] text-white p-1 rounded w-6"
                                    >
                                    <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                                </div>
                            ))}
                            </div>
                        )}
                        </div>
                    ))}
                    </div>
                )}
                </div>

                {cart.length > 0 && (
                <div className="border-t bg-gray-50 p-6">
                    <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold">Total: {formatPrice(getTotalPrice())}</span>
                    <span className="text-gray-600">({getTotalItems()} items)</span>
                    </div>
                    <button
                    onClick={() => {
                        setIsCartOpen(false);
                        setIsCheckoutOpen(true);
                    }}
                    className="w-full bg-[#4B352A] hover:bg-[#3a3912] text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow"
                    >
                    Proceed to Checkout
                    </button>
                </div>
                )}
            </div>
            </div>
        )}

        {/* Checkout Modal */}
        {isCheckoutOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                <div className="bg-[#4B352A] text-white p-6 rounded-t-2xl">
                <h2 className="text-2xl font-bold text-center flex items-center justify-center space-x-2">
                    <CheckCircle className="w-7 h-7" />
                    <span>Complete Your Order</span>
                </h2>
                </div>

                <div className="p-6 overflow-y-auto max-h-[75vh]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Customer Info */}
                    <div className="space-y-6">
                    <h3 className="text-xl font-bold mb-4 border-b pb-2">Customer Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                        <label className="block text-sm font-medium mb-2">First Name *</label>
                        <input
                            type="text"
                            value={checkoutForm.firstName}
                            onChange={(e) => handleFormChange('firstName', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#4B352A] focus:outline-none focus:ring-2 focus:ring-[#4C4B16]/20"
                            placeholder="Enter first name"
                        />
                        </div>
                        <div>
                        <label className="block text-sm font-medium mb-2">Last Name *</label>
                        <input
                            type="text"
                            value={checkoutForm.lastName}
                            onChange={(e) => handleFormChange('lastName', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#4B352A] focus:outline-none focus:ring-2 focus:ring-[#4C4B16]/20"
                            placeholder="Enter last name"
                        />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Email Address *</label>
                        <input
                        type="email"
                        value={checkoutForm.email}
                        onChange={(e) => handleFormChange('email', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#4B352A] focus:outline-none focus:ring-2 focus:ring-[#4C4B16]/20"
                        placeholder="Enter email address"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Contact Number *</label>
                        <input
                        type="tel"
                        value={checkoutForm.contactNumber}
                        onChange={(e) => handleFormChange('contactNumber', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#4B352A] focus:outline-none focus:ring-2 focus:ring-[#4C4B16]/20"
                        placeholder="Enter contact number"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Shipping Address *</label>
                        <textarea
                        value={checkoutForm.shippingAddress}
                        onChange={(e) => handleFormChange('shippingAddress', e.target.value)}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#4B352A] focus:outline-none focus:ring-2 focus:ring-[#4C4B16]/20"
                        placeholder="Enter complete shipping address"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Region *</label>
                        <select
                        value={checkoutForm.region}
                        onChange={(e) => handleFormChange('region', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#4B352A] focus:outline-none focus:ring-2 focus:ring-[#4C4B16]/20"
                        >
                        <option value="">Select Region</option>
                        {regions.map((region) => (
                            <option key={region} value={region}>
                            {region}
                            </option>
                        ))}
                        </select>
                    </div>
                    </div>

                    {/* Payment & Summary */}
                    <div className="space-y-6">
                    <h3 className="text-xl font-bold mb-4 border-b pb-2">Payment Method *</h3>
                    <div className="space-y-4">
                        {paymentMethods.map((method) => (
                        <div
                            key={method.id}
                            className="border border-gray-200 rounded-lg p-4 hover:border-[#4B352A] transition-colors"
                        >
                            <label className="flex items-start space-x-3 cursor-pointer">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value={method.id}
                                checked={checkoutForm.paymentMethod === method.id}
                                onChange={(e) => handleFormChange('paymentMethod', e.target.value)}
                                className="mt-1 text-[#4B352A] focus:ring-[#4B352A]"
                            />
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                {method.icon}
                                <span className="font-medium">{method.name}</span>
                                </div>
                                <p className="text-sm text-gray-600">{method.description}</p>
                                {method.id === 'gcash' && checkoutForm.paymentMethod === 'gcash' && (
                                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <h4 className="font-medium text-blue-900 mb-2">GCash Payment Details:</h4>
                                    <div className="text-sm text-blue-800">
                                    <p><strong>GCash Number:</strong> {method.number}</p>
                                    <p><strong>Account Name:</strong> {method.accountName}</p>
                                    <p className="mt-2 text-blue-700">
                                        Please send your payment and upload a screenshot below (optional).
                                    </p>
                                    </div>
                                </div>
                                )}
                            </div>
                            </label>
                        </div>
                        ))}
                    </div>

                    {checkoutForm.paymentMethod === 'gcash' && (
                        <div className="mt-6">
                        <label className="block text-sm font-medium mb-2">
                            Payment Screenshot <span className="text-gray-500">(Optional)</span>
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#4B352A] transition-colors">
                            <input
                            type="file"
                            id="paymentScreenshot"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            />
                            <label htmlFor="paymentScreenshot" className="cursor-pointer">
                            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                            <p className="text-gray-600 mb-2">
                                {checkoutForm.paymentScreenshot
                                ? checkoutForm.paymentScreenshot.name
                                : 'Click to upload payment screenshot'}
                            </p>
                            <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                            </label>
                        </div>
                        </div>
                    )}

                    <div className="bg-gray-50 rounded-lg p-6 mt-6">
                        <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                        <div className="space-y-3">
                        {cart.map((item) => (
                            <div key={item.id} className="border-b pb-2">
                            <div className="flex justify-between font-medium">
                                <span>{item.name} x{item.quantity}</span>
                                <span>{formatPrice(item.price * item.quantity)}</span>
                            </div>
                            {item.desserts?.map((d) => (
                                <div key={d.id} className="text-sm text-gray-600 ml-4">
                                • {d.name} x{d.quantity} = {formatPrice(d.price * d.quantity)}
                                </div>
                            ))}
                            </div>
                        ))}
                        <div className="border-t pt-3 mt-3">
                            <div className="flex justify-between">
                            <span className="text-lg font-bold">Total</span>
                            <span className="text-2xl font-bold text-[#4B352A]">
                                {formatPrice(getTotalPrice())}
                            </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">({getTotalItems()} items)</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
                    <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-[#4B352A] py-3 px-6 rounded-xl font-semibold transition-colors"
                    >
                    Cancel
                    </button>
                    <button
                    onClick={handlePlaceOrder}
                    disabled={!validateForm()}
                    className={`flex-2 py-3 px-8 rounded-xl font-semibold transition-all duration-300 ${
                        validateForm()
                        ? 'bg-[#4B352A] hover:bg-[#6b6932] text-white transform hover:scale-105 shadow'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    >
                    Place Order - {formatPrice(getTotalPrice())}
                    </button>
                </div>
                </div>
            </div>
            </div>
        )}

        {/* Printable Receipt */}
        {orderPlaced && placedOrderData && (
            <div id="printable-receipt" className="print:block hidden fixed inset-0 bg-white p-8">
            <div className="max-w-md mx-auto bg-white p-6 border border-gray-300 shadow-none">
                <h1 className="text-3xl font-bold text-center text-[#4B352A] mb-2">Brew Coffee</h1>
                <p className="text-center text-gray-600 mb-6">Thank you for your order!</p>
                <hr className="my-4 border-gray-300" />
                <div className="space-y-2 text-sm">
                <p><strong>Customer:</strong> {placedOrderData.customer}</p>
                <p><strong>Email:</strong> {placedOrderData.email}</p>
                <p><strong>Contact:</strong> {placedOrderData.contact}</p>
                <p><strong>Address:</strong> {placedOrderData.address}, {placedOrderData.region}</p>
                <p><strong>Payment:</strong> {placedOrderData.paymentMethod}</p>
                <p><strong>Date:</strong> {placedOrderData.date}</p>
                </div>
                <hr className="my-4 border-gray-300" />
                <h2 className="font-bold text-lg mb-3">Order Details</h2>
                {placedOrderData.items.map((item, idx) => (
                <div key={idx} className="mb-3">
                    <p className="font-medium">
                    {item.name} x{item.quantity} - {formatPrice(item.price * item.quantity)}
                    </p>
                    {item.desserts.map((d) => (
                    <p key={d.id} className="text-sm text-gray-700 ml-4">
                        • {d.name} x{d.quantity} - {formatPrice(d.price * d.quantity)}
                    </p>
                    ))}
                </div>
                ))}
                <hr className="my-4 border-gray-300" />
                <div className="text-right">
                <p className="text-lg font-bold">Total: {formatPrice(placedOrderData.total)}</p>
                </div>
                <div className="text-center mt-6 text-gray-500 text-xs">
                <p>Order # {Date.now().toString().slice(-6)}</p>
                <p>We hope to see you again soon!</p>
                </div>
            </div>
            </div>
        )}
        </>
    );
    };  