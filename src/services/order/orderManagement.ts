/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IApiErrorResponse } from "@/types/apiResponse.types";
import { IOrderCreatePayload } from "@/types/order.types";
import { Fetcher } from "@/utils/featcher";
import { zodValidator } from "@/utils/zodValidator";
import {
  orderValidationSchema,
  updateOrderStatusSchema,
} from "@/validation/order.validation";
import { revalidateTag } from "next/cache";

export async function createOrder(payload: IOrderCreatePayload) {
  try {
    const validatedPayload = zodValidator(payload, orderValidationSchema);

    if (!validatedPayload.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validatedPayload.errors,
      };
    }

    const response = await Fetcher.post("/orders", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedPayload.data),
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("orders-list", { expire: 0 });
      revalidateTag("orders-page", { expire: 0 });
      revalidateTag("orders-search-all", { expire: 0 });
      revalidateTag("products-list", { expire: 0 });
      revalidateTag("products-page-1", { expire: 0 });
      revalidateTag("products-search-all", { expire: 0 });
    }

    return result;
  } catch (error) {
    const err = error as IApiErrorResponse;
    return {
      success: false,
      message: err.data?.message || "Something went wrong",
    };
  }
}

export async function getOrders(queryString?: string) {
  try {
    const searchParams = new URLSearchParams(queryString);
    const page = searchParams.get("page") || "1";
    const searchTerm = searchParams.get("searchTerm") || "all";

    const response = await Fetcher.get(
      `/orders${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          tags: [
            "orders-list",
            `orders-page-${page}`,
            `orders-search-${searchTerm}`,
          ],
          revalidate: 60,
        },
      },
    );
    return await response.json();
  } catch (error) {
    const err = error as IApiErrorResponse;
    return {
      success: false,
      message: err.data?.message || "Something went wrong",
    };
  }
}

export async function updateOrderStatus(
  id: string,
  _prevState: any,
  formData: FormData,
) {
  const validationPayload = {
    status: formData.get("status") as string,
  };

  try {
    const validatedPayload = zodValidator(
      validationPayload,
      updateOrderStatusSchema,
    );

    if (!validatedPayload.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validatedPayload.errors,
      };
    }

    const response = await Fetcher.patch(`/orders/${id}/status`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedPayload.data),
    });

    const result = await response.json();

    if (result.success) {
      // Reload issue fix korar jonno tag gulo plural e thik kora hoise
      revalidateTag("orders-list", { expire: 0 });
      revalidateTag(`orders-${id}`, { expire: 0 });
      revalidateTag("orders-page-1", { expire: 0 });
    }

    return result;
  } catch (error) {
    const err = error as IApiErrorResponse;
    return {
      success: false,
      message: err.data?.message || "Something went wrong",
    };
  }
}

export async function deleteOrder(id: string) {
  try {
    const response = await Fetcher.delete(`/orders/${id}`);
    const result = await response.json();

    if (result.success) {
      revalidateTag("orders-list", { expire: 0 });
      revalidateTag("orders-page-1", { expire: 0 });
    }
    return result;
  } catch (error) {
    const err = error as IApiErrorResponse;
    return {
      success: false,
      message: err.data?.message || "Something went wrong",
    };
  }
}
