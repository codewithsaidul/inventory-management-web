"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import InputFieldError from "@/components/shared/InputFieldError";
import { IProduct } from "@/types/product.types";
import {
  createProduct,
  updateProduct,
} from "@/services/product/productManagement";
import { useCategoryDropdown } from "@/hooks/useCategoryDropdown";
import { handleNumberChange, handlePriceChange } from "@/utils/inputFilters";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: IProduct | null;
}

export function ProductFormModal({
  isOpen,
  onClose,
  product,
}: ProductFormModalProps) {
  const { categories } = useCategoryDropdown();

  const formActionHandler = product
    ? updateProduct.bind(null, product._id!)
    : createProduct;

  const [state, formAction, isPending] = useActionState(
    formActionHandler,
    null,
  );

  // Form States
  const [name, setName] = useState(product?.name || "");
  const [categoryId, setCategoryId] = useState(product?.category?._id || "");
  const [price, setPrice] = useState(product?.price || "");
  const [stock, setStock] = useState(product?.stock || "");
  const [minThreshold, setMinThreshold] = useState(product?.minThreshold || "");

  useEffect(() => {
    if (state?.success) {
      toast.success(product ? "Product updated!" : "Product created!");
      onClose();
    } else if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, onClose, product]);



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>

        <form action={formAction}>
          <FieldGroup className="space-y-4">
            <Field>
              <FieldLabel>Product Name</FieldLabel>
              <Input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="iPhone 15 Pro"
              />
              <InputFieldError field="name" state={state} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Category</FieldLabel>
                <Select
                  name="category"
                  value={categoryId}
                  onValueChange={setCategoryId}
                >
                  <SelectTrigger className="cursor-pointer capitalize">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value} className="cursor-pointer capitalize">
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <InputFieldError field="category" state={state} />
              </Field>

              <Field>
                <FieldLabel>Price ($)</FieldLabel>
                <Input
                  name="price"
                  type="text"
                  inputMode="decimal"
                  value={price}
                  onChange={(e) => handlePriceChange(e.target.value, setPrice)}
                  placeholder="0"
                />
                <InputFieldError field="price" state={state} />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Initial Stock</FieldLabel>
                <Input
                  name="stock"
                  type="text" 
                  inputMode="numeric" 
                  value={stock} 
                  onChange={(e) => handleNumberChange(e.target.value, setStock)} 
                  placeholder="0"
                />
                <InputFieldError field="stock" state={state} />
              </Field>

              <Field>
                <FieldLabel>Min. Threshold</FieldLabel>
                <Input
                  name="minThreshold"
                  type="text" 
                  inputMode="numeric" 
                  value={minThreshold} 
                  onChange={(e) => handleNumberChange(e.target.value, setMinThreshold)} 
                  placeholder="0"
                />
                <InputFieldError field="minThreshold" state={state} />
              </Field>
            </div>

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isPending}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="cursor-pointer">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {product ? "Update Product" : "Create Product"}
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
