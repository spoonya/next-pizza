'use client';

import React from 'react';

import { PizzaSize, PizzaType, pizzaTypes } from '@/src/constants';
import { usePizzaOptions } from '@/src/hooks';
import { getPizzaDetails } from '@/src/lib';
import { cn } from '@/src/lib/utils';
import { Ingredient, ProductItem } from '@prisma/client';

import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { IngredientItem } from './ingredient-item';
import { PizzaImage } from './pizza-image';
import { Title } from './title';

interface Props {
  className?: string;
  name: string;
  imageUrl: string;
  ingredients?: Ingredient[];
  items: ProductItem[];
  onClickAddCart?: () => void;
}

export function ChoosePizzaForm({
  className,
  name,
  items,
  ingredients,
  imageUrl,
  onClickAddCart,
}: Readonly<Props>) {
  const {
    size,
    type,
    selectedIngredients,
    availableSizes,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(items);

  const { textDetails, totalPrice } = getPizzaDetails({
    type,
    size,
    items,
    ingredients,
    selectedIngredients,
  });

  const loading = false;

  const handleClickAddCart = () => {
    onClickAddCart?.();
  };

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-5 mt-5">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(value as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients?.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          onClick={handleClickAddCart}
          loading={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
}
