import type { Journey } from "./types";

export function createEmptyJourney(): Journey {
  return {
    id: crypto.randomUUID(),
    name: "Untitled journey",
    status: "open",
    startedAt: new Date().toISOString(),
    completedAt: null,
    people: [],
    clubs: [],
    expenses: [],
    customTypes: [],
  };
}

export function createSampleJourney(): Journey {
  const arjun = "p_arjun";
  const rahul = "p_rahul";
  const priya = "p_priya";
  const amit = "p_amit";
  const neha = "p_neha";
  const all = [arjun, rahul, priya, amit, neha];

  return {
    id: crypto.randomUUID(),
    name: "Western Ghats drive",
    status: "open",
    startedAt: "2026-09-06T08:00:00.000Z",
    completedAt: null,
    people: [
      { id: arjun, name: "Arjun", relation: "self" },
      { id: rahul, name: "Rahul", relation: "brother" },
      { id: priya, name: "Priya", relation: "sister" },
      { id: amit, name: "Amit", relation: "friend" },
      { id: neha, name: "Neha", relation: "friend" },
    ],
    clubs: [{ id: "c_sib", name: "Brother & Sister", memberIds: [rahul, priya] }],
    customTypes: [],
    expenses: [
      {
        id: "e1",
        kind: "group",
        amount: 3500,
        type: "Fuel",
        place: "Panvel",
        note: "Full tank before the ghat",
        paidBy: arjun,
        splitAmong: all,
        at: "2026-09-06",
      },
      {
        id: "e2",
        kind: "group",
        amount: 220,
        type: "Tea",
        place: "Lonavala",
        note: "Irani cafe stop",
        paidBy: rahul,
        splitAmong: all,
        at: "2026-09-06",
      },
      {
        id: "e3",
        kind: "group",
        amount: 2480,
        type: "Food",
        place: "Lonavala",
        note: "Lunch for the car",
        paidBy: amit,
        splitAmong: all,
        at: "2026-09-06",
      },
      {
        id: "e4",
        kind: "personal",
        amount: 90,
        type: "Coffee",
        place: "Lonavala",
        note: "Extra filter coffee",
        paidBy: priya,
        splitAmong: [priya],
        at: "2026-09-06",
      },
      {
        id: "e5",
        kind: "group",
        amount: 180,
        type: "Toll",
        place: "Khopoli",
        note: "",
        paidBy: neha,
        splitAmong: all,
        at: "2026-09-06",
      },
      {
        id: "e6",
        kind: "group",
        amount: 6400,
        type: "Stay",
        place: "Panchgani",
        note: "Two rooms, one night",
        paidBy: arjun,
        splitAmong: all,
        at: "2026-09-06",
      },
      {
        id: "e7",
        kind: "group",
        amount: 1860,
        type: "Food",
        place: "Mahabaleshwar",
        note: "Amit sat this one out",
        paidBy: neha,
        splitAmong: [arjun, rahul, priya, neha],
        at: "2026-09-07",
      },
      {
        id: "e8",
        kind: "personal",
        amount: 40,
        type: "Parking",
        place: "Panchgani",
        note: "",
        paidBy: amit,
        splitAmong: [amit],
        at: "2026-09-07",
      },
      {
        id: "e9",
        kind: "group",
        amount: 2800,
        type: "Fuel",
        place: "Satara",
        note: "Return tank",
        paidBy: rahul,
        splitAmong: all,
        at: "2026-09-08",
      },
      {
        id: "e10",
        kind: "group",
        amount: 320,
        type: "Tea",
        place: "Khandala",
        note: "Last cutting chai",
        paidBy: priya,
        splitAmong: all,
        at: "2026-09-08",
      },
    ],
  };
}
