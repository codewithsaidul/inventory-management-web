/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IApiErrorResponse } from "@/types/apiResponse.types";
import { Fetcher } from "@/utils/featcher";
import { zodValidator } from "@/utils/zodValidator";
import {
  productValidationSchema,
  updateProductValidation,
} from "@/validation/product.validation";
import { revalidateTag } from "next/cache";

export async function createProduct(_prevState: any, formData: FormData) {
  const validationPayload = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    price: parseFloat(formData.get("price") as string),
    stock: parseInt(formData.get("stock") as string, 10),
    minThreshold: parseInt(formData.get("minThreshold") as string, 10),
  };

  try {
    const validatedPayload = zodValidator(
      validationPayload,
      productValidationSchema,
    );

    if (!validatedPayload.success && validatedPayload.errors) {
      return {
        success: validatedPayload.success,
        message: "Validation failed",
        formData: validationPayload,
        errors: validatedPayload.errors,
      };
    }

    if (!validatedPayload.data) {
      return {
        success: false,
        message: "Validation failed",
        formData: validationPayload,
      };
    }

    const response = await Fetcher.post("/products", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedPayload.data),
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("products-list", { expire: 0 });
      revalidateTag("products-page-1", { expire: 0 });
      revalidateTag("products-search-all", { expire: 0 });
      revalidateTag("activitiLogs-list", { expire: 0 });
      revalidateTag("activitiLogs-page-1", { expire: 0 });
      revalidateTag("activitiLogs-search-all", { expire: 0 });
    }

    return result;
  } catch (error) {
    console.log(error);
    const err = error as IApiErrorResponse;
    return {
      success: false,
      message: err.data.message || "Something went wrong",
    };
  }
}

export async function getProducts(queryString?: string) {
  try {
    const searchParams = new URLSearchParams(queryString);
    const page = searchParams.get("page") || "1";
    const searchTerm = searchParams.get("searchTerm") || "all";
    const response = await Fetcher.get(
      `/products${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          tags: [
            "products-list",
            `products-page-${page}`,
            `products-search-${searchTerm}`,
          ],
          revalidate: 180,
        },
      },
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    const err = error as IApiErrorResponse;
    return {
      success: false,
      message: err.data.message || "Something went wrong",
    };
  }
}

export async function getProductById(id: string) {
  try {
    const response = await Fetcher.get(`/products/${id}`, {
      next: {
        tags: [`products-${id}`, "products-list"],
        revalidate: 180,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    const err = error as IApiErrorResponse;
    return {
      success: false,
      message: err.data.message || "Something went wrong",
    };
  }
}

export async function updateProduct(
  id: string,
  _prevState: any,
  formData: FormData,
) {
  const validationPayload = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    price: parseFloat(formData.get("price") as string),
    stock: parseInt(formData.get("stock") as string, 10),
    minThreshold: parseInt(formData.get("minThreshold") as string, 10),
  };

  try {
    const validatedPayload = zodValidator(
      validationPayload,
      updateProductValidation,
    );

    if (!validatedPayload.success && validatedPayload.errors) {
      return {
        success: validatedPayload.success,
        message: "Validation failed",
        formData: validationPayload,
        errors: validatedPayload.errors,
      };
    }

    if (!validatedPayload.data) {
      return {
        success: false,
        message: "Validation failed",
        formData: validationPayload,
      };
    }

    const response = await Fetcher.patch(`/products/${id}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedPayload.data),
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("products-list", { expire: 0 });
      revalidateTag("products-page-1", { expire: 0 });
      revalidateTag("products-search-all", { expire: 0 });
      revalidateTag("activitiLogs-list", { expire: 0 });
      revalidateTag("activitiLogs-page-1", { expire: 0 });
      revalidateTag("activitiLogs-search-all", { expire: 0 });
      revalidateTag("categories-list", { expire: 0 });
      revalidateTag("categories-page-1", { expire: 0 });
      revalidateTag("categories-search-all", { expire: 0 });
    }

    return result;
  } catch (error) {
    console.log(error);
    const err = error as IApiErrorResponse;
    return {
      success: false,
      message: err.data.message || "Something went wrong",
    };
  }
}

export async function deleteProduct(id: string) {
  try {
    const response = await Fetcher.delete(`/products/${id}`);
    const result = await response.json();
    if (result.success) {
      revalidateTag("products-list", { expire: 0 });
      revalidateTag(`products-${id}`, { expire: 0 });
      revalidateTag("products-page-1", { expire: 0 });
      revalidateTag("products-search-all", { expire: 0 });
      revalidateTag("activitiLogs-list", { expire: 0 });
      revalidateTag("activitiLogs-page-1", { expire: 0 });
      revalidateTag("activitiLogs-search-all", { expire: 0 });
    }
    return result;
  } catch (error) {
    console.log(error);
    const err = error as IApiErrorResponse;
    return {
      success: false,
      message: err.data.message || "Something went wrong",
    };
  }
}
