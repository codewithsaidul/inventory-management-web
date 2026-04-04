"use server";

import { IApiErrorResponse } from "@/types/apiResponse.types";
import { Fetcher } from "@/utils/featcher";

export async function getActivityLogs(queryString?: string) {
  try {
    const searchParams = new URLSearchParams(queryString);
    const page = searchParams.get("page") || "1";
    const searchTerm = searchParams.get("searchTerm") || "all";
    const response = await Fetcher.get(
      `/activitiLogs${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          tags: [
            "activitiLogs-list",
            `activitiLogs-page-${page}`,
            `activitiLogs-search-${searchTerm}`,
          ],
          revalidate: 0,
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
