"use client";

import ManagementTable from "@/components/shared/Dashboard/ManagementTable";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { deleteOrder } from "@/services/order/orderManagement";
import { IOrder } from "@/types/order.types";
import { useState } from "react";
import toast from "react-hot-toast";
import { orderColumns } from "./OrderColumns";
import { OrderStatusUpdateModal } from "./OrderStatusUpdateModal";
import OrderViewDetailModal from "./OrderViewDetailsModal";
// import OrderStatusModal from "./OrderStatusModal";
interface OrdersTableProps {
  orders: IOrder[];
}

const OrdersTable = ({ orders }: OrdersTableProps) => {
  const [viewingOrder, setViewingOrder] = useState<IOrder | null>(null);
  const [editingOrder, setEditingOrder] = useState<IOrder | null>(null);
  const [deletingOrder, setDeletingOrder] = useState<IOrder | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);


  const confirmDelete = async () => {
    if (!deletingOrder) return;
    const toastId = toast.loading("Deleting Order...");
    setIsDeleting(true);
    const result = await deleteOrder(deletingOrder._id);
    setIsDeleting(false);

    if (result.success) {
      toast.success("Order deleted successfully", { id: toastId });
      setDeletingOrder(null);
    } else {
      toast.error(result.message || "Failed to delete order", { id: toastId });
    }
  };

  return (
    <>
      <ManagementTable
        data={orders}
        columns={orderColumns}
        onEdit={(order) => setEditingOrder(order)}
        onView={(order) => setViewingOrder(order)}
        onDelete={(order) => setDeletingOrder(order)}
        getRowKey={(order) => order.orderId}
        emptyMessage="No orders found"
      />

      
          <OrderViewDetailModal 
          isOpen={!!viewingOrder}
          onClose={() => setViewingOrder(null)}
          order={viewingOrder} />


      {/* Modal to update Order Status */}
      {editingOrder && (
        <OrderStatusUpdateModal
          key={editingOrder._id}
          isOpen={!!editingOrder}
          onClose={() => setEditingOrder(null)}
          order={editingOrder}
        />
      )}

      <DeleteConfirmationDialog
        open={!!deletingOrder}
        onOpenChange={(open) => !open && setDeletingOrder(null)}
        onConfirm={confirmDelete}
        title="Delete Order"
        description={`Are you sure you want to delete order ${deletingOrder?.orderId}?`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default OrdersTable;
