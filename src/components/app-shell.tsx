import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Home, Plus, Settings, Wallet } from "lucide-react";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { ExpenseSheet } from "@/components/expense-sheet";
import { useJourneyStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/expenses", label: "Log", icon: Wallet },
  { to: "/report", label: "Report", icon: BookOpen },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const journeyName = useJourneyStore((s) => s.journey.name);
  const openAddExpense = useJourneyStore((s) => s.openAddExpense);
  const peopleCount = useJourneyStore((s) => s.journey.people.length);
  const showFab = pathname === "/" || pathname === "/expenses";

  return (
    <div className="min-h-dvh bg-bg text-ink">
      <header className="no-print sticky top-0 z-30 border-b border-line/80 bg-bg/90 pt-[env(safe-area-inset-top)] backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-full max-w-lg items-center justify-between px-4">
          <div className="min-w-0">
            <p className="text-xs font-medium tracking-[0.18em] text-ink-subtle uppercase">Safar</p>
            <p className="truncate text-sm font-medium">{journeyName}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg px-4 pt-5 pb-28">{children}</main>

      {showFab && peopleCount > 0 ? (
        <div className="no-print pointer-events-none fixed inset-x-0 bottom-24 z-40 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]">
          <Button
            className="pointer-events-auto h-12 rounded-full px-5 shadow-[var(--shadow-border)]"
            onClick={openAddExpense}
          >
            <Plus />
            Add expense
          </Button>
        </div>
      ) : null}

      <nav className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm">
        <div className="mx-auto grid w-full max-w-lg grid-cols-4">
          {NAV.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors duration-150",
                  active ? "text-accent" : "text-ink-muted",
                )}
              >
                <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <ExpenseSheet />
      <Toaster position="top-center" richColors theme="light" />
    </div>
  );
}
