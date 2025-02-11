export interface ICartItemData {
  product: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  _id: string;
  email: string;
  products: {
    product: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalPrice: number;
  paymentStatus: string;
  paymentIntentId: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Product {
  _id?: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface ProductCreate {
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  image?: string;
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
