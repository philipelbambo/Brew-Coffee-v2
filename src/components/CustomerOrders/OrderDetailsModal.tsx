    // src/CustomOrder/OrderDetailsModal.tsx
    import React from 'react';
    import { Clock, Coffee, CheckCircle, XCircle, Calendar, User, DollarSign } from 'lucide-react';
    import { Order } from './types';

    interface OrderDetailsModalProps {
    order: Order;
    onClose: () => void;
    }

    const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
        case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'preparing': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'ready': return 'bg-green-100 text-green-800 border-green-200';
        case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
        case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
        case 'pending': return <Clock className="w-4 h-4" />;
        case 'preparing': return <Coffee className="w-4 h-4" />;
        case 'ready': return <CheckCircle className="w-4 h-4" />;
        case 'completed': return <CheckCircle className="w-4 h-4" />;
        case 'cancelled': return <XCircle className="w-4 h-4" />;
        default: return <Clock className="w-4 h-4" />;
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
                <div>
                <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                <p className="text-gray-600 mt-1">Order #{order.id}</p>
                </div>
                <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                <XCircle className="w-6 h-6" />
                </button>
            </div>
            </div>

            <div className="p-6 space-y-6">
            {/* Order Status and Date */}
            <div className="flex justify-between items-center">
                <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center gap-2 ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                {formatDate(order.orderDate)}
                </div>
            </div>

            {/* Customer Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <User className="w-5 h-5" />
                Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{order.customer.name}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{order.customer.email}</p>
                </div>
                <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{order.customer.phone}</p>
                </div>
                </div>
            </div>

            {/* Order Items */}
            <div>
                <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                <div className="space-y-3">
                {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${item.type === 'coffee' ? 'bg-orange-100' : 'bg-pink-100'}`}>
                        {item.type === 'coffee' ? (
                            <Coffee className="w-5 h-5 text-orange-600" />
                        ) : (
                            <Cookie className="w-5 h-5 text-pink-600" />
                        )}
                        </div>
                        <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        {item.customizations && item.customizations.length > 0 && (
                            <p className="text-sm text-gray-500 mt-1">
                            Customizations: {item.customizations.join(', ')}
                            </p>
                        )}
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>

            {/* Order Notes */}
            {order.notes && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">Order Notes</h3>
                <p className="text-gray-700">{order.notes}</p>
                </div>
            )}

            {/* Total Amount */}
            <div className="bg-gray-900 p-4 rounded-lg text-white">
                <div className="flex justify-between items-center">
                <span className="text-lg font-semibold flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Total Amount
                </span>
                <span className="text-2xl font-bold">${order.totalAmount.toFixed(2)}</span>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default OrderDetailsModal;