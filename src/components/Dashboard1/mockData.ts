    // mockData.ts
    import { Order, CustomerReview } from './types';

    export const initialOrders: Order[] = [
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

    export const mockReviews: CustomerReview[] = [
    { orderId: 'ORD-001', customerName: 'Maria Santos', rating: 5, review: 'Excellent service!', date: 'Today' },
    { orderId: 'ORD-002', customerName: 'Juan Dela Cruz', rating: 4, review: 'Good, but a bit delayed.', date: 'Yesterday' },
    { orderId: 'ORD-003', customerName: 'Anna Rodriguez', rating: 5, review: 'Perfect delivery!', date: '2 days ago' },
    ];