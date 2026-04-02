"use client";

import RefreshButton from "@/components/shared/Dashboard/RefreshButton";
import SearchFilter from "@/components/shared/Dashboard/SearchFilter";
import SelectFilter from "@/components/shared/Dashboard/SelectFilter";
import { ProductStatus } from "@/types/product.types";

const ProductsFilter = () => {
  return (
    <div className="space-y-3">
      {/* Row 1: Refresh */}
      <div className="flex items-center gap-3">
        <RefreshButton />
      </div>

      {/* Row 2: Filter Controls */}
      <div className="flex items-center gap-3">
        {/* Status Filter */}
        <SelectFilter
          paramName="status"
          placeholder="Product Status"
          defaultValue="All Statuses"
          options={[
            { label: "Active", value: ProductStatus.ACTIVE },
            { label: "Out of Stock", value: ProductStatus.OUT_OF_STOCK },
          ]}
        />

        {/* Category Filter (Optional but recommended based on your interface) */}
        <SearchFilter paramName="category" placeholder="Category" />

        {/* Name Search - Only searching by product name as requested */}
        <SearchFilter paramName="searchTerm" placeholder="Search by name..." />
      </div>
    </div>
  );
};

export default ProductsFilter;
