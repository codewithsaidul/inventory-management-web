"use client";
import ManagementPageHeader from "@/components/shared/Dashboard/PageHeader";
import { useState } from "react";
import { ProductFormModal } from "./ProductFormModal";
import { Plus } from "lucide-react";

export default function ProductsPageHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ManagementPageHeader
        title="Products Management"
        description="Monitor inventory levels, pricing, and product status"
        action={{
          label: "Add new Product",
          icon: Plus,
          onClick: () => setIsModalOpen(true),
        }}
      />

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={null}
      />
    </>
  );
}
