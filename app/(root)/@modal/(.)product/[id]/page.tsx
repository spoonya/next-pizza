import { notFound } from "next/navigation";

import { ChooseProductModal } from "@/components/shared";
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
    include: {
      productIngredients: {
        include: {
          ingredient: true,
        },
      },
      productItems: true,
    },
  });

  if (!product) return notFound();

  return <ChooseProductModal product={product} />;
}
