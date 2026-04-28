import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { statusLabel, type ReservationStatus } from "@/lib/reservations"

export function StatusBadge({ status }: { status: ReservationStatus }) {
  return (
    <Badge
      className={cn(
        "rounded-md border px-2 py-1 text-xs font-medium",
        status === "PENDING" &&
          "border-gold/50 bg-gold/10 text-carbon hover:bg-gold/10",
        status === "CONFIRMED" &&
          "border-emerald-600/30 bg-emerald-50 text-emerald-700 hover:bg-emerald-50",
        status === "REJECTED" &&
          "border-strawberry/30 bg-strawberry/10 text-garnet hover:bg-strawberry/10",
      )}
    >
      {statusLabel(status)}
    </Badge>
  )
}
