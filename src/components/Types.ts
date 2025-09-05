// components/types.ts
import { JSX } from 'react';

export interface CoffeeProduct {
  id: string;
  name: string;
  price: number;
  fullDescription: string;
  image: string;
  category: string;
  ingredients: string[];
  caffeine: string;
  size: string;
}

export interface Dessert {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends CoffeeProduct {
  id: string; // unique per cart item
  quantity: number;
  desserts?: (Dessert & { quantity: number })[];
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  number?: string;
  accountName?: string;
}

export interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  shippingAddress: string;
  region: string;
  paymentMethod: string;
  paymentScreenshot: File | null;
}

export interface OrderData {
  customer: string;
  email: string;
  contact: string;
  address: string;
  region: string;
  paymentMethod: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    desserts: (Dessert & { quantity: number })[];
  }[];
  total: string;
  date: string;
}
