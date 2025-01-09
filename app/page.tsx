import {
  Container,
  Filters,
  ProductsGroupList,
  Title,
  TopBar,
} from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="pb-14 mt-10">
        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Пиццы"
                categoryId={1}
                items={[
                  {
                    id: 0,
                    name: "Чизбургер-пицца",
                    price: 500,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11efa1eecbfe557d92cd312e3b438dae.avif",
                    ingredients: [
                      "Цыплёнок, моцарелла, бекон, томаты, соус барбекю",
                    ],
                  },
                  {
                    id: 1,
                    name: "Кола-барбекю",
                    price: 700,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d5f2f13041e9101158d09cebae0.avif",
                    ingredients: [
                      "Пряная говядина, пикантная пепперони, острые колбаски чоризо, соус кола-барбекю, моцарелла и фирменный томатный соус",
                    ],
                  },
                  {
                    id: 2,
                    name: "Чизбургер-пицца",
                    price: 500,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11efa1eecbfe557d92cd312e3b438dae.avif",
                    ingredients: [
                      "Цыплёнок, моцарелла, бекон, томаты, соус барбекю",
                    ],
                  },
                  {
                    id: 3,
                    name: "Кола-барбекю",
                    price: 700,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d5f2f13041e9101158d09cebae0.avif",
                    ingredients: [
                      "Пряная говядина, пикантная пепперони, острые колбаски чоризо, соус кола-барбекю, моцарелла и фирменный томатный соус",
                    ],
                  },
                ]}
              />

              <ProductsGroupList
                title="Комбо"
                categoryId={2}
                items={[
                  {
                    id: 0,
                    name: "Чизбургер-пицца",
                    price: 500,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11efa1eecbfe557d92cd312e3b438dae.avif",
                    ingredients: [
                      "Цыплёнок, моцарелла, бекон, томаты, соус барбекю",
                    ],
                  },
                  {
                    id: 1,
                    name: "Кола-барбекю",
                    price: 700,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d5f2f13041e9101158d09cebae0.avif",
                    ingredients: [
                      "Пряная говядина, пикантная пепперони, острые колбаски чоризо, соус кола-барбекю, моцарелла и фирменный томатный соус",
                    ],
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
