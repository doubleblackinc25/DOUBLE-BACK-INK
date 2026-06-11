
"use client";

import Link from "next/link";
import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <div className="ml-auto flex items-center gap-4">
          <Logo />
          <nav className="flex items-center space-x-2 border-l border-border pl-4">
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart" aria-label="Shopping Cart">
                <ShoppingCart className="h-5 w-5 text-accent" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-lg">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
