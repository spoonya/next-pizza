import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui";
import { ProductImage } from "./product-image";
import { Title } from "./title";

interface Props {
  className?: string;
  name: string;
  imageUrl: string;
  ingredients?: any[];
  items?: any[];
  onClickAdd?: () => void;
}

export function ChooseProductForm({
  className,
  name,
  items,
  ingredients,
  imageUrl,
  onClickAdd,
}: Props) {
  const textDetails = "30 см, традиционное тесто 30";
  const totalPrice = 350;
  const loading = false;

  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <Button
          loading={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
}
