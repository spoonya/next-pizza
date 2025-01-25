"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { ProductWithRelations } from "@/@types/prisma";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { cn } from "@/src/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { ChoosePizzaForm } from "../choose-pizza-form";
import { ChooseProductForm } from "../choose-product-form";

interface Props {
  className?: string;
  product: ProductWithRelations;
}

export function ChooseProductModal({ className, product }: Props) {
  const router = useRouter();
  const isPizzaForm = Boolean(product.productItems[0].pizzaType);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        aria-describedby={product.name}
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[520px] bg-white overflow-hidden",
          className
        )}
      >
        <VisuallyHidden.Root>
          <DialogTitle>{product.name}</DialogTitle>
        </VisuallyHidden.Root>
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            items={product.productItems}
            ingredients={product.productIngredients.map((i) => i.ingredient)}
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
}
