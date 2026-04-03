import { IProduct } from "./product.types";
import { UserInfo } from "./user.types";

export enum OrderStatus {
  PENDING = "Pending",
  CONFIRMED = "Confirmed",
  SHIPPED = "Shipped",
  DELIVERED = "Delivered",
  CANCELLED = "Cancelled",
}

export interface IOrderItem {
  product: IProduct;
  quantity: number;
}

export interface IOrderHistory {
  status: OrderStatus;
  changedAt: Date;
  changedBy?: UserInfo;
  note?: string;
}

export interface IOrder {
  _id: string;
  orderId: string;
  customerName: string;
  items: IOrderItem[];
  totalPrice: number;
  status: OrderStatus;
  isDeleted: boolean;
  orderHistory: IOrderHistory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderFillter {
  status?: OrderStatus;
  createdAt?: Date | { $gte: Date; $lte: Date };
}



export interface IOrderCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}


export interface IOrderItem {
  product: IProduct;
  quantity: number;
}


export interface IOrderCreatePayload {
  customerName: string;
  items: {
    product: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
}