import "../_runtime.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./store-CIkdvI6i.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card",
		className: cn("flex flex-col gap-4 rounded-xl bg-surface py-5 text-ink shadow-[var(--shadow-border)]", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1 px-5", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("font-display text-lg font-medium leading-snug", className),
		...props
	});
}
function CardDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("text-sm text-ink-muted", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("px-5", className),
		...props
	});
}
//#endregion
export { CardTitle as a, CardHeader as i, CardContent as n, CardDescription as r, Card as t };
