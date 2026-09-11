import { RELATION_LABEL, type Expense, type Journey, type Person } from "./types";
import { formatDay, formatINRFromPaise, rupeesToPaise, splitEvenPaise } from "./money";

export type Head = {
  id: string;
  label: string;
  subtitle: string;
  kind: "club" | "person";
  memberIds: string[];
  paidPaise: number;
  sharePaise: number;
  personalPaise: number;
  netPaise: number;
};

export type Transfer = {
  fromId: string;
  fromLabel: string;
  toId: string;
  toLabel: string;
  paise: number;
};

export type TypedTotal = { key: string; paise: number };

export type Report = {
  totalPaise: number;
  groupPaise: number;
  personalPaise: number;
  heads: Head[];
  transfers: Transfer[];
  byType: TypedTotal[];
  byPlace: TypedTotal[];
  itemCount: number;
  dateStart: string | null;
  dateEnd: string | null;
};

function clubIdFor(personId: string, journey: Journey): string | null {
  const club = journey.clubs.find((c) => c.memberIds.includes(personId));
  return club ? club.id : null;
}

function ensureHead(heads: Map<string, Head>, person: Person, journey: Journey): Head {
  const clubId = clubIdFor(person.id, journey);
  if (clubId) {
    const id = `club:${clubId}`;
    const existing = heads.get(id);
    if (existing) return existing;
    const club = journey.clubs.find((c) => c.id === clubId)!;
    const members = journey.people.filter((p) => club.memberIds.includes(p.id));
    const head: Head = {
      id,
      label: club.name,
      subtitle: members.map((m) => m.name).join(", "),
      kind: "club",
      memberIds: [...club.memberIds],
      paidPaise: 0,
      sharePaise: 0,
      personalPaise: 0,
      netPaise: 0,
    };
    heads.set(id, head);
    return head;
  }
  const id = `person:${person.id}`;
  const existing = heads.get(id);
  if (existing) return existing;
  const head: Head = {
    id,
    label: person.name,
    subtitle: RELATION_LABEL[person.relation],
    kind: "person",
    memberIds: [person.id],
    paidPaise: 0,
    sharePaise: 0,
    personalPaise: 0,
    netPaise: 0,
  };
  heads.set(id, head);
  return head;
}

function settle(heads: Head[]): Transfer[] {
  const creds = heads
    .filter((h) => h.netPaise > 0)
    .map((h) => ({ id: h.id, label: h.label, remaining: h.netPaise }))
    .sort((a, b) => b.remaining - a.remaining);
  const debts = heads
    .filter((h) => h.netPaise < 0)
    .map((h) => ({ id: h.id, label: h.label, remaining: -h.netPaise }))
    .sort((a, b) => b.remaining - a.remaining);

  const out: Transfer[] = [];
  let i = 0;
  let j = 0;
  while (i < debts.length && j < creds.length) {
    const d = debts[i]!;
    const c = creds[j]!;
    const pay = Math.min(d.remaining, c.remaining);
    if (pay > 0) {
      out.push({
        fromId: d.id,
        fromLabel: d.label,
        toId: c.id,
        toLabel: c.label,
        paise: pay,
      });
      d.remaining -= pay;
      c.remaining -= pay;
    }
    if (d.remaining === 0) i += 1;
    if (c.remaining === 0) j += 1;
  }
  return out;
}

function bump(map: Map<string, number>, key: string, paise: number) {
  const label = key.trim() || "Unspecified";
  map.set(label, (map.get(label) ?? 0) + paise);
}

export function computeReport(journey: Journey): Report {
  const peopleById = new Map(journey.people.map((p) => [p.id, p]));
  const heads = new Map<string, Head>();
  for (const person of journey.people) ensureHead(heads, person, journey);

  let groupPaise = 0;
  let personalPaise = 0;
  const byType = new Map<string, number>();
  const byPlace = new Map<string, number>();
  const dates: string[] = [];

  for (const expense of journey.expenses) {
    const paise = rupeesToPaise(expense.amount);
    bump(byType, expense.type, paise);
    bump(byPlace, expense.place, paise);
    if (expense.at) dates.push(expense.at);

    if (expense.kind === "personal") {
      personalPaise += paise;
      const payer = peopleById.get(expense.paidBy);
      if (!payer) continue;
      ensureHead(heads, payer, journey).personalPaise += paise;
      continue;
    }

    groupPaise += paise;
    const members = expense.splitAmong
      .filter((id) => peopleById.has(id))
      .sort();
    if (members.length === 0) continue;

    const payer = peopleById.get(expense.paidBy);
    if (payer) ensureHead(heads, payer, journey).paidPaise += paise;

    const shares = splitEvenPaise(paise, members.length);
    members.forEach((id, index) => {
      const person = peopleById.get(id);
      if (!person) return;
      ensureHead(heads, person, journey).sharePaise += shares[index] ?? 0;
    });
  }

  const headList = [...heads.values()].map((h) => ({
    ...h,
    netPaise: h.paidPaise - h.sharePaise,
  }));
  headList.sort((a, b) => a.label.localeCompare(b.label));

  dates.sort();

  const toList = (map: Map<string, number>): TypedTotal[] =>
    [...map.entries()]
      .map(([key, paise]) => ({ key, paise }))
      .sort((a, b) => b.paise - a.paise);

  return {
    totalPaise: groupPaise + personalPaise,
    groupPaise,
    personalPaise,
    heads: headList,
    transfers: settle(headList),
    byType: toList(byType),
    byPlace: toList(byPlace),
    itemCount: journey.expenses.length,
    dateStart: dates[0] ?? null,
    dateEnd: dates[dates.length - 1] ?? null,
  };
}

