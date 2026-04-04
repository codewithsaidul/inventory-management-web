import ActivityLogFilter from "@/components/modules/activityLogs/ActivityLogFilter";
import ActivityLogsTable from "@/components/modules/activityLogs/ActivityLogTable";
import ManagementPageHeader from "@/components/shared/Dashboard/PageHeader";
import { TableSkeleton } from "@/components/shared/Dashboard/TableSkeleton";
import TablePagination from "@/components/shared/TablePagination";
import { getActivityLogs } from "@/services/activityLogs/activityLogsManagement";
import { queryStringFormatter } from "@/utils/formatter";
import { Suspense } from "react";

const ActivityLogsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const response = await getActivityLogs(queryString);

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Activity Logs"
        description="Monitor system activities and user actions"
      />

      <ActivityLogFilter />

      <Suspense fallback={<TableSkeleton columns={4} />}>
        <ActivityLogsTable logs={response?.data || []} />
      </Suspense>

      <TablePagination
        currentPage={response?.meta?.page || 1}
        totalPages={response?.meta?.totalPages || 1}
      />
    </div>
  );
};

export default ActivityLogsPage;