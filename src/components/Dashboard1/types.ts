    // types.ts
    export interface Order {
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

    export interface OrderItem {
    name: string;
    quantity: number;
    price: number;
    notes?: string;
    }

    export interface ChatMessage {
    sender: 'rider' | 'customer';
    message: string;
    timestamp: string;
    }

    export interface CustomerReview {
    orderId: string;
    customerName: string;
    rating: number;
    review: string;
    date: string;
    }

    export interface AdminMessage {
    sender: 'rider' | 'admin';
    message: string;
    timestamp: string;
    }