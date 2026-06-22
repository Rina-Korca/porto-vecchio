import { cn } from "@/lib/utils"

type BrandWordmarkProps = {
  className?: string
  compact?: boolean
}

export function BrandWordmark({ className, compact = false }: BrandWordmarkProps) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span className="font-serif text-[1.35rem] tracking-[0.08em]">
        Porto Vecchio
      </span>
      {!compact ? (
        <span className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.22em]">
          Ristorante & Pizzeria
        </span>
      ) : null}
    </span>
  )
}
