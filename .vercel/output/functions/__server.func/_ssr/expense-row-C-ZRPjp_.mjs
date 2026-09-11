import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { b as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as formatINRFromPaise, c as rupeesToPaise, r as formatDay, t as cn } from "./store-CIkdvI6i.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/expense-row-C-ZRPjp_.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0", {
	variants: { variant: {
		default: "border-transparent bg-accent/10 text-accent",
		secondary: "border-transparent bg-surface-2 text-ink-muted",
		outline: "border-line text-ink-muted",
		credit: "border-transparent bg-credit/10 text-credit",
		debit: "border-transparent bg-debit/10 text-debit"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function ExpenseRow({ expense, people, onClick }) {
	const payer = people.find((p) => p.id === expense.paidBy)?.name ?? "Unknown";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex w-full items-start justify-between gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-150 hover:bg-surface-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "truncate font-medium text-ink",
				children: [expense.place.trim() || "No place", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-ink-muted",
					children: [" · ", expense.type]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-0.5 text-sm text-ink-muted",
				children: [
					formatDay(expense.at),
					" · ",
					payer,
					expense.kind === "group" ? ` · split ${expense.splitAmong.length}` : null
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shrink-0 text-right",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium tabular-nums text-ink",
				children: formatINRFromPaise(rupeesToPaise(expense.amount))
			}), expense.kind === "personal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "secondary",
				className: "mt-1",
				children: "Personal"
			}) : null]
		})]
	});
}
//#endregion
export { ExpenseRow as n, Badge as t };
