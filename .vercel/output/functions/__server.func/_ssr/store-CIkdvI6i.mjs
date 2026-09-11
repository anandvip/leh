import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-CIkdvI6i.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function nid(prefix) {
	return `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
}
function rupeesToPaise(n) {
	return Math.round(n * 100);
}
function splitEvenPaise(totalPaise, n) {
	if (n <= 0) return [];
	const base = Math.floor(totalPaise / n);
	const rem = totalPaise - base * n;
	return Array.from({ length: n }, (_, i) => base + (i < rem ? 1 : 0));
}
function parseAmount(raw) {
	const cleaned = raw.replace(/[₹,\s]/g, "");
	if (!cleaned) return null;
	const n = Number(cleaned);
	if (!Number.isFinite(n) || n < 0) return null;
	return Math.round(n * 100) / 100;
}
function formatINRFromPaise(paise) {
	const rupees = paise / 100;
	const hasPaise = paise % 100 !== 0;
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		minimumFractionDigits: hasPaise ? 2 : 0,
		maximumFractionDigits: 2
	}).format(rupees);
}
function formatINRSigned(paise) {
	if (paise === 0) return formatINRFromPaise(0);
	return `${paise > 0 ? "+" : "−"}${formatINRFromPaise(Math.abs(paise))}`;
}
function todayISODate() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function formatDay(isoDate) {
	const [y, m, d] = isoDate.split("-").map(Number);
	if (!y || !m || !d) return isoDate;
	return new Intl.DateTimeFormat("en-IN", {
		day: "numeric",
		month: "short"
	}).format(new Date(y, m - 1, d));
}
function formatDayLong(isoDate) {
	const [y, m, d] = isoDate.split("-").map(Number);
	if (!y || !m || !d) return isoDate;
	return new Intl.DateTimeFormat("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric"
	}).format(new Date(y, m - 1, d));
}
function createEmptyJourney() {
	return {
		id: crypto.randomUUID(),
		name: "Untitled journey",
		status: "open",
		startedAt: (/* @__PURE__ */ new Date()).toISOString(),
		completedAt: null,
		people: [],
		clubs: [],
		expenses: [],
		customTypes: []
	};
}
function createSampleJourney() {
	const arjun = "p_arjun";
	const rahul = "p_rahul";
	const priya = "p_priya";
	const amit = "p_amit";
	const neha = "p_neha";
	const all = [
		arjun,
		rahul,
		priya,
		amit,
		neha
	];
	return {
		id: crypto.randomUUID(),
		name: "Western Ghats drive",
		status: "open",
		startedAt: "2026-09-06T08:00:00.000Z",
		completedAt: null,
		people: [
			{
				id: arjun,
				name: "Arjun",
				relation: "self"
			},
			{
				id: rahul,
				name: "Rahul",
				relation: "brother"
			},
			{
				id: priya,
				name: "Priya",
				relation: "sister"
			},
			{
				id: amit,
				name: "Amit",
				relation: "friend"
			},
			{
				id: neha,
				name: "Neha",
				relation: "friend"
			}
		],
		clubs: [{
			id: "c_sib",
			name: "Brother & Sister",
			memberIds: [rahul, priya]
		}],
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
				at: "2026-09-06"
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
				at: "2026-09-06"
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
				at: "2026-09-06"
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
				at: "2026-09-06"
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
				at: "2026-09-06"
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
				at: "2026-09-06"
			},
			{
				id: "e7",
				kind: "group",
				amount: 1860,
				type: "Food",
				place: "Mahabaleshwar",
				note: "Amit sat this one out",
				paidBy: neha,
				splitAmong: [
					arjun,
					rahul,
					priya,
					neha
				],
				at: "2026-09-07"
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
				at: "2026-09-07"
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
				at: "2026-09-08"
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
				at: "2026-09-08"
			}
		]
	};
}
function archiveIfNeeded(journey, past) {
	if (!(journey.people.length > 0 || journey.expenses.length > 0 || journey.name !== "Untitled journey")) return past;
	return [journey, ...past.filter((j) => j.id !== journey.id)].slice(0, 20);
}
function personIsUsed(journey, id) {
	return journey.expenses.some((e) => e.paidBy === id || e.splitAmong.includes(id));
}
var useJourneyStore = create()(persist((set, get) => ({
	journey: createEmptyJourney(),
	pastJourneys: [],
	sheet: {
		open: false,
		editingId: null
	},
	addPerson: (name, relation) => {
		const trimmed = name.trim();
		if (!trimmed) return "Enter a name.";
		if (get().journey.people.some((p) => p.name.toLowerCase() === trimmed.toLowerCase())) return "That name is already in this journey.";
		const person = {
			id: nid("p"),
			name: trimmed,
			relation
		};
		set((s) => ({ journey: {
			...s.journey,
			people: [...s.journey.people, person]
		} }));
		return null;
	},
	updatePerson: (id, patch) => {
		set((s) => ({ journey: {
			...s.journey,
			people: s.journey.people.map((p) => p.id === id ? {
				...p,
				name: patch.name?.trim() || p.name,
				relation: patch.relation ?? p.relation
			} : p)
		} }));
	},
	removePerson: (id) => {
		const { journey } = get();
		if (personIsUsed(journey, id)) return "This person is on existing expenses. Edit or delete those first.";
		set((s) => ({ journey: {
			...s.journey,
			people: s.journey.people.filter((p) => p.id !== id),
			clubs: s.journey.clubs.map((c) => ({
				...c,
				memberIds: c.memberIds.filter((m) => m !== id)
			})).filter((c) => c.memberIds.length >= 2)
		} }));
		return null;
	},
	addClub: (name, memberIds) => {
		const unique = [...new Set(memberIds)];
		if (unique.length < 2) return "Pick at least two people to club.";
		const taken = get().journey.clubs.flatMap((c) => c.memberIds);
		if (unique.some((id) => taken.includes(id))) return "A person can only belong to one club.";
		const label = name.trim() || defaultClubName(get().journey.people, unique);
		set((s) => ({ journey: {
			...s.journey,
			clubs: [...s.journey.clubs, {
				id: nid("c"),
				name: label,
				memberIds: unique
			}]
		} }));
		return null;
	},
	removeClub: (id) => {
		set((s) => ({ journey: {
			...s.journey,
			clubs: s.journey.clubs.filter((c) => c.id !== id)
		} }));
	},
	setJourneyName: (name) => {
		const trimmed = name.trim() || "Untitled journey";
		set((s) => ({ journey: {
			...s.journey,
			name: trimmed
		} }));
	},
	addCustomType: (type) => {
		const trimmed = type.trim();
		if (!trimmed) return;
		set((s) => {
			if (s.journey.customTypes.some((t) => t.toLowerCase() === trimmed.toLowerCase())) return s;
			return { journey: {
				...s.journey,
				customTypes: [...s.journey.customTypes, trimmed]
			} };
		});
	},
	removeCustomType: (type) => {
		set((s) => ({ journey: {
			...s.journey,
			customTypes: s.journey.customTypes.filter((t) => t !== type)
		} }));
	},
	addExpense: (draft) => {
		const expense = {
			id: nid("e"),
			...normalizeDraft(draft)
		};
		set((s) => ({
			journey: {
				...s.journey,
				expenses: [expense, ...s.journey.expenses]
			},
			sheet: {
				open: false,
				editingId: null
			}
		}));
	},
	updateExpense: (id, draft) => {
		const next = normalizeDraft(draft);
		set((s) => ({
			journey: {
				...s.journey,
				expenses: s.journey.expenses.map((e) => e.id === id ? {
					...e,
					...next
				} : e)
			},
			sheet: {
				open: false,
				editingId: null
			}
		}));
	},
	removeExpense: (id) => {
		set((s) => ({
			journey: {
				...s.journey,
				expenses: s.journey.expenses.filter((e) => e.id !== id)
			},
			sheet: {
				open: false,
				editingId: null
			}
		}));
	},
	completeJourney: () => {
		set((s) => ({ journey: {
			...s.journey,
			status: "completed",
			completedAt: (/* @__PURE__ */ new Date()).toISOString()
		} }));
	},
	reopenJourney: () => {
		set((s) => ({ journey: {
			...s.journey,
			status: "open",
			completedAt: null
		} }));
	},
	startNewJourney: () => {
		set((s) => ({
			pastJourneys: archiveIfNeeded(s.journey, s.pastJourneys),
			journey: createEmptyJourney()
		}));
	},
	openPastJourney: (id) => {
		set((s) => {
			const found = s.pastJourneys.find((j) => j.id === id);
			if (!found) return s;
			const rest = s.pastJourneys.filter((j) => j.id !== id);
			return {
				pastJourneys: archiveIfNeeded(s.journey, rest),
				journey: found
			};
		});
	},
	loadSample: () => {
		set((s) => ({
			pastJourneys: archiveIfNeeded(s.journey, s.pastJourneys),
			journey: createSampleJourney()
		}));
	},
	openAddExpense: () => set({ sheet: {
		open: true,
		editingId: null
	} }),
	openEditExpense: (id) => set({ sheet: {
		open: true,
		editingId: id
	} }),
	closeSheet: () => set({ sheet: {
		open: false,
		editingId: null
	} })
}), {
	name: "safar-ledger",
	storage: createJSONStorage(() => localStorage),
	partialize: (s) => ({
		journey: s.journey,
		pastJourneys: s.pastJourneys
	})
}));
function normalizeDraft(draft) {
	const amount = Math.round(draft.amount * 100) / 100;
	const type = draft.type.trim() || "Other";
	const place = draft.place.trim();
	const at = draft.at || todayISODate();
	if (draft.kind === "personal") return {
		...draft,
		amount,
		type,
		place,
		at,
		splitAmong: [draft.paidBy]
	};
	const splitAmong = draft.splitAmong.length ? draft.splitAmong : [draft.paidBy];
	return {
		...draft,
		amount,
		type,
		place,
		at,
		splitAmong
	};
}
function defaultClubName(people, memberIds) {
	const members = people.filter((p) => memberIds.includes(p.id));
	const rels = new Set(members.map((m) => m.relation));
	if (members.length >= 2 && [...rels].every((r) => r === "brother" || r === "sister") && (rels.has("brother") || rels.has("sister"))) return "Brother & Sister";
	return members.map((m) => m.name).join(" & ");
}
//#endregion
export { formatINRFromPaise as a, rupeesToPaise as c, useJourneyStore as d, formatDayLong as i, splitEvenPaise as l, defaultClubName as n, formatINRSigned as o, formatDay as r, parseAmount as s, cn as t, todayISODate as u };
