import { useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PersonChips } from "@/components/person-chips";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { journeyTypes } from "@/lib/ledger";
import { parseAmount, todayISODate } from "@/lib/money";
import { useJourneyStore } from "@/lib/store";
import type { ExpenseDraft, ExpenseKind } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ExpenseSheet() {
  const journey = useJourneyStore((s) => s.journey);
  const sheet = useJourneyStore((s) => s.sheet);
  const closeSheet = useJourneyStore((s) => s.closeSheet);
  const addExpense = useJourneyStore((s) => s.addExpense);
  const updateExpense = useJourneyStore((s) => s.updateExpense);
  const removeExpense = useJourneyStore((s) => s.removeExpense);
  const addCustomType = useJourneyStore((s) => s.addCustomType);

  const editing = journey.expenses.find((e) => e.id === sheet.editingId) ?? null;
  const types = useMemo(() => journeyTypes(journey), [journey]);

  const [kind, setKind] = useState<ExpenseKind>("group");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Food");
  const [customType, setCustomType] = useState("");
  const [place, setPlace] = useState("");
  const [note, setNote] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [splitAmong, setSplitAmong] = useState<string[]>([]);
  const [at, setAt] = useState(todayISODate());
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (!sheet.open) return;
    if (editing) {
      setKind(editing.kind);
      setAmount(String(editing.amount));
      setType(editing.type);
      setCustomType("");
      setPlace(editing.place);
      setNote(editing.note);
      setPaidBy(editing.paidBy);
      setSplitAmong(editing.splitAmong);
      setAt(editing.at);
      return;
    }
    setKind("group");
    setAmount("");
    setType("Food");
    setCustomType("");
    setPlace("");
    setNote("");
    setPaidBy(journey.people[0]?.id ?? "");
    setSplitAmong(journey.people.map((p) => p.id));
    setAt(todayISODate());
  }, [sheet.open, editing, journey.people]);

  const places = useMemo(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const e of journey.expenses) {
      const p = e.place.trim();
      if (p && !seen.has(p.toLowerCase())) {
        seen.add(p.toLowerCase());
        out.push(p);
      }
    }
    return out.slice(0, 8);
  }, [journey.expenses]);

  function toggleSplit(id: string) {
    setSplitAmong((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function save() {
    const parsed = parseAmount(amount);
    if (parsed === null || parsed <= 0) {
      toast.error("Enter an amount greater than zero.");
      return;
    }
    if (!paidBy) {
      toast.error("Choose who paid.");
      return;
    }
    const resolvedType = type === "__custom" ? customType.trim() : type.trim();
    if (!resolvedType) {
      toast.error("Pick or type an expense type.");
      return;
    }
    if (kind === "group" && splitAmong.length === 0) {
      toast.error("Pick who this split covers.");
      return;
    }
    if (type === "__custom") addCustomType(resolvedType);

    const draft: ExpenseDraft = {
      kind,
      amount: parsed,
      type: resolvedType,
      place,
      note: note.trim(),
      paidBy,
      splitAmong: kind === "personal" ? [paidBy] : splitAmong,
      at,
    };
    if (editing) updateExpense(editing.id, draft);
    else addExpense(draft);
    toast.success(editing ? "Expense updated" : "Expense added");
  }

  return (
    <>
      <Drawer open={sheet.open} onOpenChange={(o) => (!o ? closeSheet() : undefined)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{editing ? "Edit expense" : "Add expense"}</DrawerTitle>
            <DrawerDescription>
              {kind === "personal"
                ? "Logged against one person. Not split."
                : "Split equally among the people you pick."}
            </DrawerDescription>
          </DrawerHeader>

          {journey.people.length === 0 ? (
            <div className="px-5 pb-8 text-sm text-ink-muted">
              Add people in Settings before logging expenses.
            </div>
          ) : (
            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4">
              <div className="mb-5 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
                <Label htmlFor="amount" className="text-ink-muted">
                  Amount
                </Label>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-display text-3xl text-ink-muted">₹</span>
                  <input
                    id="amount"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full bg-transparent font-display text-4xl font-medium tabular-nums tracking-tight text-ink outline-none placeholder:text-ink-subtle"
                  />
                </div>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-2 rounded-lg bg-surface-2 p-1">
                {(["group", "personal"] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setKind(k)}
                    className={cn(
                      "h-10 rounded-md text-sm font-medium capitalize transition-colors duration-150",
                      kind === k ? "bg-surface text-ink shadow-[var(--shadow-border)]" : "text-ink-muted",
                    )}
                  >
                    {k === "group" ? "Group split" : "Personal"}
                  </button>
                ))}
              </div>

              <Field label="Type">
                <div className="flex flex-wrap gap-2">
                  {types.map((t) => (
                    <Chip key={t} on={type === t} onClick={() => setType(t)}>
                      {t}
                    </Chip>
                  ))}
                  <Chip on={type === "__custom"} onClick={() => setType("__custom")}>
                    Custom
                  </Chip>
                </div>
                {type === "__custom" ? (
                  <Input
                    className="mt-2"
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value)}
                    placeholder="e.g. Snacks, Temple, Ferry"
                  />
                ) : null}
              </Field>

              <Field label="Place">
                <Input
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="Lonavala, Panvel, hotel name…"
                />
                {places.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {places.map((p) => (
                      <Chip key={p} on={place === p} onClick={() => setPlace(p)}>
                        {p}
                      </Chip>
                    ))}
                  </div>
                ) : null}
              </Field>

              <Field label={kind === "personal" ? "Whose expense" : "Who paid"}>
                <PersonChips
                  people={journey.people}
                  selected={paidBy ? [paidBy] : []}
                  multiple={false}
                  onToggle={(id) => {
                    setPaidBy(id);
                    if (kind === "personal") setSplitAmong([id]);
                  }}
                />
              </Field>

              {kind === "group" ? (
                <Field label="Split equally among">
                  <PersonChips
                    people={journey.people}
                    selected={splitAmong}
                    onToggle={toggleSplit}
                  />
                </Field>
              ) : null}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Date">
                  <Input type="date" value={at} onChange={(e) => setAt(e.target.value)} />
                </Field>
                <Field label="Note (optional)">
                  <Textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    placeholder="Anything to remember"
                  />
                </Field>
              </div>
            </div>
          )}

          {journey.people.length > 0 ? (
            <DrawerFooter className="border-t border-line bg-bg">
              <Button onClick={save} className="h-12">
                {editing ? "Save changes" : "Add expense"}
              </Button>
              {editing ? (
                <Button variant="ghost" className="text-danger" onClick={() => setConfirmDelete(true)}>
                  Delete expense
                </Button>
              ) : null}
            </DrawerFooter>
          ) : null}
        </DrawerContent>
      </Drawer>

      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Delete this expense?"
        description="It will be removed from the journey and the report will update."
        confirmLabel="Delete"
        destructive
        onConfirm={() => {
          if (editing) {
            removeExpense(editing.id);
            toast.success("Expense deleted");
          }
        }}
      />
    </>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-4">
      <p className="mb-2 text-sm font-medium text-ink">{label}</p>
      {children}
    </div>
  );
}

function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-11 items-center rounded-full border px-3 text-sm font-medium transition-colors duration-150",
        on ? "border-accent bg-accent text-accent-fg" : "border-line bg-surface text-ink hover:bg-surface-2",
      )}
    >
      {children}
    </button>
  );
}
