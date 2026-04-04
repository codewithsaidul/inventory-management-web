"use client";
import RefreshButton from "@/components/shared/Dashboard/RefreshButton";
import SelectFilter from "@/components/shared/Dashboard/SelectFilter";

export default function RestockFilter() {
  return (
    <div className="flex items-center gap-3">
      <RefreshButton />
      <SelectFilter
        paramName="priority"
        placeholder="Filter by Priority"
        options={[
          { label: "High", value: "high" },
          { label: "Medium", value: "medium" },
          { label: "Low", value: "low" },
        ]}
      />
    </div>
  );
}