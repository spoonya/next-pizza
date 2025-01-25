import { ArrowRight, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { cn } from "@/src/lib/utils";
import { AppRoutes } from "@/src/services/constants";

import { Button } from "../ui";
import { Container } from "./container";
import { SearchInput } from "./search-input";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn("border border-b", className)}>
      <Container className="flex justify-between items-center py-8">
        {/* Левая часть */}
        <Link href={AppRoutes.HOME}>
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="logo"
              width={35}
              height={35}
              className=""
            />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        <div className="mx-10 flex-1">
          <SearchInput />
        </div>

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Войти
          </Button>
          <div>
            <Button className="group relative">
              <strong>520₽</strong>
              <span className="h-full w-[1px] bg-white/30 mx-3" />
              <span className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                <ShoppingCart strokeWidth={2} className="h-4 w-4 relative" />
                <strong>3</strong>
              </span>
              <ArrowRight
                size={20}
                className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
              />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
