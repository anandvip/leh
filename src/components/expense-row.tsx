import { Badge } from "@/components/ui/badge";
import { formatDay, formatINRFromPaise, rupeesToPaise } from "@/lib/money";
import type { Expense, Person } from "@/lib/types";

export function ExpenseRow({
  expense,
  people,
  onClick,
}: {
  expense: Expense;
  people: Person[];
  onClick: () => void;
}) {
  const payer = people.find((p) => p.id === expense.paidBy)?.name ?? "Unknown";
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-start justify-between gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-150 hover:bg-surface-2"
    >
      <div className="min-w-0">
        <p className="truncate font-medium text-ink">
          {expense.place.trim() || "No place"}
          <span className="text-ink-muted"> · {expense.type}</span>
        </p>
        <p className="mt-0.5 text-sm text-ink-muted">
          {formatDay(expense.at)} · {payer}
          {expense.kind === "group" ? ` · split ${expense.splitAmong.length}` : null}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-medium tabular-nums text-ink">
          {formatINRFromPaise(rupeesToPaise(expense.amount))}
        </p>
        {expense.kind === "personal" ? (
          <Badge variant="secondary" className="mt-1">
            Personal
          </Badge>
        ) : null}
      </div>
    </button>
  );
}
