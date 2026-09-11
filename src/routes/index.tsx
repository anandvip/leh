import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseRow } from "@/components/expense-row";
import { computeReport } from "@/lib/ledger";
import { formatINRFromPaise, formatINRSigned } from "@/lib/money";
import { useJourneyStore } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const journey = useJourneyStore((s) => s.journey);
  const openAddExpense = useJourneyStore((s) => s.openAddExpense);
  const openEditExpense = useJourneyStore((s) => s.openEditExpense);
  const loadSample = useJourneyStore((s) => s.loadSample);
  const report = computeReport(journey);
  const recent = journey.expenses.slice(0, 5);

  if (journey.people.length === 0) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="font-display text-3xl font-medium tracking-tight">A quiet ledger for the road.</h1>
          <p className="mt-2 max-w-md text-ink-muted leading-relaxed">
            Name the journey, add the people in the car, log fuel and food as you go. When it ends, share a
            report anyone can read — including in Signal.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button asChild className="h-12">
            <Link to="/settings">
              Add people
              <ArrowRight />
            </Link>
          </Button>
          <Button variant="outline" className="h-12" onClick={loadSample}>
            Load a sample trip
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
        <p className="text-xs font-medium tracking-[0.18em] text-ink-subtle uppercase">
          {journey.status === "completed" ? "Completed journey" : "Open journey"}
        </p>
        <h1 className="mt-1 font-display text-3xl font-medium tracking-tight">{journey.name}</h1>
        <p className="mt-1 text-sm text-ink-muted">
          {journey.people.length} people
          {journey.clubs.length ? ` · ${journey.clubs.length} clubbed` : ""} · {journey.expenses.length}{" "}
          expenses
        </p>
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div>
            <p className="text-xs text-ink-subtle uppercase tracking-wide">Total</p>
            <p className="mt-1 font-display text-xl font-medium tabular-nums">
              {formatINRFromPaise(report.totalPaise)}
            </p>
          </div>
          <div>
            <p className="text-xs text-ink-subtle uppercase tracking-wide">Group</p>
            <p className="mt-1 font-display text-xl font-medium tabular-nums">
              {formatINRFromPaise(report.groupPaise)}
            </p>
          </div>
          <div>
            <p className="text-xs text-ink-subtle uppercase tracking-wide">Personal</p>
            <p className="mt-1 font-display text-xl font-medium tabular-nums">
              {formatINRFromPaise(report.personalPaise)}
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Who is ahead</CardTitle>
          <Link to="/report" className="text-sm font-medium text-accent">
            Full report
          </Link>
        </CardHeader>
        <CardContent className="space-y-2">
          {report.heads.length === 0 ? (
            <p className="text-sm text-ink-muted">No one to split with yet.</p>
          ) : (
            report.heads.map((h) => (
              <div key={h.id} className="flex items-center justify-between gap-3 text-sm">
                <div className="min-w-0">
                  <p className="truncate font-medium">{h.label}</p>
                  {h.kind === "club" ? (
                    <p className="truncate text-xs text-ink-muted">{h.subtitle}</p>
                  ) : null}
                </div>
                <span
                  className={
                    h.netPaise === 0
                      ? "tabular-nums text-ink-muted"
                      : h.netPaise > 0
                        ? "tabular-nums text-credit"
                        : "tabular-nums text-debit"
                  }
                >
                  {h.netPaise === 0 ? "Even" : formatINRSigned(h.netPaise)}
                </span>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Recent</CardTitle>
          <Link to="/expenses" className="text-sm font-medium text-accent">
            All
          </Link>
        </CardHeader>
        <CardContent className="-mx-2">
          {recent.length === 0 ? (
            <div className="px-2 py-4 text-center">
              <p className="text-sm text-ink-muted">Nothing logged yet.</p>
              <Button className="mt-3" onClick={openAddExpense}>
                Add the first expense
              </Button>
            </div>
          ) : (
            recent.map((e) => (
              <ExpenseRow
                key={e.id}
                expense={e}
                people={journey.people}
                onClick={() => openEditExpense(e.id)}
              />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
