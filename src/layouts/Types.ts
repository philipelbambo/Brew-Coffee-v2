    // types.ts - Type definitions for the dessert ordering system

    export interface NutritionalInfo {
    calories: string;
    fat: string;
    carbs: string;
    protein: string;
    sugar: string;
    }

    export interface Dessert {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    ingredients: string[];
    nutritionalInfo: NutritionalInfo;
    allergens: string[];
    servingSize: string;
    preparationTime: string;
    difficulty: string;
    }

    export interface CartItem extends Dessert {
    quantity: number;
    }

    export interface CustomerDetails {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
    paymentMethod: 'gcash' | 'cod' | '';
    gcashNumber: string;
    }

    export interface Order {
    id: string;
    date: string;
    time: string;
    items: CartItem[];
    total: string;
    customer: CustomerDetails;
    paymentScreenshot: string | null;
    }