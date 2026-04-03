"use client";

import { Column } from "@/components/shared/Dashboard/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { OrderStatus, IOrder } from "@/types/order.types";

export const orderColumns: Column<IOrder>[] = [
  {
    header: "Order ID",
    accessor: (order) => (
      <span className="font-mono text-xs font-bold uppercase">{order.orderId}</span>
    ),
  },
  {
    header: "Customer",
    accessor: (order) => (
      <div className="font-medium capitalize">{order.customerName}</div>
    ),
  },
  {
    header: "Items",
    accessor: (order) => (
      <div className="text-sm">
        {order.items.length} {order.items.length === 1 ? "item" : "items"}
      </div>
    ),
  },
  {
    header: "Total Price",
    accessor: (order) => (
      <span className="font-semibold">${order.totalPrice.toFixed(2)}</span>
    ),
  },
  {
    header: "Status",
    accessor: (order) => {
      const variants: Record<OrderStatus, "default" | "secondary" | "destructive" | "outline"> = {
        [OrderStatus.PENDING]: "outline",
        [OrderStatus.CONFIRMED]: "secondary",
        [OrderStatus.SHIPPED]: "default",
        [OrderStatus.DELIVERED]: "default",
        [OrderStatus.CANCELLED]: "destructive",
      };

      return (
        <Badge variant={variants[order.status]}>
          {order.status}
        </Badge>
      );
    },
  },
  {
    header: "Date",
    accessor: (order) => (
      <span className="text-sm text-muted-foreground">
        {new Date(order.createdAt).toLocaleDateString()}
      </span>
    ),
  },
];