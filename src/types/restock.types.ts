import { IProduct } from "./product.types";
import { UserInfo } from "./user.types";


export enum ERestockPriority {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}

export interface IRestockQueue {
  _id: string;
  product: IProduct;
  currentStock: number;
  threshold: number;
  priority: ERestockPriority;
  isResolved: boolean;
  resolvedBy?: UserInfo;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}