import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { d as useJourneyStore, t as cn } from "./store-CIkdvI6i.mjs";
import { n as ExpenseRow } from "./expense-row-C-ZRPjp_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/expenses-Xg6t1ERT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ExpensesPage() {
	const journey = useJourneyStore((s) => s.journey);
	const openEditExpense = useJourneyStore((s) => s.openEditExpense);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const items = (0, import_react.useMemo)(() => {
		return [...filter === "all" ? journey.expenses : journey.expenses.filter((e) => e.kind === filter)].sort((a, b) => b.at.localeCompare(a.at) || b.id.localeCompare(a.id));
	}, [journey.expenses, filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-medium tracking-tight",
				children: "Expense log"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-ink-muted",
				children: "Tap a row to edit. Group splits and personal spends live together."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-1 rounded-lg bg-surface-2 p-1",
				children: [
					"all",
					"group",
					"personal"
				].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter(f),
					className: cn("h-10 rounded-md text-sm font-medium capitalize transition-colors duration-150", filter === f ? "bg-surface text-ink shadow-[var(--shadow-border)]" : "text-ink-muted"),
					children: f
				}, f))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl bg-surface py-2 shadow-[var(--shadow-border)]",
				children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-4 py-8 text-center text-sm text-ink-muted",
					children: journey.people.length === 0 ? "Add people in Settings, then log the first stop." : "No expenses in this filter."
				}) : items.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseRow, {
					expense: e,
					people: journey.people,
					onClick: () => openEditExpense(e.id)
				}, e.id))
			})
		]
	});
}
//#endregion
export { ExpensesPage as component };
