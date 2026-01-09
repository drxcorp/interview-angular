export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: any[];
  createdAt: Date;
  updatedAt: Date;
  discount?: number;
  featured?: boolean;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  status: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  createdAt: Date;
}
