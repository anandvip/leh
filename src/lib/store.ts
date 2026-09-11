import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { nid } from "./utils";
import { createEmptyJourney, createSampleJourney } from "./sample";
import type { Expense, ExpenseDraft, Journey, Person, Relation } from "./types";
import { todayISODate } from "./money";

type SheetState = {
  open: boolean;
  editingId: string | null;
};

type JourneyState = {
  journey: Journey;
  pastJourneys: Journey[];
  sheet: SheetState;
  addPerson: (name: string, relation: Relation) => string | null;
  updatePerson: (id: string, patch: Partial<Pick<Person, "name" | "relation">>) => void;
  removePerson: (id: string) => string | null;
  addClub: (name: string, memberIds: string[]) => string | null;
  removeClub: (id: string) => void;
  setJourneyName: (name: string) => void;
  addCustomType: (type: string) => void;
  removeCustomType: (type: string) => void;
  addExpense: (draft: ExpenseDraft) => void;
  updateExpense: (id: string, draft: ExpenseDraft) => void;
  removeExpense: (id: string) => void;
  completeJourney: () => void;
  reopenJourney: () => void;
  startNewJourney: () => void;
  openPastJourney: (id: string) => void;
  loadSample: () => void;
  openAddExpense: () => void;
  openEditExpense: (id: string) => void;
  closeSheet: () => void;
};

function archiveIfNeeded(journey: Journey, past: Journey[]): Journey[] {
  const hasLife =
    journey.people.length > 0 || journey.expenses.length > 0 || journey.name !== "Untitled journey";
  if (!hasLife) return past;
  return [journey, ...past.filter((j) => j.id !== journey.id)].slice(0, 20);
}

function personIsUsed(journey: Journey, id: string): boolean {
  return journey.expenses.some(
    (e) => e.paidBy === id || e.splitAmong.includes(id),
  );
}

