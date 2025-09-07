    // OrderCard.tsx
    import React from 'react';
    import { Package, Clock, MapPin, ThumbsDown } from 'lucide-react';
    import { Order } from './types';

    interface OrderCardProps {
    order: Order;
    selected: boolean;
    onSelect: (order: Order) => void;
    updateOrderStatus: (id: string, status: Order['status']) => void;
    onDeclineClick: (order: Order) => void;
    getStatusColor: (status: Order['status']) => string;
    getNextStatus: (status: Order['status']) => Order['status'];
    getStatusText: (status: Order['status']) => string;
    }

    const OrderCard: React.FC<OrderCardProps> = ({
    order,
    selected,
    onSelect,
    updateOrderStatus,
    onDeclineClick,
    getStatusColor,
    getNextStatus,
    getStatusText,
    }) => {
    return (
        <div
        className={`bg-white rounded-lg shadow-md p-4 md:p-6 cursor-pointer transition-all hover:shadow-lg ${
            selected ? 'ring-2 ring-black' : ''
        }`}
        onClick={() => onSelect(order)}
        >
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-black" />
            </div>
            <div>
                <h3 className="font-semibold text-sm md:text-base">{order.customerName}</h3>
                <p className="text-xs md:text-sm text-gray-600">Order #{order.id}</p>
            </div>
            </div>
            <span
            className={`px-2 py-1 text-xs md:px-3 md:py-1 md:text-xs font-medium rounded-full ${getStatusColor(
                order.status
            )}`}
            >
            {order.status.replace('_', ' ').toUpperCase()}
            </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-xs md:text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            {order.orderTime} → {order.estimatedDelivery}
            </div>
            <div className="flex items-center text-xs md:text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {order.address.split(',')[0]}...
            </div>
        </div>

        <div className="flex items-center justify-between">
            <p className="text-xs md:text-sm text-gray-600">
            {order.items.length} item(s) • ₱{order.totalAmount}
            </p>
            {order.status !== 'delivered' && (
            <div className="flex space-x-2">
                <button
                onClick={(e) => {
                    e.stopPropagation();
                    updateOrderStatus(order.id, getNextStatus(order.status));
                }}
                className="px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm bg-black text-white rounded-md hover:bg-gray-800 font-medium"
                >
                {getStatusText(order.status)}
                </button>
                <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDeclineClick(order);
                }}
                className="px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                <ThumbsDown className="h-3 w-3 md:h-4 md:w-4" />
                </button>
            </div>
            )}
        </div>
        </div>
    );
    };

    export default OrderCard;