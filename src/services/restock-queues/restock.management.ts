"use server";

import { IApiErrorResponse } from "@/types/apiResponse.types";
import { Fetcher } from "@/utils/featcher";
import { revalidateTag } from "next/cache";

export async function getRestockQueues(queryString?: string) {
  try {
    const response = await Fetcher.get(
      `/restock-queues${queryString ? `?${queryString}` : ""}`,
      {
        next: { tags: ["restock-list"], revalidate: 180 },
      },
    );
    return await response.json();
  } catch (error) {
    const err = error as IApiErrorResponse;
    return { success: false, message: err.data?.message || "Failed to fetch" };
  }
}

export async function restockProduct(id: string, addedStock: number) {
  try {
    const response = await Fetcher.patch(`/restock-queues/${id}/restock-item`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ addedStock }),
    });
    const result = await response.json();

    if (result.success) {
      revalidateTag("restock-list", { expire: 0 });
      revalidateTag("products-list", { expire: 0 });
      revalidateTag("activitiLogs-list", { expire: 0 });
    }
    return result;
  } catch (error) {
    const err = error as IApiErrorResponse;
    return { success: false, message: err.data?.message || "Restock failed" };
  }
}
