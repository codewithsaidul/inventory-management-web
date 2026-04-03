"use client";
import { useState, useEffect, useCallback } from "react";
import { getActiveCategories } from "@/services/category/categoryManagement";

export function useCategoryDropdown() {
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(
    async (pageNum = 1) => {
      if (loading || !hasMore) return;

      setLoading(true);
      const res = await getActiveCategories(`page=${pageNum}&limit=20`);

      const newOptions = res.data.map((c: { _id: string; name: string }) => ({
        label: c.name,
        value: c._id,
      }));

      setCategories((prev) => {
        if (pageNum === 1) {
          // merge instead of replace
          const merged = [...newOptions, ...prev];

          // remove duplicates
          const unique = Array.from(
            new Map(merged.map((item) => [item.value, item])).values(),
          );

          return unique;
        }

        return [...prev, ...newOptions];
      });
      setHasMore(res.meta.page < res.meta.totalPage);
      setLoading(false);
    },
    [hasMore, loading],
  );

  const fetchNextPage = () => {
    if (!hasMore || loading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchCategories(nextPage);
  };

  const refreshCategories = () => {
    setPage(1);
    setHasMore(true);
    fetchCategories(1);
  };

  useEffect(() => {
    const loadCategories = async () => {
      await fetchCategories(1);
    };

    loadCategories();
  }, [fetchCategories]);

  return { categories, fetchNextPage, refreshCategories, hasMore, loading };
}
