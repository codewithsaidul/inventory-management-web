"use client";
import ManagementPageHeader from "@/components/shared/Dashboard/PageHeader";
import { useState } from "react";
import OrderCreateModal from "./OrderCreateModal";
import { Plus } from "lucide-react";

export default function OrderPageHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <ManagementPageHeader
        title="Order Management"
        description="Track customer orders, manage shipping status, and order history"
        action={{
          label: "Create Order",
          icon: Plus,
          onClick: () => setIsModalOpen(true),
        }}
      />

      <OrderCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
