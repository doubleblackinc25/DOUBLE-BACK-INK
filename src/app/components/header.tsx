import Link from "next/link";
import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Wand2 } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <Logo />
        <nav className="ml-auto flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/copy-tool" aria-label="AI Copy Tool">
              <Wand2 className="h-5 w-5 text-accent" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5 text-accent" />
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
