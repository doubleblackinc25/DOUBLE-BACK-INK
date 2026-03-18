import { cn } from "@/lib/utils";

type DiamondIconProps = {
  className?: string;
};

export function DiamondIcon({ className }: DiamondIconProps) {
  return <span className={cn("font-semibold text-accent", className)}>◆◆</span>;
}
