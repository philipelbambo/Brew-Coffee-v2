    import React, { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import {
    Package,
    MapPin,
    Clock,
    CheckCircle,
    User,
    Coffee,
    Phone,
    Star,
    LogOut,
    MessageSquare,
    X,
    Send,
    ThumbsDown,
    AlertCircle,
    Loader,
    Shield,
    } from 'lucide-react';

    // === TYPES ===
    interface Order {
    id: string;
    customerName: string;
    customerPhone: string;
    address: string;
    items: OrderItem[];
    status: 'pending' | 'picked_up' | 'delivering' | 'delivered' | 'declined';
    orderTime: string;
    totalAmount: number;
    estimatedDelivery: string;
    customerRating?: number;
    review?: string;
    chat: ChatMessage[];
    }

    interface OrderItem {
    name: string;
    quantity: number;
    price: number;
    notes?: string;
    }

    interface ChatMessage {
    sender: 'rider' | 'customer';
    message: string;
    timestamp: string;
    }

    interface CustomerReview {
    orderId: string;
    customerName: string;
    rating: number;
    review: string;
    date: string;
    }

    interface AdminMessage {
    sender: 'rider' | 'admin';
    message: string;
    timestamp: string;
    }

    // === MOCK DATA ===
    const initialOrders: Order[] = [
    {
        id: 'ORD-001',
        customerName: 'Maria Santos',
        customerPhone: '+63 912 345 6789',
        address: '123 Corrales Ave, Cagayan de Oro City',
        items: [
        { name: 'Americano', quantity: 2, price: 120 },
        { name: 'Cappuccino', quantity: 1, price: 150 },
        { name: 'Blueberry Muffin', quantity: 2, price: 80 },
        ],
        status: 'pending',
        orderTime: '10:30 AM',
        totalAmount: 550,
        estimatedDelivery: '11:15 AM',
        customerRating: 5,
        review: 'Fast delivery and coffee was hot!',
        chat: [
        { sender: 'customer', message: 'Hi, please be careful with my muffins!', timestamp: '10:35 AM' },
        { sender: 'rider', message: 'Will do, Maria! Safe and sound!', timestamp: '10:36 AM' },
        ],
    },
    {
        id: 'ORD-002',
        customerName: 'Juan Dela Cruz',
        customerPhone: '+63 917 234 5678',
        address: '456 J.R. Borja St, Cagayan de Oro City',
        items: [
        { name: 'Iced Coffee', quantity: 1, price: 100 },
        { name: 'Croissant', quantity: 1, price: 95 },
        ],
        status: 'picked_up',
        orderTime: '10:45 AM',
        totalAmount: 195,
        estimatedDelivery: '11:30 AM',
        customerRating: 4,
        review: 'Good, but a bit delayed.',
        chat: [],
    },
    ];

    // === MOCK REVIEWS ===
    const mockReviews: CustomerReview[] = [
    { orderId: 'ORD-001', customerName: 'Maria Santos', rating: 5, review: 'Excellent service!', date: 'Today' },
    { orderId: 'ORD-002', customerName: 'Juan Dela Cruz', rating: 4, review: 'Good, but a bit delayed.', date: 'Yesterday' },
    { orderId: 'ORD-003', customerName: 'Anna Rodriguez', rating: 5, review: 'Perfect delivery!', date: '2 days ago' },
    ];

    // === MAIN COMPONENT ===
    const RiderDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [activeTab, setActiveTab] = useState<
        'orders' | 'completed' | 'profile' | 'reviews' | 'chat' | 'admin' | 'admin-chat'
    >('orders');
    const [showSignOutModal, setShowSignOutModal] = useState(false);
    const [showDeclineModal, setShowDeclineModal] = useState(false);
    const [declineReason, setDeclineReason] = useState('');
    const [loading, setLoading] = useState(false);
    const [chatMessage, setChatMessage] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isAdminChatOpen, setIsAdminChatOpen] = useState(false);

    // Admin chat messages
    const [adminChat, setAdminChat] = useState<AdminMessage[]>([
        { sender: 'admin', message: 'Hi there! How can I help you today?', timestamp: '10:00 AM' },
    ]);

    // Auto-select first order
    useEffect(() => {
        if (orders.length > 0 && !selectedOrder) {
        setSelectedOrder(orders[0]);
        }
    }, [orders, selectedOrder]);

    // === FUNCTIONS ===
    const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
        setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
        );
        if (selectedOrder?.id === orderId) {
        setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
    };

    const declineOrder = () => {
        if (!selectedOrder || !declineReason.trim()) return;
        updateOrderStatus(selectedOrder.id, 'declined');
        setShowDeclineModal(false);
        setDeclineReason('');
    };

    const sendMessage = () => {
        if (!chatMessage.trim() || !selectedOrder) return;
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newMsg: ChatMessage = {
        sender: 'rider',
        message: chatMessage,
        timestamp: now,
        };
        setOrders((prev) =>
        prev.map((o) =>
            o.id === selectedOrder.id ? { ...o, chat: [...o.chat, newMsg] } : o
        )
        );
        setChatMessage('');
    };

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'picked_up': return 'bg-blue-100 text-blue-800';
        case 'delivering': return 'bg-purple-100 text-purple-800';
        case 'delivered': return 'bg-green-100 text-green-800';
        case 'declined': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getNextStatus = (currentStatus: Order['status']) => {
        switch (currentStatus) {
        case 'pending': return 'picked_up';
        case 'picked_up': return 'delivering';
        case 'delivering': return 'delivered';
        default: return currentStatus;
        }
    };

    const getStatusText = (status: Order['status']) => {
        switch (status) {
        case 'pending': return 'Pick Up';
        case 'picked_up': return 'Start Delivery';
        case 'delivering': return 'Mark Delivered';
        case 'delivered': return 'Completed';
        case 'declined': return 'Declined';
        default: return status;
        }
    };

    // === FILTERED ORDERS ===
    const activeOrders = orders.filter((o) => o.status !== 'delivered' && o.status !== 'declined');
    const completedOrders = orders.filter((o) => o.status === 'delivered');
    const declinedOrders = orders.filter((o) => o.status === 'declined');

    const handleSignOut = () => {
        setLoading(true);
        setTimeout(() => {
        navigate('/login');
        }, 1500);
    };

    // === UI ===
    return (
        <div className="flex h-screen w-screen bg-white overflow-hidden text-black">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
            <div className="p-6">
            <div className="flex items-center space-x-3">
                <Coffee className="h-8 w-8 text-black" />
                <h1 className="text-xl font-bold">Brew Coffee</h1>
            </div>
            <p className="text-sm text-gray-600 mt-1">Rider Dashboard</p>
            </div>

            <nav className="flex-1 mt-6">
            <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 ${
                activeTab === 'orders' ? 'bg-gray-100 border-r-4 border-black text-black' : ''
                }`}
            >
                <Package className="h-5 w-5 mr-3" />
                Active Orders ({activeOrders.length})
            </button>

            <button
                onClick={() => setActiveTab('completed')}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 ${
                activeTab === 'completed' ? 'bg-gray-100 border-r-4 border-black text-black' : ''
                }`}
            >
                <CheckCircle className="h-5 w-5 mr-3" />
                Completed ({completedOrders.length})
            </button>

            <button
                onClick={() => setActiveTab('reviews')}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 ${
                activeTab === 'reviews' ? 'bg-gray-100 border-r-4 border-black text-black' : ''
                }`}
            >
                <Star className="h-5 w-5 mr-3" />
                Customer Reviews
            </button>

            <button
                onClick={() => setActiveTab('chat')}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 ${
                activeTab === 'chat' ? 'bg-gray-100 border-r-4 border-black text-black' : ''
                }`}
            >
                <MessageSquare className="h-5 w-5 mr-3" />
                Messages
            </button>

            <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 ${
                activeTab === 'profile' ? 'bg-gray-100 border-r-4 border-black text-black' : ''
                }`}
            >
                <User className="h-5 w-5 mr-3" />
                Profile
            </button>

            <div className="px-6 mt-6">
                <p className="text-xs uppercase font-semibold text-gray-500 mb-2">Support</p>

                <button
                onClick={() => {
                    setActiveTab('admin-chat');
                    setIsAdminChatOpen(true);
                }}
                className={`w-full flex items-center px-4 py-2 text-left rounded hover:bg-gray-100 ${
                    activeTab === 'admin-chat'
                    ? 'bg-red-50 border-r-4 border-red-600 text-red-700'
                    : 'text-black'
                }`}
                >
                <MessageSquare className="h-5 w-5 mr-3" />
                Chat with Admin
                </button>

                <button
                onClick={() => setActiveTab('admin')}
                className={`w-full flex items-center px-4 py-2 text-left rounded hover:bg-gray-100 mt-2 ${
                    activeTab === 'admin'
                    ? 'bg-red-50 border-r-4 border-red-600 text-red-700'
                    : 'text-black'
                }`}
                >
                <Shield className="h-5 w-5 mr-3" />
                Admin Panel
                </button>
            </div>
            </nav>

            <button
            onClick={() => setShowSignOutModal(true)}
            className="w-full flex items-center px-6 py-3 text-left text-black hover:bg-red-50 mt-auto"
            >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
            </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <header className="bg-white shadow-sm border-b px-6 py-4">
            <div className="flex items-center justify-between">
                <div>
                <h2 className="text-2xl font-bold">
                    {activeTab === 'orders' && 'Active Orders'}
                    {activeTab === 'completed' && 'Completed Orders'}
                    {activeTab === 'reviews' && 'Customer Reviews'}
                    {activeTab === 'chat' && 'Messages'}
                    {activeTab === 'profile' && 'Rider Profile'}
                    {activeTab === 'admin' && 'Admin Panel'}
                    {activeTab === 'admin-chat' && 'Admin Support'}
                </h2>
                <p className="text-gray-600">
                    {activeTab === 'orders' && 'Manage your delivery orders'}
                    {activeTab === 'completed' && 'View your completed deliveries'}
                    {activeTab === 'reviews' && 'See customer feedback'}
                    {activeTab === 'chat' && 'Chat with customers'}
                    {activeTab === 'profile' && 'Manage your profile settings'}
                    {activeTab === 'admin' && 'Admin controls (demo)'}
                    {activeTab === 'admin-chat' && 'Chat with support team'}
                </p>
                </div>
                <div className="flex items-center space-x-4">
                <div className="text-right">
                    <p className="text-sm text-gray-600">Welcome back,</p>
                    <p className="font-semibold">Rider Mike</p>
                </div>
                <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                </div>
                </div>
            </div>
            </header>

            <div className="flex flex-1 min-h-0 overflow-hidden">
            {/* Left Panel: Orders / Reviews / Chat / Admin */}
            <div className="w-2/3 p-6 overflow-y-auto">
                {activeTab === 'orders' && (
                <div className="space-y-4">
                    {activeOrders.length === 0 ? (
                    <p className="text-gray-500">No pending orders.</p>
                    ) : (
                    activeOrders.map((order) => (
                        <div
                        key={order.id}
                        className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all hover:shadow-lg ${
                            selectedOrder?.id === order.id ? 'ring-2 ring-black' : ''
                        }`}
                        onClick={() => setSelectedOrder(order)}
                        >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                            <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                                <Coffee className="h-6 w-6 text-black" />
                            </div>
                            <div>
                                <h3 className="font-semibold">{order.customerName}</h3>
                                <p className="text-sm text-gray-600">Order #{order.id}</p>
                            </div>
                            </div>
                            <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                order.status
                            )}`}
                            >
                            {order.status.replace('_', ' ').toUpperCase()}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            {order.orderTime} → {order.estimatedDelivery}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            {order.address.split(',')[0]}...
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                            {order.items.length} item(s) • ₱{order.totalAmount}
                            </p>
                            {order.status !== 'delivered' && (
                            <div className="flex space-x-2">
                                <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    updateOrderStatus(order.id, getNextStatus(order.status));
                                }}
                                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm font-medium"
                                >
                                {getStatusText(order.status)}
                                </button>
                                <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedOrder(order);
                                    setShowDeclineModal(true);
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                                >
                                <ThumbsDown className="h-4 w-4" />
                                </button>
                            </div>
                            )}
                        </div>
                        </div>
                    ))
                    )}
                </div>
                )}

                {activeTab === 'reviews' && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Customer Reviews</h3>
                    {mockReviews.map((rev, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow border">
                        <div className="flex items-center mb-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{rev.rating}.0</span>
                        <span className="text-gray-500 ml-2">by {rev.customerName}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">{rev.review}</p>
                        <p className="text-xs text-gray-500">{rev.date}</p>
                    </div>
                    ))}
                </div>
                )}

                {activeTab === 'chat' && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Messages</h3>
                    {orders
                    .filter((o) => o.chat.length > 0)
                    .map((order) => (
                        <div
                        key={order.id}
                        className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50"
                        onClick={() => {
                            setSelectedOrder(order);
                            setIsChatOpen(true);
                        }}
                        >
                        <div className="flex justify-between">
                            <h4 className="font-medium">{order.customerName}</h4>
                            <span className="text-xs text-gray-500">
                            {order.chat[order.chat.length - 1]?.timestamp}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                            {order.chat[order.chat.length - 1]?.message}
                        </p>
                        </div>
                    ))}
                </div>
                )}

                {activeTab === 'admin' && (
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                    <h3 className="text-lg font-semibold text-red-800 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Admin Panel (Demo)
                    </h3>
                    <p className="text-red-700 mt-2">This is a demo admin section.</p>
                    <ul className="list-disc list-inside mt-2 text-sm text-red-600">
                    <li>View all orders</li>
                    <li>Manage riders</li>
                    <li>Customer support</li>
                    </ul>
                </div>
                )}

                {activeTab === 'admin-chat' && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Admin Support</h3>
                    <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-700">
                    <p>Need help with orders, payments, or issues? Message the admin here.</p>
                    </div>
                    <div
                    className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50 flex items-center"
                    onClick={() => setIsAdminChatOpen(true)}
                    >
                    <div className="h-10 w-10 bg-red-600 rounded-full flex items-center justify-center">
                        <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-3">
                        <h4 className="font-medium">Admin Support Team</h4>
                        <p className="text-sm text-gray-600 truncate">
                        {adminChat[adminChat.length - 1]?.message}
                        </p>
                    </div>
                    <div className="ml-auto text-xs text-gray-500">
                        {adminChat[adminChat.length - 1]?.timestamp}
                    </div>
                    </div>
                </div>
                )}

                {activeTab === 'profile' && (
                <div className="max-w-2xl">
                    <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="h-20 w-20 bg-black rounded-full flex items-center justify-center">
                        <User className="h-10 w-10 text-white" />
                        </div>
                        <div>
                        <h3 className="text-xl font-semibold">Mike Johnson</h3>
                        <p className="text-gray-600">Rider ID: RID-001</p>
                        <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium ml-1">4.8 Rating</span>
                            <span className="text-sm text-gray-500 ml-2">(127 reviews)</span>
                        </div>
                        </div>
                    </div>
                    <p className="text-gray-700">Phone: +63 912 345 6789</p>
                    <p className="text-gray-700 mt-1">Vehicle: Motorcycle (ABC-123)</p>
                    <p className="text-gray-700 mt-2">Shift: 8:00 AM - 5:00 PM</p>
                    </div>
                </div>
                )}
            </div>

            {/* Right Panel: Order Details / Chat / Admin Chat */}
            <div className="w-1/3 bg-white border-l p-6 overflow-y-auto">
                {activeTab === 'orders' && selectedOrder && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">Order Details</h3>
                    <div className="mb-6">
                    <h4 className="font-medium mb-2">Customer</h4>
                    <p>{selectedOrder.customerName}</p>
                    <p className="text-sm text-gray-600">{selectedOrder.customerPhone}</p>
                    </div>

                    <div className="mb-6">
                    <h4 className="font-medium mb-2">Address</h4>
                    <p className="text-sm">{selectedOrder.address}</p>
                    </div>

                    <div className="mb-6">
                    <h4 className="font-medium mb-3">Items</h4>
                    {selectedOrder.items.map((item, i) => (
                        <p key={i} className="text-sm">
                        {item.quantity}x {item.name} - ₱{item.price * item.quantity}
                        </p>
                    ))}
                    <p className="font-bold mt-2">Total: ₱{selectedOrder.totalAmount}</p>
                    </div>

                    {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'declined' && (
                    <div className="space-y-2">
                        <button
                        onClick={() =>
                            updateOrderStatus(selectedOrder.id, getNextStatus(selectedOrder.status))
                        }
                        className="w-full py-2 bg-black text-white rounded hover:bg-gray-800"
                        >
                        {getStatusText(selectedOrder.status)}
                        </button>
                        <button
                        onClick={() => setShowDeclineModal(true)}
                        className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                        Decline Order
                        </button>
                    </div>
                    )}
                </div>
                )}

                {isChatOpen && selectedOrder && activeTab === 'chat' && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Chat with {selectedOrder.customerName}</h3>
                    <button onClick={() => setIsChatOpen(false)}>
                        <X className="h-5 w-5" />
                    </button>
                    </div>
                    <div className="space-y-3 mb-4 h-64 overflow-y-auto">
                    {selectedOrder.chat.map((msg, i) => (
                        <div
                        key={i}
                        className={`p-2 rounded-lg max-w-xs ${
                            msg.sender === 'rider' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
                        }`}
                        >
                        <p className="text-sm">{msg.message}</p>
                        <span className="text-xs text-gray-500">{msg.timestamp}</span>
                        </div>
                    ))}
                    </div>
                    <div className="flex">
                    <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 border rounded-l px-2 py-1"
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button onClick={sendMessage} className="bg-black text-white px-3 py-1 rounded-r">
                        <Send className="h-4 w-4" />
                    </button>
                    </div>
                </div>
                )}

                {isAdminChatOpen && activeTab === 'admin-chat' && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Admin Support</h3>
                    <button onClick={() => setIsAdminChatOpen(false)}>
                        <X className="h-5 w-5" />
                    </button>
                    </div>

                    <div className="space-y-3 mb-4 h-64 overflow-y-auto">
                    {adminChat.map((msg, i) => (
                        <div
                        key={i}
                        className={`p-2 rounded-lg max-w-xs ${
                            msg.sender === 'rider' ? 'bg-blue-100 ml-auto' : 'bg-red-100'
                        }`}
                        >
                        <p className="text-sm">{msg.message}</p>
                        <span className="text-xs text-gray-500">{msg.timestamp}</span>
                        </div>
                    ))}
                    </div>

                    <div className="flex">
                    <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Ask the admin..."
                        className="flex-1 border rounded-l px-2 py-1"
                        onKeyPress={(e) => {
                        if (e.key === 'Enter' && chatMessage.trim()) {
                            const now = new Date().toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            });
                            const newMsg: AdminMessage = {
                            sender: 'rider',
                            message: chatMessage,
                            timestamp: now,
                            };

                            setAdminChat((prev) => [...prev, newMsg]);

                            // Simulate admin reply
                            setTimeout(() => {
                            setAdminChat((prev) => [
                                ...prev,
                                {
                                sender: 'admin',
                                message: "Thanks for your message. We'll get back to you soon!",
                                timestamp: new Date().toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                }),
                                },
                            ]);
                            }, 1000);

                            setChatMessage('');
                        }
                        }}
                    />
                    <button
                        onClick={() => {
                        if (!chatMessage.trim()) return;
                        const now = new Date().toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        });
                        const newMsg: AdminMessage = {
                            sender: 'rider',
                            message: chatMessage,
                            timestamp: now,
                        };

                        setAdminChat((prev) => [...prev, newMsg]);

                        // Simulate auto-reply
                        setTimeout(() => {
                            setAdminChat((prev) => [
                            ...prev,
                            {
                                sender: 'admin',
                                message: 'Your request has been received. Support team is on it.',
                                timestamp: new Date().toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                }),
                            },
                            ]);
                        }, 1000);

                        setChatMessage('');
                        }}
                        className="bg-black text-white px-3 py-1 rounded-r"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                    </div>
                </div>
                )}
            </div>
            </div>

            {/* Modals */}
            {showSignOutModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-lg font-semibold mb-4">Sign out?</h3>
                <div className="flex justify-end space-x-4">
                    <button
                    onClick={() => setShowSignOutModal(false)}
                    disabled={loading}
                    className="px-4 py-2 border border-gray-300 rounded-md text-black hover:bg-gray-100"
                    >
                    No
                    </button>
                    <button
                    onClick={handleSignOut}
                    disabled={loading}
                    className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-500 flex items-center"
                    >
                    {loading ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : 'Yes'}
                    {loading ? 'Signing out...' : ''}
                    </button>
                </div>
                </div>
            </div>
            )}

            {showDeclineModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-lg font-semibold mb-4">Decline Order?</h3>
                <textarea
                    value={declineReason}
                    onChange={(e) => setDeclineReason(e.target.value)}
                    placeholder="Reason for declining..."
                    className="w-full border rounded p-2 mb-4"
                    rows={3}
                />
                <div className="flex justify-end space-x-4">
                    <button
                    onClick={() => setShowDeclineModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-black"
                    >
                    Cancel
                    </button>
                    <button
                    onClick={declineOrder}
                    className="px-4 py-2 bg-red-600 text-white rounded-md"
                    >
                    Decline
                    </button>
                </div>
                </div>
            </div>
            )}
        </div>
        </div>
    );
    };

    export default RiderDashboard;