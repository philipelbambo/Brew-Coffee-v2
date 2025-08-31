    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Package, MapPin, Clock, CheckCircle, User, Coffee, Phone, Star, LogOut, Loader } from 'lucide-react';

    interface Order {
    id: string;
    customerName: string;
    customerPhone: string;
    address: string;
    items: OrderItem[];
    status: 'pending' | 'picked_up' | 'delivering' | 'delivered';
    orderTime: string;
    totalAmount: number;
    estimatedDelivery: string;
    customerRating?: number;
    }

    interface OrderItem {
    name: string;
    quantity: number;
    price: number;
    notes?: string;
    }

    const RiderDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([
        {
        id: 'ORD-001',
        customerName: 'Maria Santos',
        customerPhone: '+63 912 345 6789',
        address: '123 Corrales Ave, Cagayan de Oro City',
        items: [
            { name: 'Americano', quantity: 2, price: 120 },
            { name: 'Cappuccino', quantity: 1, price: 150 },
            { name: 'Blueberry Muffin', quantity: 2, price: 80 }
        ],
        status: 'pending',
        orderTime: '10:30 AM',
        totalAmount: 550,
        estimatedDelivery: '11:15 AM'
        },
        {
        id: 'ORD-002',
        customerName: 'Juan Dela Cruz',
        customerPhone: '+63 917 234 5678',
        address: '456 J.R. Borja St, Cagayan de Oro City',
        items: [
            { name: 'Iced Coffee', quantity: 1, price: 100 },
            { name: 'Croissant', quantity: 1, price: 95 }
        ],
        status: 'picked_up',
        orderTime: '10:45 AM',
        totalAmount: 195,
        estimatedDelivery: '11:30 AM'
        },
        {
        id: 'ORD-003',
        customerName: 'Anna Rodriguez',
        customerPhone: '+63 905 876 5432',
        address: '789 Velez St, Cagayan de Oro City',
        items: [
            { name: 'Latte', quantity: 3, price: 140 },
            { name: 'Chocolate Cake', quantity: 1, price: 180 }
        ],
        status: 'delivering',
        orderTime: '9:15 AM',
        totalAmount: 600,
        estimatedDelivery: '10:45 AM'
        },
        {
        id: 'ORD-004',
        customerName: 'Carlos Mendoza',
        customerPhone: '+63 920 111 2233',
        address: '321 Masterson Ave, Cagayan de Oro City',
        items: [
            { name: 'Espresso', quantity: 2, price: 90 }
        ],
        status: 'pending',
        orderTime: '11:00 AM',
        totalAmount: 180,
        estimatedDelivery: '11:45 AM'
        },
        {
        id: 'ORD-005',
        customerName: 'Sofia Reyes',
        customerPhone: '+63 918 444 5566',
        address: '654 Tiano Bros St, Cagayan de Oro City',
        items: [
            { name: 'Chocolate Croissant', quantity: 3, price: 120 },
            { name: 'Red Velvet Cake', quantity: 1, price: 200 }
        ],
        status: 'pending',
        orderTime: '11:10 AM',
        totalAmount: 560,
        estimatedDelivery: '12:00 PM'
        },
        {
        id: 'ORD-006',
        customerName: 'Miguel Torres',
        customerPhone: '+63 915 777 8899',
        address: '987 Capistrano St, Cagayan de Oro City',
        items: [
            { name: 'Cold Brew', quantity: 1, price: 130 },
            { name: 'Frappuccino', quantity: 2, price: 160 },
            { name: 'Cheesecake', quantity: 1, price: 180 },
            { name: 'Tiramisu', quantity: 1, price: 200 }
        ],
        status: 'pending',
        orderTime: '11:15 AM',
        totalAmount: 830,
        estimatedDelivery: '12:15 PM'
        }
    ]);

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0]);
    const [activeTab, setActiveTab] = useState<'orders' | 'completed' | 'profile'>('orders');
    const [showSignOutModal, setShowSignOutModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
        setOrders(prev => prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
        case 'pending': return 'bg-gray-100 text-black';
        case 'picked_up': return 'bg-gray-100 text-black';
        case 'delivering': return 'bg-gray-100 text-black';
        case 'delivered': return 'bg-gray-100 text-black';
        default: return 'bg-gray-100 text-black';
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
        default: return status;
        }
    };

    const activeOrders = orders.filter(order => order.status !== 'delivered');
    const completedOrders = orders.filter(order => order.status === 'delivered');

    const handleSignOut = async () => {
        setLoading(true);
        setTimeout(() => {
        navigate('/login');
        }, 1500);
    };

    return (
        <div className="flex h-screen w-screen bg-white overflow-hidden text-black">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg border-r border-gray-200">
            <div className="p-6">
            <div className="flex items-center space-x-3">
                <Coffee className="h-8 w-8 text-black" />
                <h1 className="text-xl font-bold">Brew Coffee</h1>
            </div>
            <p className="text-sm text-gray-600 mt-1">Rider Dashboard</p>
            </div>

            <nav className="mt-6">
            <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 ${
                activeTab === 'orders' ? 'bg-gray-100 border-r-4 border-black text-black' : 'text-black'
                }`}
            >
                <Package className="h-5 w-5 mr-3" />
                Active Orders ({activeOrders.length})
            </button>

            <button
                onClick={() => setActiveTab('completed')}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 ${
                activeTab === 'completed' ? 'bg-gray-100 border-r-4 border-black text-black' : 'text-black'
                }`}
            >
                <CheckCircle className="h-5 w-5 mr-3" />
                Completed ({completedOrders.length})
            </button>

            <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 ${
                activeTab === 'profile' ? 'bg-gray-100 border-r-4 border-black text-black' : 'text-black'
                }`}
            >
                <User className="h-5 w-5 mr-3" />
                Profile
            </button>

            <button
                onClick={() => setShowSignOutModal(true)}
                className="w-full flex items-center px-6 py-3 text-left text-black hover:bg-red-50 mt-8"
            >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
            </button>
            </nav>

            <div className="p-6 mt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold mb-3">Today's Stats</h3>
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                <span className="text-gray-600">Deliveries</span>
                <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between text-sm">
                <span className="text-gray-600">Earnings</span>
                <span className="font-semibold">₱480</span>
                </div>
                <div className="flex justify-between text-sm">
                <span className="text-gray-600">Rating</span>
                <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-semibold ml-1">4.8</span>
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <header className="bg-white shadow-sm border-b px-6 py-4">
            <div className="flex items-center justify-between">
                <div>
                <h2 className="text-2xl font-bold">
                    {activeTab === 'orders' && 'Active Orders'}
                    {activeTab === 'completed' && 'Completed Orders'}
                    {activeTab === 'profile' && 'Rider Profile'}
                </h2>
                <p className="text-gray-600">
                    {activeTab === 'orders' && 'Manage your delivery orders'}
                    {activeTab === 'completed' && 'View your completed deliveries'}
                    {activeTab === 'profile' && 'Manage your profile settings'}
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
            {(activeTab === 'orders' || activeTab === 'completed') && (
                <div className="w-2/3 p-6 overflow-y-auto">
                <div className="space-y-4">
                    {(activeTab === 'orders' ? activeOrders : completedOrders).map((order) => (
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
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
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
                        <div>
                            <p className="text-sm text-gray-600">
                            {order.items.length} item(s) • ₱{order.totalAmount}
                            </p>
                        </div>
                        {order.status !== 'delivered' && (
                            <button
                            onClick={(e) => {
                                e.stopPropagation();
                                updateOrderStatus(order.id, getNextStatus(order.status));
                            }}
                            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
                            >
                            {getStatusText(order.status)}
                            </button>
                        )}
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            )}

            {(activeTab === 'orders' || activeTab === 'completed') && (
                <div className="w-1/3 bg-white border-l p-6 overflow-y-auto">
                {selectedOrder ? (
                    <div>
                    <h3 className="text-lg font-semibold mb-4">Order Details</h3>

                    <div className="mb-6">
                        <h4 className="font-medium mb-2">Customer Information</h4>
                        <div className="space-y-2">
                        <div className="flex items-center text-sm">
                            <User className="h-4 w-4 text-gray-400 mr-2" />
                            {selectedOrder.customerName}
                        </div>
                        <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                            {selectedOrder.customerPhone}
                        </div>
                        <div className="flex items-start text-sm">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                            <span>{selectedOrder.address}</span>
                        </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h4 className="font-medium mb-3">Order Items</h4>
                        <div className="space-y-3">
                        {selectedOrder.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                {item.notes && (
                                <p className="text-xs text-gray-500 mt-1">Note: {item.notes}</p>
                                )}
                            </div>
                            <p className="font-semibold">₱{item.price * item.quantity}</p>
                            </div>
                        ))}
                        </div>
                        <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Total Amount</span>
                            <span className="font-bold text-lg text-black">₱{selectedOrder.totalAmount}</span>
                        </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h4 className="font-medium mb-3">Order Timeline</h4>
                        <div className="space-y-2">
                        <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 text-gray-400 mr-2" />
                            Ordered at {selectedOrder.orderTime}
                        </div>
                        <div className="flex items-center text-sm">
                            <Package className="h-4 w-4 text-gray-400 mr-2" />
                            Expected delivery: {selectedOrder.estimatedDelivery}
                        </div>
                        </div>
                    </div>

                    {selectedOrder.status !== 'delivered' && (
                        <div className="space-y-3">
                        <button
                            onClick={() => updateOrderStatus(selectedOrder.id, getNextStatus(selectedOrder.status))}
                            className="w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                        >
                            {getStatusText(selectedOrder.status)}
                        </button>
                        <button className="w-full px-4 py-3 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors font-medium">
                            Call Customer
                        </button>
                        <button className="w-full px-4 py-3 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors font-medium">
                            Open Maps
                        </button>
                        </div>
                    )}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                        <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Select an order to view details</p>
                    </div>
                    </div>
                )}
                </div>
            )}

            {activeTab === 'profile' && (
                <div className="flex-1 p-6 overflow-y-auto">
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

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                        <h4 className="font-medium mb-3">Contact Information</h4>
                        <div className="space-y-2 text-sm">
                            <p><span className="text-gray-600">Phone:</span> +63 912 345 6789</p>
                            <p><span className="text-gray-600">Email:</span> mike.rider@brewcoffee.com</p>
                            <p><span className="text-gray-600">Vehicle:</span> Motorcycle - ABC-1234</p>
                        </div>
                        </div>
                        <div>
                        <h4 className="font-medium mb-3">Performance Stats</h4>
                        <div className="space-y-2 text-sm">
                            <p><span className="text-gray-600">Total Deliveries:</span> 1,247</p>
                            <p><span className="text-gray-600">This Month:</span> 89</p>
                            <p><span className="text-gray-600">On-Time Rate:</span> 96%</p>
                        </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t">
                        <h4 className="font-medium mb-4">Recent Activity</h4>
                        <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                            <span className="text-sm">Delivered order to Anna Rodriguez</span>
                            </div>
                            <span className="text-xs text-gray-500">2 hours ago</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center">
                            <Package className="h-5 w-5 text-blue-600 mr-3" />
                            <span className="text-sm">Picked up order from cafe</span>
                            </div>
                            <span className="text-xs text-gray-500">3 hours ago</span>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            )}
            </div>
        </div>

        {/* Sign Out Modal */}
        {showSignOutModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-lg font-semibold mb-4">Are you sure you want to sign out?</h3>
                <div className="flex justify-end space-x-4">
                <button
                    onClick={() => setShowSignOutModal(false)}
                    disabled={loading}
                    className="px-4 py-2 border border-gray-300 rounded-md text-black hover:bg-gray-100 disabled:opacity-50"
                >
                    No
                </button>
                <button
                    onClick={handleSignOut}
                    disabled={loading}
                    className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-500 flex items-center"
                >
                    {loading ? (
                    <>
                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                        Signing out...
                    </>
                    ) : (
                    'Yes'
                    )}
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
    };

    export default RiderDashboard;