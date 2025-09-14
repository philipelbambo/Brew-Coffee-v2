    // src/CustomOrder/types.ts
    export interface OrderItem {
    id: string;
    type: 'coffee' | 'dessert';
    name: string;
    price: number;
    quantity: number;
    customizations?: string[];
    }

    export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    }

    export interface Order {
    id: string;
    customer: Customer;
    items: OrderItem[];
    status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
    orderDate: Date;
    totalAmount: number;
    notes?: string;
    }