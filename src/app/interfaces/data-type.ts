export interface signUp {
  name: string;
  email: string;
  password: string;
}

export interface login {
  email: string;
  password: string;
}

export interface product {
  name: string;
  price: number;
  category: string;
  color: string;
  image: string;
  description: string;
  id: number;
  quantity?: number;
  productId?: number;
}

export interface cart {
  name: string;
  price: number;
  category: string;
  color: string;
  image: string;
  description: string;
  id?: number;
  quantity?: number;
  productId: number;
  userId: number;
}

export interface priceSummary {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}

export interface order {
  id: number;
  userId: number;
  totalPrice: number;
  status: string;
  orderDate: Date;
  email: string;
  address: string;
  contact: string;
  paymentMethod: string;
}
