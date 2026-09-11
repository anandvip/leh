import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ExpenseRow } from "@/components/expense-row";
import { useJourneyStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/expenses")({ component: ExpensesPage });

type Filter = "all" | "group" | "personal";

function ExpensesPage() {
  const journey = useJourneyStore((s) => s.journey);
  const openEditExpense = useJourneyStore((s) => s.openEditExpense);
  const [filter, setFilter] = useState<Filter>("all");

  const items = useMemo(() => {
    const list =
      filter === "all" ? journey.expenses : journey.expenses.filter((e) => e.kind === filter);
    return [...list].sort((a, b) => b.at.localeCompare(a.at) || b.id.localeCompare(a.id));
  }, [journey.expenses, filter]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight">Expense log</h1>
        <p className="mt-1 text-sm text-ink-muted">Tap a row to edit. Group splits and personal spends live together.</p>
      </div>

      <div className="grid grid-cols-3 gap-1 rounded-lg bg-surface-2 p-1">
        {(["all", "group", "personal"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "h-10 rounded-md text-sm font-medium capitalize transition-colors duration-150",
              filter === f ? "bg-surface text-ink shadow-[var(--shadow-border)]" : "text-ink-muted",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-surface py-2 shadow-[var(--shadow-border)]">
        {items.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-ink-muted">
            {journey.people.length === 0
              ? "Add people in Settings, then log the first stop."
              : "No expenses in this filter."}
          </p>
        ) : (
          items.map((e) => (
            <ExpenseRow
              key={e.id}
              expense={e}
              people={journey.people}
              onClick={() => openEditExpense(e.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
