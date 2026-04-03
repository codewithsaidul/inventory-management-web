"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createOrder } from "@/services/order/orderManagement";
import { getProducts } from "@/services/product/productManagement";
import {
  IOrderCreateModalProps,
  IOrderCreatePayload,
  IOrderItem,
} from "@/types/order.types";
import { IProduct } from "@/types/product.types";
import { useEffect, useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";

export default function OrderCreateModal({
  isOpen,
  onClose,
}: IOrderCreateModalProps) {
  const [isPending, startTransition] = useTransition();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [items, setItems] = useState<IOrderItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [quantity, setQuantity] = useState("1");
  const [customerName, setCustomerName] = useState("");

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (
    pageParam: number,
    searchParam: string,
    reset = false,
  ) => {
    setLoading(true);
    try {
      const res = await getProducts(
        `page=${pageParam}&limit=10&searchTerm=${searchParam}`,
      );
      const newData = res?.data || [];

      setProducts((prev) => (reset ? newData : [...prev, ...newData]));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1, "", true);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchProducts(1, search, true);
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  const handleAddItem = () => {
    if (!selectedProduct || !quantity) return;

    const qty = Number(quantity);
    if (qty <= 0) return;

    const existing = items.find((i) => i.product._id === selectedProduct._id);
    if (existing) {
      setItems((prev) =>
        prev.map((i) =>
          i.product._id === selectedProduct._id
            ? { ...i, quantity: i.quantity + qty }
            : i,
        ),
      );
    } else {
      setItems((prev) => [
        ...prev,
        { product: selectedProduct, quantity: qty },
      ]);
    }

    setSelectedProduct(null);
    setQuantity("1");
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.product._id !== id));
  };

  const totalPrice = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  }, [items]);

  const handleSubmit = () => {
    const toastId = toast.loading("Creating Order...");
    const payload: IOrderCreatePayload = {
      customerName,
      items: items.map((i) => ({
        product: i?.product?._id as string,
        quantity: i?.quantity,
        price: i?.product?.price,
      })),
      totalPrice,
    };

    startTransition(async () => {
      const res = await createOrder(payload);

      if (res.success) {
        toast.success(res.message || "Order created!", { id: toastId });
        setItems([]);
        setCustomerName("");
        onClose();
      } else {
        setItems([]);
        setCustomerName("");
        toast.error(res.message || "Order creation failed", { id: toastId });
        onClose();
      }
    });
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage, search);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Customer Name */}
          <Input
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          {/* Product Search */}
          <Input
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Product List */}
          <div className="border rounded-lg max-h-40 overflow-y-auto p-2 space-y-2">
            {products.map((p) => (
              <div
                key={p._id}
                onClick={() => setSelectedProduct(p)}
                className={`p-2 rounded cursor-pointer ${
                  selectedProduct?._id === p._id
                    ? "bg-secondary"
                    : "hover:bg-secondary"
                }`}
              >
                <p className="capitalize">
                  {p.name} (${p.price})
                </p>
              </div>
            ))}
            {loading && <span className="animate-spin mr-2">⏳</span>}
          </div>

          {/* Load More */}
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={loading}
            className="cursor-pointer"
          >
            Load More
          </Button>

          {/* Add Item */}
          <div className="flex gap-2">
            <Input
              className="w-24"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Button
              onClick={handleAddItem}
              disabled={!selectedProduct}
              className="cursor-pointer"
            >
              Add Item
            </Button>
          </div>

          {/* Selected Items */}
          <div className="border p-3 rounded space-y-2">
            {items.length === 0 && (
              <p className="text-sm text-gray-500">No items added</p>
            )}
            {items.map((item) => (
              <div
                key={item.product._id}
                className="flex justify-between items-center"
              >
                <div>
                  {item.product.name} × {item.quantity}
                  <div className="text-xs text-gray-500">
                    ${item.product.price} each
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span>${item.product.price * item.quantity}</span>
                  <button
                    onClick={() => handleRemoveItem(item.product._id!)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!items.length}
            className="cursor-pointer"
          >
            {isPending && <span className="animate-spin mr-2">⏳</span>}
            Create Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
