"use client";

import ManagementTable from "@/components/shared/Dashboard/ManagementTable";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { deleteCategory } from "@/services/category/categoryManagement";
import { ICategory } from "@/types/category.types"; // আপনার ইন্টারফেস পাথ
import { useState } from "react";
import toast from "react-hot-toast";
import { categoryColumns } from "./CategoryColumns";
import { CategoryFormModal } from "./CategoryFormModal";

interface CategoriesTableProps {
  categories: ICategory[];
}

const CategoriesTable = ({ categories }: CategoriesTableProps) => {
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null,
  );
  const [deletingCategory, setDeletingCategory] = useState<ICategory | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (category: ICategory) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const confirmDelete = async () => {
    if (!deletingCategory) return;
    const toastId = toast.loading("Deleting...")
    setIsDeleting(true);
    const result = await deleteCategory(deletingCategory._id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Category deleted successfully", { id: toastId });
      setDeletingCategory(null);
    } else {
      toast.error(result.message || "Failed to delete user", { id: toastId });
    }
  };

  return (
    <>
      <ManagementTable
        data={categories}
        columns={categoryColumns}
        onEdit={handleEdit}
        onDelete={(category) => setDeletingCategory(category)}
        getRowKey={(category) => category.slug}
        emptyMessage="No categories found"
      />

      <CategoryFormModal
        key={editingCategory?._id || "create-new"}
        isOpen={isModalOpen}
        onClose={handleClose}
        category={editingCategory}
      />

      <DeleteConfirmationDialog
        open={!!deletingCategory}
        onOpenChange={(open) => !open && setDeletingCategory(null)}
        onConfirm={confirmDelete}
        title="Delete Cateogry"
        description={`Are you sure you want to delete ${deletingCategory?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default CategoriesTable;
