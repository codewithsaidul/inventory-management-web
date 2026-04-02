
import ProductsFilter from "@/components/modules/products/ProductsFilter";
import ProductsTable from "@/components/modules/products/ProductTable";
import ManagementPageHeader from "@/components/shared/Dashboard/PageHeader";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/Dashboard/TableSkeleton";
import { queryStringFormatter } from "@/utils/formatter";
import { getProducts } from "@/services/product/productManagement";
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
      <ManagementPageHeader
        title="Products Management"
        description="Monitor inventory levels, pricing, and product status"
      />

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