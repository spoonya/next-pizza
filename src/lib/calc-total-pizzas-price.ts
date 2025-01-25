import { Ingredient, ProductItem } from "@prisma/client";

import { PizzaSize, PizzaType } from "../constants";

interface Params {
  items: ProductItem[];
  selectedIngredients: Set<number>;
  type: PizzaType;
  size: PizzaSize;
  ingredients?: Ingredient[];
}

export const calcTotalPizzasPrice = ({
  type,
  size,
  items,
  ingredients,
  selectedIngredients,
}: Params) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)
      ?.price || 0;
  const totalIngredientsPrice =
    ingredients
      ?.filter((ingredient) => selectedIngredients.has(ingredient.id))
      .reduce((acc, ingredient) => acc + ingredient.price, 0) || 0;

  return pizzaPrice + totalIngredientsPrice;
};
