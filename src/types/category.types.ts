
export interface ICategory {
  _id: string
  name: string;
  slug: string;
  availableProducts: number;
  description?: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export interface ICreateCategory {
  name: string;
  description?: string;
  isActive?: boolean;
}