"use client";

import ManagementTable from "@/components/shared/Dashboard/ManagementTable";
import { IActivitiLog } from "@/types/activityLogs.types";
import { useState } from "react";
import { activityLogColumns } from "./ActivityLogColumns";
import ActivityLogViewModal from "./ActivityLogViewModal";

interface Props {
  logs: IActivitiLog[];
}

const ActivityLogsTable = ({ logs }: Props) => {
  const [selectedLog, setSelectedLog] = useState<IActivitiLog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (log: IActivitiLog) => {
    setSelectedLog(log);
    setIsModalOpen(true);
  };

  return (
    <>
      <ManagementTable
        data={logs}
        columns={activityLogColumns}
        onView={handleView}
        getRowKey={(log) => log._id}
        emptyMessage="No activity logs found"
      />

      <ActivityLogViewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        log={selectedLog}
      />
    </>
  );
};

export default ActivityLogsTable;