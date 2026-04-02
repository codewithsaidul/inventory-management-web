"use client"
import ManagementPageHeader from "@/components/shared/Dashboard/PageHeader";
import { useState } from "react";
import { CategoryFormModal } from "./CategoryFormModal";
import { Plus } from "lucide-react";

export default function CategoryPageHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ManagementPageHeader
        title="Category Management"
        description="Manage your product categories, slugs, and visibility"
        action={{
          label: "Add new Category",
          icon: Plus,
          onClick: () => setIsModalOpen(true),
        }}
      />

      {
        <CategoryFormModal
          key={"create-new"}
          isOpen={isModalOpen}
          onClose={handleClose}
          category={null}
        />
      }
    </>
  );
}
