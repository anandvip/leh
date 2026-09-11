import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Check, Copy, Printer, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { buildShareText, computeReport, type Head } from "@/lib/ledger";
import { formatDay, formatDayLong, formatINRFromPaise, formatINRSigned } from "@/lib/money";
import { useJourneyStore } from "@/lib/store";
import { ExpenseRow } from "@/components/expense-row";
import { cn } from "@/lib/utils";

export function ReportView({ compact = false }: { compact?: boolean }) {
  const journey = useJourneyStore((s) => s.journey);
  const openEditExpense = useJourneyStore((s) => s.openEditExpense);
  const report = computeReport(journey);
  const [textOpen, setTextOpen] = useState(false);
  const shareText = buildShareText(journey, report);

  const range =
    report.dateStart && report.dateEnd
      ? report.dateStart === report.dateEnd
        ? formatDayLong(report.dateStart)
        : `${formatDay(report.dateStart)} – ${formatDayLong(report.dateEnd)}`
      : "No expenses yet";

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: `${journey.name} · Safar`, text: shareText });
        return;
      }
      setTextOpen(true);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setTextOpen(true);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(shareText);
      toast.success("Copied — paste into Signal");
    } catch {
      setTextOpen(true);
    }
  }

  return (
    <div className="space-y-5">
      <section className="print-sheet rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
        <p className="text-xs font-medium tracking-[0.18em] text-ink-subtle uppercase">Safar report</p>
        <h2 className="mt-1 font-display text-3xl font-medium tracking-tight text-ink">{journey.name}</h2>
        <p className="mt-1 text-sm text-ink-muted">
          {range} · {journey.people.length} people · {journey.status === "completed" ? "Completed" : "Open"}
        </p>
        <div className="mt-5 grid grid-cols-3 gap-3">
          <Stat label="Total" value={formatINRFromPaise(report.totalPaise)} />
          <Stat label="Group" value={formatINRFromPaise(report.groupPaise)} />
          <Stat label="Personal" value={formatINRFromPaise(report.personalPaise)} />
        </div>
      </section>

      {!compact ? (
        <div className="no-print flex flex-wrap gap-2">
          <Button onClick={share} className="flex-1 sm:flex-none">
            <Share2 />
            Share
          </Button>
          <Button variant="outline" onClick={copy} className="flex-1 sm:flex-none">
            <Copy />
            Copy for Signal
          </Button>
          <Button variant="outline" onClick={() => window.print()} className="flex-1 sm:flex-none">
            <Printer />
            Print
          </Button>
        </div>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Heads</CardTitle>
          <p className="text-sm text-ink-muted">
            Relatives you clubbed appear as one line. Everyone else is listed on their own.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {report.heads.length === 0 ? (
            <p className="text-sm text-ink-muted">Add people in Settings.</p>
          ) : (
            report.heads.map((head) => <HeadRow key={head.id} head={head} />)
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Settle these</CardTitle>
        </CardHeader>
        <CardContent>
          {report.transfers.length === 0 ? (
            <p className="flex items-center gap-2 text-sm text-ink-muted">
              <Check className="size-4 text-credit" />
              {report.itemCount === 0 ? "No group expenses to settle yet." : "Books are even."}
            </p>
          ) : (
            <ul className="space-y-3">
              {report.transfers.map((t) => (
                <li
                  key={`${t.fromId}-${t.toId}`}
                  className="flex items-center justify-between gap-3 rounded-lg bg-surface-2 px-3 py-3"
                >
                  <div className="flex min-w-0 items-center gap-2 text-sm">
                    <span className="font-medium">{t.fromLabel}</span>
                    <ArrowRight className="size-4 shrink-0 text-ink-subtle" />
                    <span className="font-medium">{t.toLabel}</span>
                  </div>
                  <span className="shrink-0 font-medium tabular-nums">
                    {formatINRFromPaise(t.paise)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {!compact ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Breakdown title="By type" rows={report.byType} />
            <Breakdown title="By place" rows={report.byPlace} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Line items</CardTitle>
              <p className="text-sm text-ink-muted">Tap any row to edit. The report updates immediately.</p>
            </CardHeader>
            <CardContent className="-mx-2">
              {journey.expenses.length === 0 ? (
                <p className="px-2 text-sm text-ink-muted">No expenses recorded.</p>
              ) : (
                [...journey.expenses]
                  .sort((a, b) => a.at.localeCompare(b.at))
                  .map((e) => (
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
        </>
      ) : null}

      <Drawer open={textOpen} onOpenChange={setTextOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Share this text</DrawerTitle>
            <DrawerDescription>
              Paste into Signal, WhatsApp, or anywhere else. On a phone, Share also opens the system sheet.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-5 pb-2">
            <Textarea
              readOnly
              value={shareText}
              className="h-72 font-mono text-xs leading-relaxed"
              onFocus={(e) => e.currentTarget.select()}
            />
          </div>
          <DrawerFooter>
            <Button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(shareText);
                  toast.success("Copied — paste into Signal");
                } catch {
                  toast.message("Select the text above, then copy.");
                }
              }}
            >
              Copy text
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium tracking-wide text-ink-subtle uppercase">{label}</p>
      <p className="mt-1 font-display text-xl font-medium tabular-nums tracking-tight">{value}</p>
    </div>
  );
}

function HeadRow({ head }: { head: Head }) {
  const netPositive = head.netPaise > 0;
  const even = head.netPaise === 0;
  return (
    <div className="rounded-lg bg-surface-2 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium">{head.label}</p>
          <p className="text-sm text-ink-muted">{head.subtitle}</p>
        </div>
        <Badge variant={even ? "secondary" : netPositive ? "credit" : "debit"}>
          {even
            ? "Settled"
            : netPositive
              ? `Owed ${formatINRSigned(head.netPaise)}`
              : `Owes ${formatINRSigned(head.netPaise)}`}
        </Badge>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-ink-muted">
        <span>
          Paid <span className="block font-medium tabular-nums text-ink">{formatINRFromPaise(head.paidPaise)}</span>
        </span>
        <span>
          Share <span className="block font-medium tabular-nums text-ink">{formatINRFromPaise(head.sharePaise)}</span>
        </span>
        <span>
          Personal{" "}
          <span className="block font-medium tabular-nums text-ink">
            {formatINRFromPaise(head.personalPaise)}
          </span>
        </span>
      </div>
    </div>
  );
}

function Breakdown({ title, rows }: { title: string; rows: { key: string; paise: number }[] }) {
  const max = rows[0]?.paise ?? 1;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {rows.length === 0 ? (
          <p className="text-sm text-ink-muted">Nothing yet.</p>
        ) : (
          rows.map((row) => (
            <div key={row.key}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span>{row.key}</span>
                <span className="tabular-nums text-ink-muted">{formatINRFromPaise(row.paise)}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${Math.max(6, (row.paise / max) * 100)}%` }}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
