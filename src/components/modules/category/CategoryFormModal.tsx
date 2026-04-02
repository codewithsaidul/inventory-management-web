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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import InputFieldError from "@/components/shared/InputFieldError";
import { ICategory } from "@/types/category.types";
import { createCategory, updateCategory } from "@/services/category/categoryManagement";

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: ICategory | null;
}

export function CategoryFormModal({
  isOpen,
  onClose,
  category,
}: CategoryFormModalProps) {
  // ক্যাটাগরি থাকলে আপডেট অ্যাকশন, না থাকলে ক্রিয়েট অ্যাকশন
  const formActionHandler = category 
    ? updateCategory.bind(null, category._id!) 
    : createCategory;

  const [state, formAction, isPending] = useActionState(formActionHandler, null);

  // ইনিশিয়াল স্টেট সরাসরি প্রপস থেকে সেট করা হচ্ছে (useEffect এরর এড়াতে)
  const [name, setName] = useState(category?.name || "");
  const [description, setDescription] = useState(category?.description || "");
  const [isActive, setIsActive] = useState(category ? String(category.isActive) : "true");

  // সাকসেস হ্যান্ডলিং

  useEffect(() => {
    if (state && state.success) {
      toast.success(category ? "Category updated successfully!" : "Category created successfully!");
      onClose();
    } else if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, onClose, category]);


    console.log("🚀 ~ CategoryFormModal ~ state:", state)
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>

        <form action={formAction}>
          <FieldGroup className="space-y-4">
            {/* Category Name */}
            <Field>
              <FieldLabel htmlFor="name">Category Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Electronics"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputFieldError field="name" state={state} />
            </Field>

            {/* Status */}
            <Field>
              <FieldLabel htmlFor="isActive">Status</FieldLabel>
              <Select 
                name="isActive" 
                value={isActive} 
                onValueChange={setIsActive}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <InputFieldError field="isActive" state={state} />
            </Field>

            {/* Description */}
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                name="description"
                placeholder="Briefly describe the category..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
              <InputFieldError field="description" state={state} />
            </Field>

            <DialogFooter className="mt-6 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isPending}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isPending} 
                className="cursor-pointer bg-primary"
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {category ? "Update Category" : "Create Category"}
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}