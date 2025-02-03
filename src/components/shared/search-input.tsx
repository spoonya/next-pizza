'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useClickAway, useDebounce } from 'react-use';

import { cn } from '@/src/lib/utils';
import { Api } from '@/src/services/api-client';
import { AppRoutes } from '@/src/services/constants';
import { Product } from '@prisma/client';

interface Props {
  className?: string;
}

export function SearchInput({ className }: Readonly<Props>) {
  const [focused, setFocused] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [products, setProducts] = React.useState<Product[]>([]);

  const ref = React.useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery('');
    setProducts([]);
  };

  useDebounce(
    async () => {
      try {
        const response = await Api.products.search(searchQuery);
        setProducts(response);
      } catch (error) {
        console.log(error);
      }
    },
    250,
    [searchQuery]
  );

  return (
    <>
      {focused && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-30" />
      )}

      <div
        ref={ref}
        className={cn(
          'flex rounded-2xl flex-1 justify-between relative h-11 z-30',
          className
        )}
      >
        <Search className="absolute top-1/2 -translate-y-1/2 left-3 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Пицца 4 сыра мазерати..."
          className="w-full pl-10 pr-4 h-full rounded-2xl border border-gray-200 bg-gray-100 focus:outline-none focus:border-transparent placeholder:text-gray-400"
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {products.length > 0 && (
          <div
            className={cn(
              'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
              focused && 'visible opacity-100 top-12'
            )}
          >
            {products.map((product) => (
              <Link
                onClick={onClickItem}
                key={product.id}
                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                href={`${AppRoutes.PRODUCT}/${product.id}`}
              >
                <img
                  className="rounded-sm h-8 w-8"
                  src={product.imageUrl}
                  alt={product.name}
                />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
