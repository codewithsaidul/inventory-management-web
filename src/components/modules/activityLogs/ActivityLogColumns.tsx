"use client";

import { Column } from "@/components/shared/Dashboard/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { ActionCategory, IActivitiLog } from "@/types/activityLogs.types";
import { format } from "date-fns";

export const activityLogColumns: Column<IActivitiLog>[] = [
  {
    header: "Timestamp",
    accessor: (log) => (
      <div className="text-sm">
        <div className="font-medium">{format(new Date(log.timestamp), "MMM dd, yyyy")}</div>
        <div className="text-xs text-muted-foreground">{format(new Date(log.timestamp), "hh:mm a")}</div>
      </div>
    ),
  },
  {
    header: "Category",
    accessor: (log) => {
      const colors: Record<ActionCategory, string> = {
        [ActionCategory.ORDER]: "bg-blue-100 text-blue-700",
        [ActionCategory.PRODUCT]: "bg-purple-100 text-purple-700",
        [ActionCategory.CATEGORY]: "bg-orange-100 text-orange-700",
        [ActionCategory.STOCK]: "bg-emerald-100 text-emerald-700",
        [ActionCategory.SYSTEM]: "bg-slate-100 text-slate-700",
      };
      return (
        <Badge className={`${colors[log.category]} border-none hover:${colors[log.category]}`}>
          {log.category}
        </Badge>
      );
    },
  },
  {
    header: "Message",
    accessor: (log) => (
      <span className="font-medium text-sm line-clamp-1">{log.message}</span>
    ),
  },
  {
    header: "Performed By",
    accessor: (log) => (
      <span className="text-sm font-medium">{log.performedBy}</span>
    ),
  },
];