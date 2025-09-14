    // src/CustomOrder/BrewCoffeeOrderManagement.tsx
    import React, { useState } from 'react';
    import OrderStatsCard from './OrderStatsCard';
    import OrderFilters from './OrderFilters';
    import OrderTable from './OrderTable';
    import OrderDetailsModal from './OrderDetailsModal';
    import { Order } from './types';

    // ✅ FIXED: Import icons used directly in this file
    import { Eye, Clock, Coffee, CheckCircle } from 'lucide-react';

    // Sample Data — Embedded for simplicity (you can move to API later)
    const sampleOrders: Order[] = [
    {
        id: 'ORD-001',
        customer: {
        id: 'CUST-001',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1-555-0123'
        },
        items: [
        {
            id: 'ITEM-001',
            type: 'coffee',
            name: 'Cappuccino',
            price: 4.50,
            quantity: 2,
            customizations: ['Extra Shot', 'Oat Milk']
        },
        {
            id: 'ITEM-002',
            type: 'dessert',
            name: 'Chocolate Croissant',
            price: 3.25,
            quantity: 1
        }
        ],
        status: 'preparing',
        orderDate: new Date('2024-03-15T10:30:00'),
        totalAmount: 12.25,
        notes: 'Please make it extra hot'
    },
    {
        id: 'ORD-002',
        customer: {
        id: 'CUST-002',
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        phone: '+1-555-0456'
        },
        items: [
        {
            id: 'ITEM-003',
            type: 'coffee',
            name: 'Americano',
            price: 3.75,
            quantity: 1
        }
        ],
        status: 'ready',
        orderDate: new Date('2024-03-15T11:15:00'),
        totalAmount: 3.75
    },
    {
        id: 'ORD-003',
        customer: {
        id: 'CUST-003',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        phone: '+1-555-0789'
        },
        items: [
        {
            id: 'ITEM-004',
            type: 'dessert',
            name: 'Blueberry Muffin',
            price: 2.95,
            quantity: 2
        },
        {
            id: 'ITEM-005',
            type: 'dessert',
            name: 'Cheesecake Slice',
            price: 4.50,
            quantity: 1
        }
        ],
        status: 'completed',
        orderDate: new Date('2024-03-15T09:45:00'),
        totalAmount: 10.40
    },
    {
        id: 'ORD-004',
        customer: {
        id: 'CUST-004',
        name: 'Emily Davis',
        email: 'emily@example.com',
        phone: '+1-555-0321'
        },
        items: [
        {
            id: 'ITEM-006',
            type: 'coffee',
            name: 'Latte',
            price: 4.25,
            quantity: 1,
            customizations: ['Vanilla Syrup', 'Extra Foam']
        },
        {
            id: 'ITEM-007',
            type: 'coffee',
            name: 'Espresso',
            price: 2.50,
            quantity: 1
        },
        {
            id: 'ITEM-008',
            type: 'dessert',
            name: 'Cinnamon Roll',
            price: 3.75,
            quantity: 1
        }
        ],
        status: 'pending',
        orderDate: new Date('2024-03-15T12:00:00'),
        totalAmount: 10.50,
        notes: 'Pickup at 1:00 PM'
    }
    ];

    const BrewCoffeeOrderManagement: React.FC = () => {
    const [orders] = useState<Order[]>(sampleOrders);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('date');

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <OrderStatsCard
                label="Total Orders"
                value={orders.length}
                icon={<Eye className="w-6 h-6 text-blue-600" />} // ✅ Now recognized!
                colorClass="bg-blue-100"
            />
            <OrderStatsCard
                label="Pending"
                value={orders.filter(o => o.status === 'pending').length}
                icon={<Clock className="w-6 h-6 text-yellow-600" />} // ✅ Fixed
                colorClass="bg-yellow-100"
            />
            <OrderStatsCard
                label="Preparing"
                value={orders.filter(o => o.status === 'preparing').length}
                icon={<Coffee className="w-6 h-6 text-blue-600" />} // ✅ Fixed
                colorClass="bg-blue-100"
            />
            <OrderStatsCard
                label="Completed"
                value={orders.filter(o => o.status === 'completed').length}
                icon={<CheckCircle className="w-6 h-6 text-green-600" />} // ✅ Fixed
                colorClass="bg-green-100"
            />
            </div>

            {/* Filters and Search */}
            <OrderFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            />

            {/* Orders Table */}
            <OrderTable
            orders={orders}
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            sortBy={sortBy}
            setSelectedOrder={setSelectedOrder}
            />
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
            <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            />
        )}
        </div>
    );
    };

    export default BrewCoffeeOrderManagement;