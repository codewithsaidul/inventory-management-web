"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import InputFieldError from "@/components/shared/InputFieldError";
import { IOrder, OrderStatus } from "@/types/order.types";
import { updateOrderStatus } from "@/services/order/orderManagement";

interface OrderStatusUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: IOrder | null;
}

export function OrderStatusUpdateModal({
  isOpen,
  onClose,
  order,
}: OrderStatusUpdateModalProps) {

  const formActionHandler = order 
    ? updateOrderStatus.bind(null, order._id!) 
    : () => {};

  const [state, formAction, isPending] = useActionState(formActionHandler, null);

  const [status, setStatus] = useState<string>(order?.status || "");


  useEffect(() => {
    if (state && state.success) {
      toast.success("Order status updated successfully!");
      onClose();
    } else if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, onClose]);

  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>
            Change the current status of Order ID: <span className="font-mono font-bold">{order.orderId}</span>
          </DialogDescription>
        </DialogHeader>

        <form action={formAction}>
          <FieldGroup className="space-y-4">
            {/* Order Status Select */}
            <Field>
              <FieldLabel htmlFor="status">Select New Status</FieldLabel>
              <Select 
                name="status" 
                value={status} 
                onValueChange={setStatus}
              >
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(OrderStatus).map((statusValue) => (
                    <SelectItem 
                      key={statusValue} 
                      value={statusValue}
                      className="cursor-pointer"
                    >
                      {statusValue}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputFieldError field="status" state={state} />
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
                Update Status
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}