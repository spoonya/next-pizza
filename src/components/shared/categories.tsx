'use client';

import React from 'react';

import { cn } from '@/src/lib/utils';
import { useCategoryStore } from '@/src/store';
import { Category } from '@prisma/client';

interface CategoriesProps {
  className?: string;
  items: Category[];
}

export function Categories({ className, items }: Readonly<CategoriesProps>) {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div
      className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}
    >
      {items.map(({ name, id }, index) => (
        <a
          key={index}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === id &&
              'bg-white shadow-md shadow-gray-200 text-primary'
          )}
          href={`/#${name}`}
        >
          {name}
        </a>
      ))}
    </div>
  );
}
