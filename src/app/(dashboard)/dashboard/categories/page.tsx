import CategoryFilter from "@/components/modules/category/CategoryFilter";
import CategoryPageHeader from "@/components/modules/category/CategoryPageHeader";
import CategoriesTable from "@/components/modules/category/CategoryTable";
import { TableSkeleton } from "@/components/shared/Dashboard/TableSkeleton";
import TablePagination from "@/components/shared/TablePagination";
import { getCategories } from "@/services/category/categoryManagement";
import { queryStringFormatter } from "@/utils/formatter";
import { Suspense } from "react";

const CategoriesManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const response = await getCategories(queryString);

  return (
    <div className="space-y-6">
      <CategoryPageHeader />

      <CategoryFilter />

      <Suspense fallback={<TableSkeleton columns={5} />}>
        <CategoriesTable categories={response?.data || []} />
      </Suspense>

      <TablePagination
        currentPage={response?.meta?.page || 1}
        totalPages={response?.meta?.totalPages || 1}
      />
    </div>
  );
};

export default CategoriesManagementPage;
