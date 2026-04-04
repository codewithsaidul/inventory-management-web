"use server";

import { IApiErrorResponse } from "@/types/apiResponse.types";
import { Fetcher } from "@/utils/featcher";
import { zodValidator } from "@/utils/zodValidator";
import {
  createCategorySchema,
  updateCategorySchema,
} from "@/validation/categories.validation";
import { revalidateTag } from "next/cache";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createCategory(_prevState: any, formData: FormData) {
  const isActiveValue = formData.get("isActive");

  const validationPayload = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    isActive: isActiveValue === "true" ? true : false,
  };

  try {
    const validatedPayload = zodValidator(
      validationPayload,
      createCategorySchema,
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

    const response = await Fetcher.post("/categories", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedPayload.data),
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("categories-list", { expire: 0 });
      revalidateTag("categories-page-1", { expire: 0 });
      revalidateTag("categories-search-all", { expire: 0 });
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

export async function getCategories(queryString?: string) {
  try {
    const searchParams = new URLSearchParams(queryString);
    const page = searchParams.get("page") || "1";
    const searchTerm = searchParams.get("searchTerm") || "all";
    const response = await Fetcher.get(
      `/categories${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          tags: [
            "categories-list",
            `categories-page-${page}`,
            `categories-search-${searchTerm}`,
          ],
          revalidate: 180, // faster doctor list updates
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

export async function getActiveCategories(queryString?: string) {
  try {
    const searchParams = new URLSearchParams(queryString);
    const page = searchParams.get("page") || "1";
    const searchTerm = searchParams.get("searchTerm") || "all";
    const response = await Fetcher.get(
      `/categories/active${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          tags: [
            "categories-list",
            `categories-page-${page}`,
            `categories-search-${searchTerm}`,
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

export async function getCategorieById(id: string) {
  try {
    const response = await Fetcher.get(`/categories/${id}`, {
      next: {
        tags: [`categories-${id}`, "categories-list"],
        // Reduced to 180s for more responsive doctor profile updates
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

export async function updateCategory(
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _prevState: any,
  formData: FormData,
) {
  const isActiveValue = formData.get("isActive");

  const validationPayload = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    isActive: isActiveValue === "true" ? true : false,
  };
  try {
    const validatedPayload = zodValidator(
      validationPayload,
      updateCategorySchema,
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

    const response = await Fetcher.patch(`/categories/${id}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedPayload.data),
    });
    const result = await response.json();

    if (result.success) {
      revalidateTag(`categories-${id}`, { expire: 0 });
      revalidateTag("categories-list", { expire: 0 });
      revalidateTag("categories-page-1", { expire: 0 });
      revalidateTag("categories-search-all", { expire: 0 });
            revalidateTag("activitiLogs-list", { expire: 0 });
      revalidateTag("activitiLogs-page-1", { expire: 0 });
      revalidateTag("activitiLogs-search-all", { expire: 0 });
    }

    return result;
  } catch (error) {
    console.error(error);
    const err = error as IApiErrorResponse;
    return {
      success: false,
      message: err.data.message || "Something went wrong",
    };
  }
}

export async function deleteCategory(id: string) {
  try {
    const response = await Fetcher.delete(`/categories/${id}`);
    const result = await response.json();
    if (result.success) {
      revalidateTag("categories-list", { expire: 0 });
      revalidateTag(`categories-${id}`, { expire: 0 });
      revalidateTag("categories-page-1", { expire: 0 });
      revalidateTag("categories-search-all", { expire: 0 });
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
