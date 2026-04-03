"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";

const DateFilter = ({ paramName = "date" }: { paramName?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const currentDate = searchParams.get(paramName) || "";

  const handleDateChange = (newDate: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newDate) {
      params.set(paramName, newDate);
    } else {
      params.delete(paramName);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="relative w-full max-w-52">
      <Input
        type="date"
        value={currentDate}
        onChange={(e) => handleDateChange(e.target.value)}
        disabled={isPending}
        className="cursor-pointer"
      />
    </div>
  );
};

export default DateFilter;