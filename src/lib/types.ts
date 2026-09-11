export const RELATIONS = [
  "self",
  "brother",
  "sister",
  "spouse",
  "parent",
  "child",
  "friend",
  "other",
] as const;

export type Relation = (typeof RELATIONS)[number];

export const RELATION_LABEL: Record<Relation, string> = {
  self: "Self",
  brother: "Brother",
  sister: "Sister",
  spouse: "Spouse",
  parent: "Parent",
  child: "Child",
  friend: "Friend",
  other: "Other",
};

export const PRESET_TYPES = [
  "Fuel",
  "Food",
  "Tea",
  "Coffee",
  "Stay",
  "Toll",
  "Parking",
] as const;

export type Person = {
  id: string;
  name: string;
  relation: Relation;
};

export type Club = {
  id: string;
  name: string;
  memberIds: string[];
};

export type ExpenseKind = "group" | "personal";

export type Expense = {
  id: string;
  kind: ExpenseKind;
  amount: number;
  type: string;
  place: string;
  note: string;
  paidBy: string;
  splitAmong: string[];
  at: string;
};

export type JourneyStatus = "open" | "completed";

export type Journey = {
  id: string;
  name: string;
  status: JourneyStatus;
  startedAt: string;
  completedAt: string | null;
  people: Person[];
  clubs: Club[];
  expenses: Expense[];
  customTypes: string[];
};

export type ExpenseDraft = {
  kind: ExpenseKind;
  amount: number;
  type: string;
  place: string;
  note: string;
  paidBy: string;
  splitAmong: string[];
  at: string;
};
