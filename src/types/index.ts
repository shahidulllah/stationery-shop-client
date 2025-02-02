/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CartItem {
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
