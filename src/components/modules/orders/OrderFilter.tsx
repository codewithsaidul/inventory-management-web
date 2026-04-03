"use client";

import DateFilter from "@/components/shared/Dashboard/DateFiltet";
import RefreshButton from "@/components/shared/Dashboard/RefreshButton";
import SearchFilter from "@/components/shared/Dashboard/SearchFilter";
import SelectFilter from "@/components/shared/Dashboard/SelectFilter";
import { OrderStatus } from "@/types/order.types";

const OrderFilter = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <RefreshButton />
      </div>

      <div className="flex items-center gap-3">
        {/* Order Status Select Filter */}
        <SelectFilter
          paramName="status"
          placeholder="Order Status"
          defaultValue="All Status"
          options={Object.values(OrderStatus).map((status) => ({
            label: status,
            value: status,
          }))}
        />


        <DateFilter paramName="date" />

        {/* Search by Customer Name or Order ID */}
        <SearchFilter 
          paramName="searchTerm" 
          placeholder="Search by Customer or ID..." 
        />

      </div>
    </div>
  );
};

export default OrderFilter;