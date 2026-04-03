"use client";

import { Column } from "@/components/shared/Dashboard/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { IProduct, ProductStatus } from "@/types/product.types";

export const productsColumns: Column<IProduct>[] = [
  {
    header: "Name",
    accessor: (product) => (
      <div>
        <div className="font-medium capitalize">{product?.name || "N/A"}</div>
        <div className="text-xs text-muted-foreground">{product?.category?.name}</div>
      </div>
    ),
  },
  {
    header: "Price",
    accessor: (product) => {
      return (
        <span className="font-medium">
          $
          {product.price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </span>
      );
    },
  },
  {
    header: "Stock",
    accessor: (product) => {
      const isLowStock = product.stock <= product.minThreshold;
      return (
        <div className="flex flex-col">
          <span className={isLowStock ? "text-destructive font-bold" : ""}>
            {product.stock} units
          </span>
          {isLowStock && product.stock > 0 && (
            <span className="text-[10px] uppercase text-destructive">
              Low Stock
            </span>
          )}
        </div>
      );
    },
  },
  {
    header: "Status",
    accessor: (product) => {
      if (product.status === ProductStatus.ACTIVE) {
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-200">
            Active
          </Badge>
        );
      }
      return <Badge variant="destructive">Out of Stock</Badge>;
    },
  },
  {
    header: "Created At",
    accessor: (product) => {
      const date = new Date(product.createdAt);
      return (
        <span className="text-sm">
          {date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      );
    },
  },
];
