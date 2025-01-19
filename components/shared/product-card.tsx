import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "../ui";
import { Title } from "./title";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  ingredients: string[];
  imageUrl: string;
  className?: string;
}

export function ProductCard({
  className,
  name,
  imageUrl,
  ingredients,
  price,
  id,
}: ProductCardProps) {
  return (
    <div className={className}>
      <Link href="/product/1">
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="text-sm text-gray-400">{ingredients.join(", ")}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            от <b>{price} ₽</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
}
