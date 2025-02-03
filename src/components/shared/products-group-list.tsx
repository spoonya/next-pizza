'use client';

import React from 'react';
import { useIntersection } from 'react-use';

import { cn } from '@/src/lib/utils';
import { useCategoryStore } from '@/src/store';

import { ProductCard, Title } from './';

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
}: Readonly<ProductsGroupListProps>) {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef<HTMLDivElement>(null);
  const intersection = useIntersection(
    intersectionRef as React.RefObject<HTMLElement>,
    {
      threshold: 0.4,
    }
  );

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, setActiveCategoryId, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            ingredients={product.productIngredients.map(
              (productIngredient) => productIngredient.ingredient.name
            )}
            price={Math.min(...product.productItems.map((item) => item.price))}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
}
