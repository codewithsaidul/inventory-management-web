import { ICategory } from "./category.types";
import { IOrder } from "./order.types";
import { IProduct } from "./product.types";

export enum ActionCategory {
  ORDER = "ORDER",
  STOCK = "STOCK",
  PRODUCT = "PRODUCT",
  CATEGORY = "CATEGORY",
  SYSTEM = "SYSTEM",
}

export interface IActivitiMetaData {
  order?: IOrder;
  product?: IProduct;
  category?: ICategory;
  previousValue?: string;
  newValue?: string;
}

export interface IActivitiLog {
  _id: string;
  timestamp: Date;
  category: ActionCategory;
  message: string;
  performedBy: string;
  metadata?: IActivitiMetaData;
}
