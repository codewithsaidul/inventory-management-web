
import ProductsFilter from "@/components/modules/products/ProductsFilter";
import ProductsPageHeader from "@/components/modules/products/ProductsPageHeader";
import ProductsTable from "@/components/modules/products/ProductTable";
import { TableSkeleton } from "@/components/shared/Dashboard/TableSkeleton";
import TablePagination from "@/components/shared/TablePagination";
import { getProducts } from "@/services/product/productManagement";
import { queryStringFormatter } from "@/utils/formatter";
import { Suspense } from "react";

const ProductsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  

  const response = await getProducts(queryString);


  return (
    <div className="space-y-6">
      <ProductsPageHeader />

      <ProductsFilter />

      <Suspense fallback={<TableSkeleton columns={6} />}>
        <ProductsTable products={response?.data || []} />
      </Suspense>

      <TablePagination
        currentPage={response?.meta?.page || 1}
        totalPages={response?.meta?.totalPage || 1}
      />
    </div>
  );
};

export default ProductsManagementPage;