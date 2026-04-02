"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { IProduct, ProductStatus } from "@/types/product.types";
import { 
  Package, 
  Tag, 
  Layers, 
  Calendar, 
  Link as LinkIcon, 
  AlertTriangle, 
  X 
} from "lucide-react";

interface ProductViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  product: IProduct | null;
}

const ProductViewDetailDialog = ({
  open,
  onClose,
  product,
}: ProductViewDetailDialogProps) => {
  if (!product) return null;

  const isLowStock = product.stock <= product.minThreshold;

  const getStatusBadge = () => {
    if (product.status === ProductStatus.ACTIVE) {
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
          Active
        </Badge>
      );
    }
    return <Badge variant="destructive">Out of Stock</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle>Product Details</DialogTitle>
              <DialogDescription>
                View full inventory information for this item
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-6 pr-4">
            {/* Essential Status */}
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Availability Status
                </div>
                {getStatusBadge()}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Current Stock
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${isLowStock ? "text-destructive" : ""}`}>
                    {product.stock} units
                  </span>
                  {isLowStock && (
                    <div className="flex items-center text-destructive text-[10px] font-bold uppercase">
                      <AlertTriangle className="h-3 w-3 mr-1" /> Low Stock
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* General Information */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold">General Information</h3>
              </div>
              <div className="grid grid-cols-2 gap-y-4 ml-6">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Product Name</div>
                  <div className="font-medium text-lg">{product.name}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Category</div>
                  <div>{product.category.name}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Price</div>
                  <div className="text-xl font-bold">${product.price.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <LinkIcon className="h-3 w-3" /> Slug
                  </div>
                  <div className="text-sm font-mono bg-muted p-1 rounded inline-block">
                    {product.slug}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Inventory Control */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Layers className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold">Inventory Control</h3>
              </div>
              <div className="space-y-3 ml-6 text-sm">
                <div className="flex justify-between max-w-xs">
                  <span className="text-muted-foreground">Min. Threshold:</span>
                  <span className="font-medium">{product.minThreshold} units</span>
                </div>
                <div className="flex justify-between max-w-xs">
                  <span className="text-muted-foreground">Stock Status:</span>
                  <span>{product.stock > product.minThreshold ? "Healthy" : "Reorder Soon"}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Lifecycle Timestamps */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <div>
                  <div className="text-muted-foreground">Created</div>
                  <div>{new Date(product.createdAt).toLocaleString()}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-3 w-3 text-muted-foreground" />
                <div>
                  <div className="text-muted-foreground">Last Updated</div>
                  <div>{new Date(product.updatedAt).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewDetailDialog;