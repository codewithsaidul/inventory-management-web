import OrderFilter from "@/components/modules/orders/OrderFilter";
import OrderPageHeader from "@/components/modules/orders/OrderPageHeader";
import OrdersTable from "@/components/modules/orders/OrderTable";
import { TableSkeleton } from "@/components/shared/Dashboard/TableSkeleton";
import TablePagination from "@/components/shared/TablePagination";
import { getOrders } from "@/services/order/orderManagement";
import { queryStringFormatter } from "@/utils/formatter";
import { Suspense } from "react";

const OrdersManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  // Tumar server action theke data fetch
  const response = await getOrders(queryString);

  return (
    <div className="space-y-6">
      <OrderPageHeader />

      <OrderFilter />

      <Suspense fallback={<TableSkeleton columns={6} />}>
        <OrdersTable orders={response?.data || []} />
      </Suspense>

      <TablePagination
        currentPage={response?.meta?.page || 1}
        totalPages={response?.meta?.totalPages || 1}
      />
    </div>
  );
};

export default OrdersManagementPage;