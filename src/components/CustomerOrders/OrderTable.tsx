    // src/CustomOrder/OrderTable.tsx
    import React from 'react';
import { Clock, Coffee, CheckCircle, XCircle, Calendar, Cookie, Eye } from 'lucide-react'; // 👈 Added Eye here!
import { Order } from './types';

    interface OrderTableProps {
    orders: Order[];
    searchTerm: string;
    statusFilter: string;
    sortBy: string;
    setSelectedOrder: (order: Order | null) => void;
    }

    const OrderTable: React.FC<OrderTableProps> = ({ orders, searchTerm, statusFilter, sortBy, setSelectedOrder }) => {
    const filteredOrders = React.useMemo(() => {
        let filtered = orders.filter(order => {
        const matchesSearch = order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        
        return matchesSearch && matchesStatus;
        });

        // Sort orders
        filtered.sort((a, b) => {
        switch (sortBy) {
            case 'date':
            return b.orderDate.getTime() - a.orderDate.getTime();
            case 'amount':
            return b.totalAmount - a.totalAmount;
            case 'status':
            return a.status.localeCompare(b.status);
            default:
            return 0;
        }
        });

        return filtered;
    }, [orders, searchTerm, statusFilter, sortBy]);

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

    if (filteredOrders.length === 0) {
        return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="text-center py-12">
            <div className="text-gray-500">
                <Coffee className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No orders found</p>
                <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
            </div>
        </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                        {order.notes && (
                        <div className="text-xs text-gray-500 mt-1">Has notes</div>
                        )}
                    </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                        <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                        <div className="text-sm text-gray-500">{order.customer.email}</div>
                    </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                        {order.items.some(item => item.type === 'coffee') && (
                        <div className="bg-orange-100 p-1 rounded">
                            <Coffee className="w-4 h-4 text-orange-600" />
                        </div>
                        )}
                        {order.items.some(item => item.type === 'dessert') && (
                        <div className="bg-pink-100 p-1 rounded">
                            <Cookie className="w-4 h-4 text-pink-600" />
                        </div>
                        )}
                        <span className="text-sm text-gray-600">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.orderDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-orange-600 hover:text-orange-900 transition-colors flex items-center gap-1"
                    >
                        <Eye className="w-4 h-4" />
                        View Details
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
    };

    export default OrderTable;