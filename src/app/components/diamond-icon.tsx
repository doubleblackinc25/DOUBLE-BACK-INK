import { cn } from "@/lib/utils";

type DiamondIconProps = {
  className?: string;
};

export function DiamondIcon({ className }: DiamondIconProps) {
  return (
    <svg
      width="1.6em"
      height="0.8em"
      viewBox="0 0 28 14"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block align-middle text-accent", className)}
      aria-hidden="true"
    >
      <path d="M7 0L14 7L7 14L0 7L7 0Z" />
      <path d="M21 0L28 7L21 14L14 7L21 0Z" />
    </svg>
  );
}
