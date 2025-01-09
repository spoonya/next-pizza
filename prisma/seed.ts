import { hashSync } from "bcrypt";

import { Prisma } from "@prisma/client";

import { _ingredients, categories, products } from "./constants";
import { prisma } from "./prisma-client";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: "THIN" | "THICK";
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User Test",
        email: "user@test.ru",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin Admin",
        email: "admin@test.ru",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Пепперони фреш",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
      categoryId: 1,
      productIngredients: {
        create: _ingredients.slice(0, 5).map((ingredient) => ({
          ingredient: { connect: { id: ingredient.id } },
        })),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Сырная",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
      categoryId: 1,
      productIngredients: {
        create: _ingredients.slice(5, 10).map((ingredient) => ({
          ingredient: { connect: { id: ingredient.id } },
        })),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Чоризо фреш",
      imageUrl:
        "https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp",
      categoryId: 1,
      productIngredients: {
        create: _ingredients.slice(10, 40).map((ingredient) => ({
          ingredient: { connect: { id: ingredient.id } },
        })),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      // Пицца "Пепперони фреш"
      generateProductItem({
        productId: pizza1.id,
        pizzaType: "THIN",
        size: 20,
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: "THIN",
        size: 30,
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: "THICK",
        size: 40,
      }),

      // Пицца "Сырная"
      generateProductItem({
        productId: pizza2.id,
        pizzaType: "THICK",
        size: 20,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: "THIN",
        size: 30,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: "THICK",
        size: 40,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: "THIN",
        size: 20,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: "THIN",
        size: 30,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: "THICK",
        size: 40,
      }),

      // Пицца "Чоризо фреш"
      generateProductItem({
        productId: pizza3.id,
        pizzaType: "THIN",
        size: 20,
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: "THICK",
        size: 30,
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: "THICK",
        size: 40,
      }),

      // Остальные продукты
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: "11111",
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "222222",
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      },
    },
  });
}

async function down() {
  const tables = [
    "User",
    "Category",
    "Cart",
    "CartItem",
    "Ingredient",
    "Product",
    "ProductItem",
  ];

  for (const table of tables) {
    await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE \"${table}\" RESTART IDENTITY CASCADE`
    );
  }
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
