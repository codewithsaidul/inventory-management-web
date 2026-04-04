"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { IActivitiLog } from "@/types/activityLogs.types";
import { Activity, Clock, Info, User } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  log: IActivitiLog | null;
}

const ActivityLogViewModal = ({ isOpen, onClose, log }: Props) => {
  if (!log) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Activity Detail
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6 py-4">
            {/* Info Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <User className="h-3 w-3" /> Performed By
                </p>
                <p className="font-semibold text-sm">{log.performedBy}</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                  <Clock className="h-3 w-3" /> Timestamp
                </p>
                <p className="font-semibold text-sm">{new Date(log.timestamp).toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-muted/50 p-3 rounded-md border">
              <p className="text-sm font-medium">{log.message}</p>
            </div>

            {/* Changes Section */}
            {(log.metadata?.previousValue || log.metadata?.newValue) && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Info className="h-4 w-4" /> Data Changes
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                  <div className="p-3 bg-red-50 border border-red-100 rounded text-xs">
                    <p className="text-red-600 font-bold mb-1 uppercase">Previous</p>
                    <pre className="whitespace-pre-wrap">{log.metadata.previousValue || "N/A"}</pre>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-100 rounded text-xs">
                    <p className="text-green-600 font-bold mb-1 uppercase">New Value</p>
                    <pre className="whitespace-pre-wrap">{log.metadata.newValue || "N/A"}</pre>
                  </div>
                </div>
              </div>
            )}

            {/* Related Entity Info */}
            <Separator />
            <div className="text-[11px] text-muted-foreground italic">
              Log ID: {log._id} | Category: {log.category}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityLogViewModal;