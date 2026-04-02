"use client";

import RefreshButton from "@/components/shared/Dashboard/RefreshButton";
import SearchFilter from "@/components/shared/Dashboard/SearchFilter";
import SelectFilter from "@/components/shared/Dashboard/SelectFilter";

const CategoryFilter = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <RefreshButton />
      </div>

      <div className="flex items-center gap-3">
        {/* Status Filter */}
        <SelectFilter
          paramName="isActive"
          placeholder="Status"
          defaultValue="All Status"
          options={[
            { label: "Active", value: "true" },
            { label: "Inactive", value: "false" },
          ]}
        />

        {/* Search by Name or Slug */}
        <SearchFilter 
          paramName="searchTerm" 
          placeholder="Search by name..." 
        />
      </div>
    </div>
  );
};

export default CategoryFilter;