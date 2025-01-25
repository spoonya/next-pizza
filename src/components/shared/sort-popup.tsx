import { ArrowUpDown } from "lucide-react";
import React from "react";

import { cn } from "@/src/lib/utils";

interface SortPopupProps {
  className?: string;
}

export function SortPopup({ className }: SortPopupProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer",
        className
      )}
    >
      <ArrowUpDown size={16} />
      <strong>Сортировка:</strong>
      <b className="text-primary">популярное</b>
    </div>
  );
}
