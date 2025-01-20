import { notFound } from "next/navigation";
import React from "react";

import {
  ChooseProductModal,
  Container,
  GroupVariants,
  ProductImage,
  Title,
} from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";

export default async function ProductModalPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      productIngredients: true,
      productItems: true,
    },
  });

  if (!product) return notFound();

  return <ChooseProductModal product={product} />;
}