function personName(journey: Journey, id: string): string {
  return journey.people.find((p) => p.id === id)?.name ?? "Unknown";
}

function expenseLine(journey: Journey, expense: Expense): string {
  const who = personName(journey, expense.paidBy);
  const amount = formatINRFromPaise(rupeesToPaise(expense.amount));
  const place = expense.place.trim() || "Unspecified place";
  if (expense.kind === "personal") {
    return `${formatDay(expense.at)} · ${place} · ${expense.type} · ${amount} · ${who} (personal)`;
  }
  const n = expense.splitAmong.length;
  return `${formatDay(expense.at)} · ${place} · ${expense.type} · ${amount} · ${who} paid · split ${n}`;
}

export function buildShareText(journey: Journey, report: Report): string {
  const lines: string[] = [];
  const status = journey.status === "completed" ? "Completed" : "Open";
  const peopleN = journey.people.length;
  const range =
    report.dateStart && report.dateEnd
      ? report.dateStart === report.dateEnd
        ? formatDay(report.dateStart)
        : `${formatDay(report.dateStart)} – ${formatDay(report.dateEnd)}`
      : "No dates yet";

  lines.push(`SAFAR · ${journey.name}`);
  lines.push(`${range} · ${peopleN} people · ${status}`);
  lines.push("");
  lines.push(`TOTAL  ${formatINRFromPaise(report.totalPaise)}`);
  lines.push(
    `Group ${formatINRFromPaise(report.groupPaise)} · Personal ${formatINRFromPaise(report.personalPaise)}`,
  );
  lines.push("");
  lines.push("HEADS");
  for (const head of report.heads) {
    const net =
      head.netPaise === 0
        ? "settled"
        : head.netPaise > 0
          ? `owed ${formatINRFromPaise(head.netPaise)}`
          : `owes ${formatINRFromPaise(-head.netPaise)}`;
    const clubNote = head.kind === "club" ? ` [${head.subtitle}]` : "";
    lines.push(
      `• ${head.label}${clubNote}  paid ${formatINRFromPaise(head.paidPaise)}  share ${formatINRFromPaise(head.sharePaise)}  personal ${formatINRFromPaise(head.personalPaise)}  ${net}`,
    );
  }

  lines.push("");
  if (report.transfers.length === 0) {
    lines.push("SETTLE");
    lines.push("• Nothing pending — books are even.");
  } else {
    lines.push("SETTLE THESE");
    for (const t of report.transfers) {
      lines.push(`• ${t.fromLabel} → ${t.toLabel}  ${formatINRFromPaise(t.paise)}`);
    }
  }

  if (report.byType.length) {
    lines.push("");
    lines.push("BY TYPE");
    lines.push(report.byType.map((t) => `${t.key} ${formatINRFromPaise(t.paise)}`).join(" · "));
  }
  if (report.byPlace.length) {
    lines.push("");
    lines.push("BY PLACE");
    lines.push(report.byPlace.map((t) => `${t.key} ${formatINRFromPaise(t.paise)}`).join(" · "));
  }

  if (journey.expenses.length) {
    lines.push("");
    lines.push("LINE ITEMS");
    const ordered = [...journey.expenses].sort((a, b) => a.at.localeCompare(b.at));
    ordered.forEach((e, i) => {
      lines.push(`${i + 1}. ${expenseLine(journey, e)}`);
    });
  }

  lines.push("");
  lines.push("Shared from Safar — journey expenses, split clearly.");
  return lines.join("\n");
}

export function journeyTypes(journey: Journey): string[] {
  const extras = journey.customTypes.map((t) => t.trim()).filter(Boolean);
  const fromExpenses = journey.expenses.map((e) => e.type).filter(Boolean);
  const all = [...PRESET_TYPE_LIST, ...extras, ...fromExpenses];
  return [...new Set(all)];
}

const PRESET_TYPE_LIST = ["Fuel", "Food", "Tea", "Coffee", "Stay", "Toll", "Parking"];
