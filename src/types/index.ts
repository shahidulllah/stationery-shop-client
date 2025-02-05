/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICartItemData {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  map(arg0: (item: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
  id: string;
  items: any[];
  totalAmount: number;
  status: string;
}

export interface IOrder {
  _id: string;
  email: string;
  product: string;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  status?: string; 
}

export interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

