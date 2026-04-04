import ManagementPageHeader from "@/components/shared/Dashboard/PageHeader";
import { TableSkeleton } from "@/components/shared/Dashboard/TableSkeleton";
import TablePagination from "@/components/shared/TablePagination";
import { getRestockQueues } from "@/services/restock-queues/restock.management";
import { queryStringFormatter } from "@/utils/formatter";
import { Suspense } from "react";
import RestockTable from "@/components/modules/restock-queues/RestockTable";
import RestockFilter from "@/components/modules/restock-queues/RestockFilter";

export default async function RestockQueuePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const queryString = queryStringFormatter(params);
  const response = await getRestockQueues(queryString);

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Restock Queue"
        description="Manage low stock items and replenish inventory"
      />

      <RestockFilter />

      <Suspense fallback={<TableSkeleton columns={5} />}>
        <RestockTable data={response?.data || []} />
      </Suspense>

      <TablePagination
        currentPage={response?.meta?.page || 1}
        totalPages={response?.meta?.totalPage || 1}
      />
    </div>
  );
}
