"use client";

import React from "react";
import { useIntersection } from "react-use";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store";

import { ProductCard, Title } from "./";

interface ProductsGroupListProps {
  title: string;
  items: any[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export function ProductsGroupList({
  className,
  listClassName,
  items,
  title,
  categoryId,
}: ProductsGroupListProps) {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef<HTMLElement | null>(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, setActiveCategoryId, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            ingredients={product.ingredients}
            price={product.price}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
}
