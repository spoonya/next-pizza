import {
  Ingredient,
  Product,
  ProductIngredient,
  ProductItem,
} from '@prisma/client';

export type ProductWithRelations = Product & {
  productItems: Array<ProductItem & { productId?: number }>;
  productIngredients: Array<
    ProductIngredient & {
      ingredient: Ingredient;
    }
  >;
};
