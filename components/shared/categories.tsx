import React from "react";

import { cn } from "@/lib/utils";

interface CategoriesProps {
  className?: string;
}

const categories = [
  "Пиццы",
  "Комбо",
  "Закуски",
  "Коктейли",
  "Кофе",
  "Напитки",
  "Десерты",
];
const activeIndex = 0;

export function Categories({ className }: CategoriesProps) {
  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {categories.map((category, index) => (
        <a
          key={index}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            activeIndex === index &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          href="#"
        >
          {category}
        </a>
      ))}
    </div>
  );
}
