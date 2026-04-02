/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { Fetcher } from "@/utils/featcher";
import { revalidateTag } from "next/cache";

export async function getProducts(queryString?: string) {
    try {
        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";
        const response = await Fetcher.get(`/products${queryString ? `?${queryString}` : ""}`,
            {
                next: {
                    tags: [
                        "products-list",
                        `products-page-${page}`,
                        `products-search-${searchTerm}`,
                    ],
                    revalidate: 180, // faster doctor list updates
                },
            });
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function getProductById(id: string) {
    try {
        const response = await Fetcher.get(`/products/${id}`, {
            next: {
                tags: [`products-${id}`, "products-list"],
                // Reduced to 180s for more responsive doctor profile updates
                revalidate: 180,
            }
        })
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}


export async function deleteProduct(id: string) {
    try {
        const response = await Fetcher.delete(`/products/${id}`)
        const result = await response.json();
        if (result.success) {
            revalidateTag('products-list', { expire: 0 });
            revalidateTag(`products-${id}`, { expire: 0 });
            revalidateTag('products-page-1', { expire: 0 });
            revalidateTag('products-search-all', { expire: 0 });
        }
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}