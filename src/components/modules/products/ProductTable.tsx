"use client";

import ManagementTable from "@/components/shared/Dashboard/ManagementTable";
import { IProduct } from "@/types/product.types";
import { useState } from "react";
import { ProductFormModal } from "./ProductFormModal";
import { productsColumns } from "./ProductsColumns";
import ProductViewDetailDialog from "./ProductViewModal";
import toast from "react-hot-toast";
import { deleteProduct } from "@/services/product/productManagement";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";

interface ProductsTableProps {
  products: IProduct[];
}

const ProductsTable = ({ products }: ProductsTableProps) => {
  const [viewingProduct, setViewingProduct] = useState<IProduct | null>(null);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<IProduct | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleView = (product: IProduct) => {
    setViewingProduct(product);
  };

  const handleEdit = (product: IProduct) => {
    setEditingProduct(product);
  };

  const handleCloseEdit = () => {
    setEditingProduct(null);
  };

  const confirmDelete = async () => {
    if (!deletingProduct) return;
    const toastId = toast.loading("Deleting...")
    setIsDeleting(true);
    const result = await deleteProduct(deletingProduct._id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Product deleted successfully", { id: toastId });
      setDeletingProduct(null);
    } else {
      toast.error(result.message || "Failed to delete user", { id: toastId });
    }
  };

  return (
    <>
      <ManagementTable
        data={products}
        columns={productsColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={(product) => setDeletingProduct(product)}
        getRowKey={(product) => product._id!}
        emptyMessage="No products found"
      />

      {/* View Product Detail Dialog */}
      <ProductViewDetailDialog
        open={!!viewingProduct}
        onClose={() => setViewingProduct(null)}
        product={viewingProduct}
      />

      <ProductFormModal
        key={editingProduct?._id || "new-product"}
        isOpen={!!editingProduct}
        onClose={handleCloseEdit}
        product={editingProduct}

      />

      <DeleteConfirmationDialog
        open={!!deletingProduct}
        onOpenChange={(open) => !open && setDeletingProduct(null)}
        onConfirm={confirmDelete}
        title="Delete Product"
        description={`Are you sure you want to delete ${deletingProduct?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default ProductsTable;
