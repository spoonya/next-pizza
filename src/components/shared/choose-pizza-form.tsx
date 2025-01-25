import React from "react";
import { useSet } from "react-use";

import {
  mapPizzaType,
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from "@/src/constants";
import { cn } from "@/src/lib/utils";
import { Ingredient, ProductItem } from "@prisma/client";

import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { IngredientItem } from "./ingredient-item";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";

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
}: Props) {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>("THICK");

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;
  const loading = false;

  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)
      ?.price || 0;
  const totalIngredientsPrice =
    ingredients
      ?.filter((ingredient) => selectedIngredients.has(ingredient.id))
      .reduce((acc, ingredient) => acc + ingredient.price, 0) || 0;

  const totalPrice = pizzaPrice + totalIngredientsPrice;

  const handleClickAddCart = () => {
    onClickAddCart?.();
    console.log({
      size,
      type,
      selectedIngredients,
      pizzaPrice,
      totalIngredientsPrice,
    });
  };

  const availablePizzas = items.filter((item) => item.pizzaType === type);
  const availablePizzaSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !availablePizzas.some(
      (pizza) => Number(pizza.size) === Number(item.value)
    ),
  }));

  React.useEffect(() => {
    const isAvailableSize = availablePizzaSizes?.find(
      (item) => Number(item.value) === size && !item.disabled
    );
    const availableSize = availablePizzaSizes?.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  console.log({
    items,
  });

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-5 mt-5">
          <GroupVariants
            items={availablePizzaSizes}
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
