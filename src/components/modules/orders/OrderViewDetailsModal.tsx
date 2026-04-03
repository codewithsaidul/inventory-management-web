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
import { IOrder, OrderStatus } from "@/types/order.types";
import {
    AlertCircle,
    Calendar,
    CheckCircle2,
    Clock,
    History,
    Package,
    ShoppingCart,
    Truck,
    User,
    X
} from "lucide-react";

interface OrderViewDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: IOrder | null;
}

const OrderViewDetailModal = ({
  isOpen,
  onClose,
  order,
}: OrderViewDetailModalProps) => {
  if (!order) return null;

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case OrderStatus.CONFIRMED:
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none"><CheckCircle2 className="h-3 w-3 mr-1" /> Confirmed</Badge>;
      case OrderStatus.SHIPPED:
        return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-none"><Truck className="h-3 w-3 mr-1" /> Shipped</Badge>;
      case OrderStatus.DELIVERED:
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none"><Package className="h-3 w-3 mr-1" /> Delivered</Badge>;
      case OrderStatus.CANCELLED:
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">Order Details</DialogTitle>
              <DialogDescription className="font-mono text-primary font-semibold">
                ID: {order.orderId}
              </DialogDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh] pr-4">
          <div className="space-y-6">
            {/* Header: Status and Total */}
            <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg border">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Current Status</p>
                {getStatusBadge(order.status)}
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-primary">${order.totalPrice.toFixed(2)}</p>
              </div>
            </div>

            {/* Customer & Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-semibold">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <h3>Customer Information</h3>
                </div>
                <div className="ml-6 text-sm space-y-1">
                  <p className="font-medium text-base">{order.customerName}</p>
                  <p className="text-muted-foreground">Registered Customer</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 font-semibold">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <h3>Order Timeline</h3>
                </div>
                <div className="ml-6 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Placed On:</span>
                    <span>{new Date(order.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Update:</span>
                    <span>{new Date(order.updatedAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Order Items */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-semibold">
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                <h3>Ordered Items ({order.items.length})</h3>
              </div>
              <div className="ml-6 border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left p-3 font-medium">Product</th>
                      <th className="text-center p-3 font-medium">Qty</th>
                      <th className="text-right p-3 font-medium">Price</th>
                      <th className="text-right p-3 font-medium">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {order.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-muted/20 transition-colors">
                        <td className="p-3">
                          <p className="font-medium">{item?.product?.name}</p>
                          <p className="text-xs text-muted-foreground">{item?.product?.category?.name}</p>
                        </td>
                        <td className="p-3 text-center">{item.quantity}</td>
                        <td className="p-3 text-right">${item.product.price.toFixed(2)}</td>
                        <td className="p-3 text-right font-semibold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Separator />

            {/* Order History/Audit Log */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-semibold">
                <History className="h-4 w-4 text-muted-foreground" />
                <h3>Order History</h3>
              </div>
              <div className="ml-6 space-y-4">
                {order.orderHistory && order.orderHistory.length > 0 ? (
                  order.orderHistory.map((log, idx) => (
                    <div key={idx} className="relative pl-6 pb-4 last:pb-0 border-l border-muted">
                      <div className="absolute left-[-5px] top-1 h-2 w-2 rounded-full bg-primary" />
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                        <span className="font-medium text-sm">Status changed to <span className="text-primary">{log.status}</span></span>
                        <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full w-fit">
                          {new Date(log.changedAt).toLocaleString()}
                        </span>
                      </div>
                      {log.note && <p className="text-xs text-muted-foreground mt-1 bg-muted/30 p-2 rounded italic">&quot;{log.note}&quot;</p>}
                      {log.changedBy && <p className="text-[10px] mt-1 italic">By: {log.changedBy.name}</p>}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground italic">No history recorded.</p>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default OrderViewDetailModal;