    // RiderDashboard.tsx
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

    // Import types and data from same folder
    import { Order, ChatMessage, AdminMessage } from './types';
    import { initialOrders, mockReviews } from './mockData';

    // Import components from same folder
    import OrderCard from './OrderCard';
    import ChatWindow from './ChatWindow';
    import AdminChatWindow from './AdminChatWindow';
    import { SignOutModal, DeclineModal } from './Modals';

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
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden fixed top-4 left-4 z-50">
            <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-gray-100 rounded-md shadow-md"
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
            </svg>
            </button>
        </div>

        {/* Sidebar */}
        <div
            className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col z-40 transition-transform duration-300 ease-in-out md:z-auto`}
        >
            <div className="p-6">
            <div className="flex items-center space-x-3">
                <Coffee className="h-8 w-8 text-black" />
                <h1 className="text-xl font-bold">Brew Coffee</h1>
            </div>
            <p className="text-sm text-gray-600 mt-1">Rider Dashboard</p>
            </div>

            <nav className="flex-1 mt-6">
            <button
                onClick={() => {
                setActiveTab('orders');
                setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 ${
                activeTab === 'orders' ? 'bg-gray-100 border-r-4 border-black text-black' : ''
                }`}
            >
                <Package className="h-5 w-5 mr-3" />
                Active Orders ({activeOrders.length})
            </button>

            <button
                onClick={() => {
                setActiveTab('completed');
                setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 ${
                activeTab === 'completed' ? 'bg-gray-100 border-r-4 border-black text-black' : ''
                }`}
            >
                <CheckCircle className="h-5 w-5 mr-3" />
                Completed ({completedOrders.length})
            </button>

            <button
                onClick={() => {
                setActiveTab('reviews');
                setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 ${
                activeTab === 'reviews' ? 'bg-gray-100 border-r-4 border-black text-black' : ''
                }`}
            >
                <Star className="h-5 w-5 mr-3" />
                Customer Reviews
            </button>

            <button
                onClick={() => {
                setActiveTab('chat');
                setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 ${
                activeTab === 'chat' ? 'bg-gray-100 border-r-4 border-black text-black' : ''
                }`}
            >
                <MessageSquare className="h-5 w-5 mr-3" />
                Messages
            </button>

            <button
                onClick={() => {
                setActiveTab('profile');
                setIsSidebarOpen(false);
                }}
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
                    setIsSidebarOpen(false);
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
                onClick={() => {
                    setActiveTab('admin');
                    setIsSidebarOpen(false);
                }}
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
                    {activeTab === 'orders' && <span className="ml-12">Active Orders</span>}
                    {activeTab === 'completed' && <span className="ml-12">Completed Orders</span>}
                    {activeTab === 'reviews' && <span className="ml-12">Customer Reviews</span>}
                    {activeTab === 'chat' && <span className="ml-12">Messages</span>}
                    {activeTab === 'profile' && <span className="ml-12">Rider Profile</span>}
                    {activeTab === 'admin' && <span className="ml-12">Admin Panel</span>}
                    {activeTab === 'admin-chat' && <span className="ml-12">Admin Support</span>}
                </h2>

                <p className="text-gray-600">
                    {activeTab === 'orders' && <span className="ml-12">Manage your delivery orders</span>}
                    {activeTab === 'completed' && <span className="ml-12">View your completed deliveries</span>}
                    {activeTab === 'reviews' && <span className="ml-12">See customer feedback</span>}
                    {activeTab === 'chat' && <span className="ml-12">Chat with customers</span>}
                    {activeTab === 'profile' && <span className="ml-12">Manage your profile settings</span>}
                    {activeTab === 'admin' && <span className="ml-12">Admin controls (demo)</span>}
                    {activeTab === 'admin-chat' && <span className="ml-12">Chat with support team</span>}
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

            <div className="flex flex-1 min-h-0 overflow-hidden flex-col md:flex-row">
            {/* Left Panel */}
            <div className="w-full md:w-2/3 p-4 md:p-6 overflow-y-auto">
                {activeTab === 'orders' && (
                <div className="space-y-4">
                    {activeOrders.length === 0 ? (
                    <p className="text-gray-500">No pending orders.</p>
                    ) : (
                    activeOrders.map((order) => (
                        <OrderCard
                        key={order.id}
                        order={order}
                        selected={selectedOrder?.id === order.id}
                        onSelect={setSelectedOrder}
                        updateOrderStatus={updateOrderStatus}
                        onDeclineClick={() => {
                            setSelectedOrder(order);
                            setShowDeclineModal(true);
                        }}
                        getStatusColor={getStatusColor}
                        getNextStatus={getNextStatus}
                        getStatusText={getStatusText}
                        />
                    ))
                    )}
                </div>
                )}

                {activeTab === 'reviews' && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Customer Reviews</h3>
                    {mockReviews.map((rev, i) => (
                    <div key={i} className="bg-white p-3 md:p-4 rounded-lg shadow border">
                        <div className="flex items-center mb-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium text-sm">{rev.rating}.0</span>
                        <span className="text-gray-500 ml-2 text-xs">by {rev.customerName}</span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-700 mb-1">{rev.review}</p>
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
                        className="bg-white p-3 md:p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50"
                        onClick={() => {
                            setSelectedOrder(order);
                            setIsChatOpen(true);
                        }}
                        >
                        <div className="flex justify-between">
                            <h4 className="font-medium text-sm">{order.customerName}</h4>
                            <span className="text-xs text-gray-500">
                            {order.chat[order.chat.length - 1]?.timestamp}
                            </span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-600 truncate">
                            {order.chat[order.chat.length - 1]?.message}
                        </p>
                        </div>
                    ))}
                </div>
                )}

                {activeTab === 'admin' && (
                <div className="bg-red-50 p-4 md:p-6 rounded-lg border border-red-200">
                    <h3 className="text-lg font-semibold text-red-800 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Admin Panel (Demo)
                    </h3>
                    <p className="text-red-700 mt-2 text-sm">This is a demo admin section.</p>
                    <ul className="list-disc list-inside mt-2 text-xs md:text-sm text-red-600">
                    <li>View all orders</li>
                    <li>Manage riders</li>
                    <li>Customer support</li>
                    </ul>
                </div>
                )}

                {activeTab === 'admin-chat' && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Admin Support</h3>
                    <div className="bg-gray-100 p-3 rounded-lg text-xs md:text-sm text-gray-700">
                    <p>Need help with orders, payments, or issues? Message the admin here.</p>
                    </div>
                    <div
                    className="bg-white p-3 md:p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50 flex items-center"
                    onClick={() => setIsAdminChatOpen(true)}
                    >
                    <div className="h-10 w-10 bg-red-600 rounded-full flex items-center justify-center">
                        <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-3">
                        <h4 className="font-medium text-sm">Admin Support Team</h4>
                        <p className="text-xs text-gray-600 truncate">
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
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
                        <div className="h-20 w-20 bg-black rounded-full flex items-center justify-center">
                        <User className="h-10 w-10 text-white" />
                        </div>
                        <div className="text-center md:text-left">
                        <h3 className="text-xl font-semibold">Mike Johnson</h3>
                        <p className="text-gray-600">Rider ID: RID-001</p>
                        <div className="flex items-center justify-center md:justify-start mt-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium ml-1">4.8 Rating</span>
                            <span className="text-sm text-gray-500 ml-2">(127 reviews)</span>
                        </div>
                        </div>
                    </div>
                    <p className="text-gray-700 text-sm">Phone: +63 912 345 6789</p>
                    <p className="text-gray-700 mt-1 text-sm">Vehicle: Motorcycle (ABC-123)</p>
                    <p className="text-gray-700 mt-2 text-sm">Shift: 8:00 AM - 5:00 PM</p>
                    </div>
                </div>
                )}
            </div>

            {/* Right Panel */}
            <div className="w-full md:w-1/3 bg-white border-l p-4 md:p-6 overflow-y-auto">
                {activeTab === 'orders' && selectedOrder && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">Order Details</h3>
                    <div className="mb-6">
                    <h4 className="font-medium mb-2 text-sm">Customer</h4>
                    <p className="text-sm">{selectedOrder.customerName}</p>
                    <p className="text-xs text-gray-600">{selectedOrder.customerPhone}</p>
                    </div>

                    <div className="mb-6">
                    <h4 className="font-medium mb-2 text-sm">Address</h4>
                    <p className="text-sm">{selectedOrder.address}</p>
                    </div>

                    <div className="mb-6">
                    <h4 className="font-medium mb-3 text-sm">Items</h4>
                    {selectedOrder.items.map((item, i) => (
                        <p key={i} className="text-sm">
                        {item.quantity}x {item.name} - ₱{item.price * item.quantity}
                        </p>
                    ))}
                    <p className="font-bold mt-2 text-sm">Total: ₱{selectedOrder.totalAmount}</p>
                    </div>

                    {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'declined' && (
                    <div className="space-y-2">
                        <button
                        onClick={() =>
                            updateOrderStatus(selectedOrder.id, getNextStatus(selectedOrder.status))
                        }
                        className="w-full py-2 text-sm bg-black text-white rounded hover:bg-gray-800"
                        >
                        {getStatusText(selectedOrder.status)}
                        </button>
                        <button
                        onClick={() => setShowDeclineModal(true)}
                        className="w-full py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                        >
                        Decline Order
                        </button>
                    </div>
                    )}
                </div>
                )}

                {isChatOpen && selectedOrder && activeTab === 'chat' && (
                <ChatWindow
                    customerName={selectedOrder.customerName}
                    chat={selectedOrder.chat}
                    chatMessage={chatMessage}
                    setChatMessage={setChatMessage}
                    sendMessage={sendMessage}
                    onClose={() => setIsChatOpen(false)}
                />
                )}

                {isAdminChatOpen && activeTab === 'admin-chat' && (
                <AdminChatWindow
                    adminChat={adminChat}
                    chatMessage={chatMessage}
                    setChatMessage={setChatMessage}
                    setAdminChat={setAdminChat}
                    onClose={() => setIsAdminChatOpen(false)}
                />
                )}
            </div>
            </div>

            {/* Modals */}
            <SignOutModal
            show={showSignOutModal}
            loading={loading}
            onConfirm={handleSignOut}
            onCancel={() => setShowSignOutModal(false)}
            />

            <DeclineModal
            show={showDeclineModal}
            reason={declineReason}
            setReason={setDeclineReason}
            onConfirm={declineOrder}
            onCancel={() => setShowDeclineModal(false)}
            />
        </div>
        </div>
    );
    };

    export default RiderDashboard;