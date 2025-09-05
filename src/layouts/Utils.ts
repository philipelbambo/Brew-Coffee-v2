    // utils.ts - Utility functions for the dessert ordering system
    import { CartItem, Order, CustomerDetails } from './Types';

    export const calculateTotalPrice = (cart: CartItem[]): string => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    export const calculateTotalItems = (cart: CartItem[]): number => {
    return cart.reduce((total, item) => total + item.quantity, 0);
    };

    export const generateOrderId = (): string => {
    return Math.random().toString(36).substr(2, 9);
    };

    export const createOrder = (
    cart: CartItem[], 
    customerDetails: CustomerDetails, 
    paymentScreenshot: string | null
    ): Order => {
    return {
        id: generateOrderId(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        items: cart,
        total: calculateTotalPrice(cart),
        customer: customerDetails,
        paymentScreenshot
    };
    };

    export const validateCustomerDetails = (customerDetails: CustomerDetails): boolean => {
    return !!(
        customerDetails.name &&
        customerDetails.email &&
        customerDetails.phone &&
        customerDetails.address &&
        customerDetails.city &&
        customerDetails.zipCode &&
        customerDetails.paymentMethod
    );
    };

    export const getDefaultCustomerDetails = (): CustomerDetails => ({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: '',
    gcashNumber: '09123456789'
    });

    export const printReceipt = (): void => {
    window.print();
    };