export const useJourneyStore = create<JourneyState>()(
  persist(
    (set, get) => ({
      journey: createEmptyJourney(),
      pastJourneys: [],
      sheet: { open: false, editingId: null },

      addPerson: (name, relation) => {
        const trimmed = name.trim();
        if (!trimmed) return "Enter a name.";
        const exists = get().journey.people.some(
          (p) => p.name.toLowerCase() === trimmed.toLowerCase(),
        );
        if (exists) return "That name is already in this journey.";
        const person: Person = { id: nid("p"), name: trimmed, relation };
        set((s) => ({ journey: { ...s.journey, people: [...s.journey.people, person] } }));
        return null;
      },

      updatePerson: (id, patch) => {
        set((s) => ({
          journey: {
            ...s.journey,
            people: s.journey.people.map((p) =>
              p.id === id
                ? {
                    ...p,
                    name: patch.name?.trim() || p.name,
                    relation: patch.relation ?? p.relation,
                  }
                : p,
            ),
          },
        }));
      },

      removePerson: (id) => {
        const { journey } = get();
        if (personIsUsed(journey, id)) {
          return "This person is on existing expenses. Edit or delete those first.";
        }
        set((s) => ({
          journey: {
            ...s.journey,
            people: s.journey.people.filter((p) => p.id !== id),
            clubs: s.journey.clubs
              .map((c) => ({ ...c, memberIds: c.memberIds.filter((m) => m !== id) }))
              .filter((c) => c.memberIds.length >= 2),
          },
        }));
        return null;
      },

      addClub: (name, memberIds) => {
        const unique = [...new Set(memberIds)];
        if (unique.length < 2) return "Pick at least two people to club.";
        const taken = get().journey.clubs.flatMap((c) => c.memberIds);
        if (unique.some((id) => taken.includes(id))) {
          return "A person can only belong to one club.";
        }
        const label = name.trim() || defaultClubName(get().journey.people, unique);
        set((s) => ({
          journey: {
            ...s.journey,
            clubs: [...s.journey.clubs, { id: nid("c"), name: label, memberIds: unique }],
          },
        }));
        return null;
      },

      removeClub: (id) => {
        set((s) => ({
          journey: { ...s.journey, clubs: s.journey.clubs.filter((c) => c.id !== id) },
        }));
      },

      setJourneyName: (name) => {
        const trimmed = name.trim() || "Untitled journey";
        set((s) => ({ journey: { ...s.journey, name: trimmed } }));
      },

      addCustomType: (type) => {
        const trimmed = type.trim();
        if (!trimmed) return;
        set((s) => {
          if (s.journey.customTypes.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
            return s;
          }
          return { journey: { ...s.journey, customTypes: [...s.journey.customTypes, trimmed] } };
        });
      },

      removeCustomType: (type) => {
        set((s) => ({
          journey: {
            ...s.journey,
            customTypes: s.journey.customTypes.filter((t) => t !== type),
          },
        }));
      },

      addExpense: (draft) => {
        const expense: Expense = { id: nid("e"), ...normalizeDraft(draft) };
        set((s) => ({
          journey: { ...s.journey, expenses: [expense, ...s.journey.expenses] },
          sheet: { open: false, editingId: null },
        }));
      },

      updateExpense: (id, draft) => {
        const next = normalizeDraft(draft);
        set((s) => ({
          journey: {
            ...s.journey,
            expenses: s.journey.expenses.map((e) => (e.id === id ? { ...e, ...next } : e)),
          },
          sheet: { open: false, editingId: null },
        }));
      },

      removeExpense: (id) => {
        set((s) => ({
          journey: { ...s.journey, expenses: s.journey.expenses.filter((e) => e.id !== id) },
          sheet: { open: false, editingId: null },
        }));
      },

      completeJourney: () => {
        set((s) => ({
          journey: {
            ...s.journey,
            status: "completed",
            completedAt: new Date().toISOString(),
          },
        }));
      },

      reopenJourney: () => {
        set((s) => ({
          journey: { ...s.journey, status: "open", completedAt: null },
        }));
      },

      startNewJourney: () => {
        set((s) => ({
          pastJourneys: archiveIfNeeded(s.journey, s.pastJourneys),
          journey: createEmptyJourney(),
        }));
      },

      openPastJourney: (id) => {
        set((s) => {
          const found = s.pastJourneys.find((j) => j.id === id);
          if (!found) return s;
          const rest = s.pastJourneys.filter((j) => j.id !== id);
          return {
            pastJourneys: archiveIfNeeded(s.journey, rest),
            journey: found,
          };
        });
      },

      loadSample: () => {
        set((s) => ({
          pastJourneys: archiveIfNeeded(s.journey, s.pastJourneys),
          journey: createSampleJourney(),
        }));
      },

      openAddExpense: () => set({ sheet: { open: true, editingId: null } }),
      openEditExpense: (id) => set({ sheet: { open: true, editingId: id } }),
      closeSheet: () => set({ sheet: { open: false, editingId: null } }),
    }),
    {
      name: "safar-ledger",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ journey: s.journey, pastJourneys: s.pastJourneys }),
    },
  ),
);

function normalizeDraft(draft: ExpenseDraft): ExpenseDraft {
  const amount = Math.round(draft.amount * 100) / 100;
  const type = draft.type.trim() || "Other";
  const place = draft.place.trim();
  const at = draft.at || todayISODate();
  if (draft.kind === "personal") {
    return {
      ...draft,
      amount,
      type,
      place,
      at,
      splitAmong: [draft.paidBy],
    };
  }
  const splitAmong = draft.splitAmong.length ? draft.splitAmong : [draft.paidBy];
  return { ...draft, amount, type, place, at, splitAmong };
}

export function defaultClubName(people: Person[], memberIds: string[]): string {
  const members = people.filter((p) => memberIds.includes(p.id));
  const rels = new Set(members.map((m) => m.relation));
  const siblingish =
    members.length >= 2 &&
    [...rels].every((r) => r === "brother" || r === "sister") &&
    (rels.has("brother") || rels.has("sister"));
  if (siblingish) return "Brother & Sister";
  return members.map((m) => m.name).join(" & ");
}

