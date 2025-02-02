/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: any[];
  totalAmount: number;
  status: string;
}
