"use client";

import ManagementTable from "@/components/shared/Dashboard/ManagementTable";
import { IProduct } from "@/types/product.types";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { productsColumns  } from "./ProductsColumns";
import ProductViewDetailDialog from "./ProductViewModal";


interface ProductsTableProps {
  products: IProduct[];
}

const ProductsTable = ({ products }: ProductsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [viewingProduct, setViewingProduct] = useState<IProduct | null>(null);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (product: IProduct) => {
    setViewingProduct(product);
  };

  const handleEdit = (product: IProduct) => {
    setEditingProduct(product);
  };

  return (
    <>
      <ManagementTable
        data={products}
        columns={productsColumns}
        onView={handleView}
        onEdit={handleEdit}
        // Using _id based on your IProduct interface
        getRowKey={(product) => product._id!}
        emptyMessage="No products found"
      />

      {/* View Product Detail Dialog */}
      <ProductViewDetailDialog
        open={!!viewingProduct}
        onClose={() => setViewingProduct(null)}
        product={viewingProduct}
      />

      {/* Edit Product Dialog */}
      {/* <EditProductDialog
        open={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        product={editingProduct}
        onSuccess={() => {
          setEditingProduct(null);
          handleRefresh();
        }}
      /> */}
    </>
  );
};

export default ProductsTable;