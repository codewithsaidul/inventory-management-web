"use client";

import { Column } from "@/components/shared/Dashboard/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { ERestockPriority, IRestockQueue } from "@/types/restock.types";

export const restockColumns: Column<IRestockQueue>[] = [
  {
    header: "Product Name",
    accessor: (item) => (
      <div className="font-medium capitalize">{item.product?.name || "N/A"}</div>
    ),
  },
  {
    header: "Inventory Status",
    accessor: (item) => (
      <div className="text-sm">
        <div className="text-destructive font-bold">{item.currentStock} in stock</div>
        <div className="text-xs text-muted-foreground">Threshold: {item.threshold}</div>
      </div>
    ),
  },
  {
    header: "Priority",
    accessor: (item) => {
      const colors = {
        [ERestockPriority.HIGH]: "bg-red-100 text-red-700",
        [ERestockPriority.MEDIUM]: "bg-amber-100 text-amber-700",
        [ERestockPriority.LOW]: "bg-blue-100 text-blue-700",
      };
      return (
        <Badge className={`${colors[item.priority]} border-none capitalize`}>
          {item.priority}
        </Badge>
      );
    },
  },
  {
    header: "Requested At",
    accessor: (item) => (
      <span className="text-xs text-muted-foreground">
        {new Date(item.createdAt).toLocaleDateString()}
      </span>
    ),
  },
];