import { b as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as formatINRFromPaise, d as useJourneyStore, o as formatINRSigned } from "./store-CIkdvI6i.mjs";
import { n as ExpenseRow } from "./expense-row-C-ZRPjp_.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as ArrowRight } from "../_libs/lucide-react.mjs";
import { h as Button, r as computeReport } from "./router-DSq9Z4Xs.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-D9AHXztE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B2QCpCWF.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const journey = useJourneyStore((s) => s.journey);
	const openAddExpense = useJourneyStore((s) => s.openAddExpense);
	const openEditExpense = useJourneyStore((s) => s.openEditExpense);
	const loadSample = useJourneyStore((s) => s.loadSample);
	const report = computeReport(journey);
	const recent = journey.expenses.slice(0, 5);
	if (journey.people.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-medium tracking-tight",
			children: "A quiet ledger for the road."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-md text-ink-muted leading-relaxed",
			children: "Name the journey, add the people in the car, log fuel and food as you go. When it ends, share a report anyone can read — including in Signal."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "h-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/settings",
					children: ["Add people", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				className: "h-12",
				onClick: loadSample,
				children: "Load a sample trip"
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.18em] text-ink-subtle uppercase",
						children: journey.status === "completed" ? "Completed journey" : "Open journey"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-3xl font-medium tracking-tight",
						children: journey.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-ink-muted",
						children: [
							journey.people.length,
							" people",
							journey.clubs.length ? ` · ${journey.clubs.length} clubbed` : "",
							" · ",
							journey.expenses.length,
							" ",
							"expenses"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-ink-subtle uppercase tracking-wide",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-xl font-medium tabular-nums",
								children: formatINRFromPaise(report.totalPaise)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-ink-subtle uppercase tracking-wide",
								children: "Group"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-xl font-medium tabular-nums",
								children: formatINRFromPaise(report.groupPaise)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-ink-subtle uppercase tracking-wide",
								children: "Personal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-xl font-medium tabular-nums",
								children: formatINRFromPaise(report.personalPaise)
							})] })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex-row items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Who is ahead"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/report",
					className: "text-sm font-medium text-accent",
					children: "Full report"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "space-y-2",
				children: report.heads.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-ink-muted",
					children: "No one to split with yet."
				}) : report.heads.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-medium",
							children: h.label
						}), h.kind === "club" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-ink-muted",
							children: h.subtitle
						}) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: h.netPaise === 0 ? "tabular-nums text-ink-muted" : h.netPaise > 0 ? "tabular-nums text-credit" : "tabular-nums text-debit",
						children: h.netPaise === 0 ? "Even" : formatINRSigned(h.netPaise)
					})]
				}, h.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex-row items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Recent"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/expenses",
					className: "text-sm font-medium text-accent",
					children: "All"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "-mx-2",
				children: recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-2 py-4 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ink-muted",
						children: "Nothing logged yet."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						onClick: openAddExpense,
						children: "Add the first expense"
					})]
				}) : recent.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseRow, {
					expense: e,
					people: journey.people,
					onClick: () => openEditExpense(e.id)
				}, e.id))
			})] })
		]
	});
}
//#endregion
export { Home as component };
