"use client";

import { Column } from "@/components/shared/Dashboard/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { ICategory } from "@/types/category.types";

export const categoryColumns: Column<ICategory>[] = [
  {
    header: "Category Name",
    accessor: (category) => (
      <div>
        <div className="font-medium capitalize">{category.name}</div>
        <div className="text-xs text-muted-foreground italic">{category.slug}</div>
      </div>
    ),
  },
  {
    header: "Products",
    accessor: (category) => (
      <span className="font-medium">{category.availableProducts} items</span>
    ),
  },
  {
    header: "Status",
    accessor: (category) => (
      <Badge variant={category.isActive ? "default" : "secondary"}>
        {category.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    header: "Created At",
    accessor: (category) => {
      const date = new Date(category.createdAt);
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