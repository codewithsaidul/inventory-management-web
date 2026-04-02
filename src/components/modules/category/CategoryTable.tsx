"use client";

import ManagementTable from "@/components/shared/Dashboard/ManagementTable";
import { ICategory } from "@/types/category.types"; // আপনার ইন্টারফেস পাথ
import { useState } from "react";
import { categoryColumns } from "./CategoryColumns";
import { CategoryFormModal } from "./CategoryFormModal";

interface CategoriesTableProps {
  categories: ICategory[];
}

const CategoriesTable = ({ categories }: CategoriesTableProps) => {
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (category: ICategory) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <>
      <ManagementTable
        data={categories}
        columns={categoryColumns}
        onEdit={handleEdit}
        getRowKey={(category) => category.slug}
        emptyMessage="No categories found"
      />

      <CategoryFormModal
        key={editingCategory?._id || "create-new"}
        isOpen={isModalOpen}
        onClose={handleClose}
        category={editingCategory}
      />
    </>
  );
};

export default CategoriesTable;
