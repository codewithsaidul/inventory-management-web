"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { restockProduct } from "@/services/restock-queues/restock.management";
import { IRestockQueue } from "@/types/restock.types";
import { handleNumberChange } from "@/utils/inputFilters";

interface Props {
  item: IRestockQueue | null;
  onClose: () => void;
}

export default function RestockActionModal({ item, onClose }: Props) {
  const [amount, setAmount] = useState<string>("10");
  const [loading, setLoading] = useState(false);

  const handleRestock = async () => {
    if (!item || !amount || parseInt(amount) <= 0) return;
    
    setLoading(true);
    const result = await restockProduct(item._id, parseInt(amount));
    setLoading(false);

    if (result.success) {
      toast.success(`${item.product.name} restocked successfully!`);
      onClose();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Dialog open={!!item} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Restock Item</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p className="text-sm text-muted-foreground font-medium">
            Restocking: <span className="text-primary">{item?.product?.name}</span>
          </p>
          <div className="space-y-2">
            <Label htmlFor="amount">Added Stock Quantity</Label>
            <Input
              id="amount"
              type="text" 
                  inputMode="numeric" 
              value={amount}
              onChange={(e) => handleNumberChange(e.target.value, setAmount)}
              placeholder="Enter quantity e.g 1"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button onClick={handleRestock} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Restock
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}