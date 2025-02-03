import { ProductItem } from '@prisma/client';

import { Variant } from '../components/shared/group-variants';
import { pizzaSizes, PizzaType } from '../constants';

export const getAvailablePizzaSizes = (
  items: ProductItem[],
  type: PizzaType
): Variant[] => {
  const filteredPizzasByType = items.filter((item) => item.pizzaType === type);
  const availablePizzaSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(
      (pizza) => Number(pizza.size) === Number(item.value)
    ),
  }));

  return availablePizzaSizes;
};
