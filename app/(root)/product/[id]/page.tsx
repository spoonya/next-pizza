import { notFound } from "next/navigation";
import React from "react";

import { prisma } from "@/prisma/prisma-client";
import {
  Container,
  GroupVariants,
  ProductImage,
  Title,
} from "@/src/components/shared";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage imageUrl={product.imageUrl} size={20} />

        <div className="w-[490px] bg-[#f7f7f7] p-7">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />

          <p className="text-gray-400">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse
            beatae molestias magnam architecto excepturi perspiciatis, quam
            aperiam est quas sunt totam pariatur? Quam commodi amet, consectetur
            quod exercitationem praesentium sit?
          </p>

          <GroupVariants
            items={[
              {
                name: "20 см",
                value: "20",
                disabled: false,
              },
              {
                name: "30 см",
                value: "30",
                disabled: false,
              },
              {
                name: "40 см",
                value: "40",
                disabled: false,
              },
            ]}
            value="20"
          />
        </div>
      </div>
    </Container>
  );
}
