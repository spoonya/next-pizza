import { Ingredient, ProductItem } from '@prisma/client';

import { mapPizzaType, PizzaSize, PizzaType } from '../constants';
import { calcTotalPizzasPrice } from './calc-total-pizzas-price';

interface Params {
  items: ProductItem[];
  selectedIngredients: Set<number>;
  type: PizzaType;
  size: PizzaSize;
  ingredients?: Ingredient[];
}

export const getPizzaDetails = ({
  type,
  size,
  items,
  ingredients,
  selectedIngredients,
}: Params) => {
  const totalPrice = calcTotalPizzasPrice({
    items,
    selectedIngredients,
    type,
    size,
    ingredients,
  });

  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

  return { textDetails, totalPrice };
};
