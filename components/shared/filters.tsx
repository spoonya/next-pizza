import React from "react";

import { Input } from "../ui";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { FilterCheckbox } from "./filter-checkbox";
import { RangeSlider } from "./range-slider";
import { Title } from "./title";

interface FiltersProps {
  className?: string;
}

export function Filters({ className }: FiltersProps) {
  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Верхние чекбоксы */}
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собрать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>

      {/* Фильтр по цене */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            defaultValue={0}
          />
          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            defaultValue={0}
          />
        </div>

        <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
      </div>

      {/* Фильтр ингредиентов */}
      <CheckboxFiltersGroup
        title="Ингредиенты"
        limit={5}
        className="mt-5"
        defaultItems={[
          {
            text: "Мясо",
            value: "1",
          },
          {
            text: "Рыба",
            value: "2",
          },
          {
            text: "Овощи",
            value: "3",
          },
          {
            text: "Фрукты",
            value: "4",
          },
        ]}
        items={[
          {
            text: "Мясо",
            value: "1",
          },
          {
            text: "Рыба",
            value: "2",
          },
          {
            text: "Овощи",
            value: "3",
          },
          {
            text: "Фрукты",
            value: "4",
          },
          {
            text: "Ягоды",
            value: "5",
          },
          {
            text: "Сыр",
            value: "6",
          },
          {
            text: "Молочные продукты",
            value: "7",
          },
          {
            text: "Мясо",
            value: "8",
          },
          {
            text: "Рыба",
            value: "9",
          },
          {
            text: "Овощи",
            value: "10",
          },
          {
            text: "Фрукты",
            value: "11",
          },
        ]}
      />
    </div>
  );
}
