"use client";

import { useState } from "react";
import ManagementTable from "@/components/shared/Dashboard/ManagementTable";
import { IRestockQueue } from "@/types/restock.types";
import { restockColumns } from "./RestockColumns";
import RestockActionModal from "./RestockActionModal";

const RestockTable = ({ data }: { data: IRestockQueue[] }) => {
  const [activeItem, setActiveItem] = useState<IRestockQueue | null>(null);

  return (
    <>
      <ManagementTable
        data={data}
        columns={restockColumns}
        onEdit={(item) => setActiveItem(item)}
        getRowKey={(item) => item._id}
        emptyMessage="No pending restock items"
      />

      {activeItem && (
        <RestockActionModal 
          item={activeItem} 
          onClose={() => setActiveItem(null)} 
        />
      )}
    </>
  );
};

export default RestockTable;