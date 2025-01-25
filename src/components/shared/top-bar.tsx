import React from "react";

import { cn } from "@/src/lib/utils";
import { Category } from "@prisma/client";

import { Categories } from "./categories";
import { Container } from "./container";
import { SortPopup } from "./sort-popup";

interface TopBarProps {
  className?: string;
  categories: Category[];
}

export function TopBar({ className, categories }: TopBarProps) {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        className
      )}
    >
      <Container className="flex items-center justify-between ">
        <Categories items={categories} />
        <SortPopup />
      </Container>
    </div>
  );
}
