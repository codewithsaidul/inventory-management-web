"use client";

import RefreshButton from "@/components/shared/Dashboard/RefreshButton";
import SearchFilter from "@/components/shared/Dashboard/SearchFilter";
import SelectFilter from "@/components/shared/Dashboard/SelectFilter";
import { ActionCategory } from "@/types/activityLogs.types";

const ActivityLogFilter = () => {
  const categoryOptions = Object.values(ActionCategory).map((cat) => ({
    label: cat.charAt(0) + cat.slice(1).toLowerCase(),
    value: cat,
  }));

  return (
    <div className="flex flex-wrap items-center gap-3">
      <RefreshButton />
      
      <SelectFilter
        paramName="category"
        placeholder="Filter by Category"
        options={categoryOptions}
      />

      <SearchFilter 
        paramName="searchTerm" 
        placeholder="Search logs..." 
      />
    </div>
  );
};

export default ActivityLogFilter;