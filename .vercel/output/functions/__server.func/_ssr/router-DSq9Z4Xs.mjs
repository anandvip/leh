import { i as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as Overlay2, b as require_jsx_runtime, c as Title2, i as Description2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action, x as require_react, y as Slot } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as formatINRFromPaise, c as rupeesToPaise, d as useJourneyStore, l as splitEvenPaise, r as formatDay, s as parseAmount, t as cn, u as todayISODate } from "./store-CIkdvI6i.mjs";
import { _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Plus, f as BookOpen, l as House, o as Settings, r as TriangleAlert, t as Wallet } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/types-XmCmppx-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-[var(--ease-smooth-out)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			destructive: "bg-destructive text-white hover:bg-destructive/90",
			outline: "border border-border bg-surface text-ink hover:bg-surface-2",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "hover:bg-surface-2",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4 py-2",
			sm: "h-9 rounded-md px-3",
			lg: "h-12 rounded-lg px-6 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var RELATIONS = [
	"self",
	"brother",
	"sister",
	"spouse",
	"parent",
	"child",
	"friend",
	"other"
];
var RELATION_LABEL = {
	self: "Self",
	brother: "Brother",
	sister: "Sister",
	spouse: "Spouse",
	parent: "Parent",
	child: "Child",
	friend: "Friend",
	other: "Other"
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DSq9Z4Xs.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function Drawer$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		"data-slot": "drawer",
		...props
	});
}
function DrawerPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Portal, {
		"data-slot": "drawer-portal",
		...props
	});
}
function DrawerOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, {
		className: cn("fixed inset-0 z-50 bg-ink/40", className),
		...props
	});
}
function DrawerContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
		className: cn("fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto max-h-[92dvh] flex-col rounded-t-xl bg-bg", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-3 h-1 w-12 shrink-0 rounded-full bg-line" }), children]
	})] });
}
function DrawerHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1 p-5 pb-2", className),
		...props
	});
}
function DrawerFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mt-auto flex flex-col gap-2 p-5", className),
		...props
	});
}
function DrawerTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
		className: cn("font-display text-xl font-medium text-ink", className),
		...props
	});
}
function DrawerDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Description, {
		className: cn("text-sm text-ink-muted", className),
		...props
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		"data-slot": "input",
		className: cn("flex h-11 w-full min-w-0 rounded-md border border-input bg-surface px-3 py-1 text-base text-ink shadow-xs transition-[border-color,box-shadow] outline-none placeholder:text-ink-subtle", "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30", "disabled:pointer-events-none disabled:opacity-50", "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		"data-slot": "label",
		className: cn("text-sm font-medium text-ink leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		"data-slot": "textarea",
		className: cn("flex min-h-20 w-full rounded-md border border-input bg-surface px-3 py-2 text-base text-ink shadow-xs transition-[border-color,box-shadow] outline-none placeholder:text-ink-subtle", "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30", "disabled:pointer-events-none disabled:opacity-50", className),
		...props
	});
}
function initials(name) {
	return name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
}
function PersonChips({ people, selected, onToggle, multiple = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap gap-2",
		children: [people.map((person) => {
			const on = selected.includes(person.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onToggle(person.id),
				className: cn("inline-flex h-11 items-center gap-2 rounded-full border px-3 text-sm font-medium transition-[background-color,border-color,color] duration-150", on ? "border-accent bg-accent text-accent-fg" : "border-line bg-surface text-ink hover:bg-surface-2"),
				"aria-pressed": on,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("flex size-6 items-center justify-center rounded-full text-xs font-semibold", on ? "bg-accent-fg/15" : "bg-surface-2"),
					children: initials(person.name)
				}), person.name]
			}, person.id);
		}), multiple && people.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => {
				if (people.every((p) => selected.includes(p.id))) people.forEach((p) => {
					if (selected.includes(p.id)) onToggle(p.id);
				});
				else people.forEach((p) => {
					if (!selected.includes(p.id)) onToggle(p.id);
				});
			},
			className: "inline-flex h-11 items-center rounded-full border border-line bg-surface px-3 text-sm font-medium text-ink-muted hover:bg-surface-2",
			children: people.every((p) => selected.includes(p.id)) ? "Clear" : "Everyone"
		}) : null]
	});
}
function AlertDialog({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		"data-slot": "alert-dialog",
		...props
	});
}
function AlertDialogPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, {
		"data-slot": "alert-dialog-portal",
		...props
	});
}
function AlertDialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
		className: cn("fixed inset-0 z-50 bg-ink/40", className),
		...props
	});
}
function AlertDialogContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-surface p-6 shadow-[var(--shadow-border)]", className),
		...props
	})] });
}
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-2 text-left", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
		className: cn("font-display text-xl font-medium text-ink", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
		className: cn("text-sm text-ink-muted leading-relaxed", className),
		...props
	});
}
function AlertDialogAction({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
		className: cn(buttonVariants(), className),
		...props
	});
}
function AlertDialogCancel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
		className: cn(buttonVariants({ variant: "outline" }), className),
		...props
	});
}
function ConfirmDialog({ open, onOpenChange, title, description, confirmLabel = "Confirm", destructive, onConfirm }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: description })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
			className: destructive ? "bg-destructive text-white hover:bg-destructive/90" : void 0,
			onClick: onConfirm,
			children: confirmLabel
		})] })] })
	});
}
function clubIdFor(personId, journey) {
	const club = journey.clubs.find((c) => c.memberIds.includes(personId));
	return club ? club.id : null;
}
function ensureHead(heads, person, journey) {
	const clubId = clubIdFor(person.id, journey);
	if (clubId) {
		const id = `club:${clubId}`;
		const existing = heads.get(id);
		if (existing) return existing;
		const club = journey.clubs.find((c) => c.id === clubId);
		const members = journey.people.filter((p) => club.memberIds.includes(p.id));
		const head = {
			id,
			label: club.name,
			subtitle: members.map((m) => m.name).join(", "),
			kind: "club",
			memberIds: [...club.memberIds],
			paidPaise: 0,
			sharePaise: 0,
			personalPaise: 0,
			netPaise: 0
		};
		heads.set(id, head);
		return head;
	}
	const id = `person:${person.id}`;
	const existing = heads.get(id);
	if (existing) return existing;
	const head = {
		id,
		label: person.name,
		subtitle: RELATION_LABEL[person.relation],
		kind: "person",
		memberIds: [person.id],
		paidPaise: 0,
		sharePaise: 0,
		personalPaise: 0,
		netPaise: 0
	};
	heads.set(id, head);
	return head;
}
function settle(heads) {
	const creds = heads.filter((h) => h.netPaise > 0).map((h) => ({
		id: h.id,
		label: h.label,
		remaining: h.netPaise
	})).sort((a, b) => b.remaining - a.remaining);
	const debts = heads.filter((h) => h.netPaise < 0).map((h) => ({
		id: h.id,
		label: h.label,
		remaining: -h.netPaise
	})).sort((a, b) => b.remaining - a.remaining);
	const out = [];
	let i = 0;
	let j = 0;
	while (i < debts.length && j < creds.length) {
		const d = debts[i];
		const c = creds[j];
		const pay = Math.min(d.remaining, c.remaining);
		if (pay > 0) {
			out.push({
				fromId: d.id,
				fromLabel: d.label,
				toId: c.id,
				toLabel: c.label,
				paise: pay
			});
			d.remaining -= pay;
			c.remaining -= pay;
		}
		if (d.remaining === 0) i += 1;
		if (c.remaining === 0) j += 1;
	}
	return out;
}
function bump(map, key, paise) {
	const label = key.trim() || "Unspecified";
	map.set(label, (map.get(label) ?? 0) + paise);
}
function computeReport(journey) {
	const peopleById = new Map(journey.people.map((p) => [p.id, p]));
	const heads = /* @__PURE__ */ new Map();
	for (const person of journey.people) ensureHead(heads, person, journey);
	let groupPaise = 0;
	let personalPaise = 0;
	const byType = /* @__PURE__ */ new Map();
	const byPlace = /* @__PURE__ */ new Map();
	const dates = [];
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
		const members = expense.splitAmong.filter((id) => peopleById.has(id)).sort();
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
		netPaise: h.paidPaise - h.sharePaise
	}));
	headList.sort((a, b) => a.label.localeCompare(b.label));
	dates.sort();
	const toList = (map) => [...map.entries()].map(([key, paise]) => ({
		key,
		paise
	})).sort((a, b) => b.paise - a.paise);
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
		dateEnd: dates[dates.length - 1] ?? null
	};
}
function personName(journey, id) {
	return journey.people.find((p) => p.id === id)?.name ?? "Unknown";
}
function expenseLine(journey, expense) {
	const who = personName(journey, expense.paidBy);
	const amount = formatINRFromPaise(rupeesToPaise(expense.amount));
	const place = expense.place.trim() || "Unspecified place";
	if (expense.kind === "personal") return `${formatDay(expense.at)} · ${place} · ${expense.type} · ${amount} · ${who} (personal)`;
	const n = expense.splitAmong.length;
	return `${formatDay(expense.at)} · ${place} · ${expense.type} · ${amount} · ${who} paid · split ${n}`;
}
function buildShareText(journey, report) {
	const lines = [];
	const status = journey.status === "completed" ? "Completed" : "Open";
	const peopleN = journey.people.length;
	const range = report.dateStart && report.dateEnd ? report.dateStart === report.dateEnd ? formatDay(report.dateStart) : `${formatDay(report.dateStart)} – ${formatDay(report.dateEnd)}` : "No dates yet";
	lines.push(`SAFAR · ${journey.name}`);
	lines.push(`${range} · ${peopleN} people · ${status}`);
	lines.push("");
	lines.push(`TOTAL  ${formatINRFromPaise(report.totalPaise)}`);
	lines.push(`Group ${formatINRFromPaise(report.groupPaise)} · Personal ${formatINRFromPaise(report.personalPaise)}`);
	lines.push("");
	lines.push("HEADS");
	for (const head of report.heads) {
		const net = head.netPaise === 0 ? "settled" : head.netPaise > 0 ? `owed ${formatINRFromPaise(head.netPaise)}` : `owes ${formatINRFromPaise(-head.netPaise)}`;
		const clubNote = head.kind === "club" ? ` [${head.subtitle}]` : "";
		lines.push(`• ${head.label}${clubNote}  paid ${formatINRFromPaise(head.paidPaise)}  share ${formatINRFromPaise(head.sharePaise)}  personal ${formatINRFromPaise(head.personalPaise)}  ${net}`);
	}
	lines.push("");
	if (report.transfers.length === 0) {
		lines.push("SETTLE");
		lines.push("• Nothing pending — books are even.");
	} else {
		lines.push("SETTLE THESE");
		for (const t of report.transfers) lines.push(`• ${t.fromLabel} → ${t.toLabel}  ${formatINRFromPaise(t.paise)}`);
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
		[...journey.expenses].sort((a, b) => a.at.localeCompare(b.at)).forEach((e, i) => {
			lines.push(`${i + 1}. ${expenseLine(journey, e)}`);
		});
	}
	lines.push("");
	lines.push("Shared from Safar — journey expenses, split clearly.");
	return lines.join("\n");
}
function journeyTypes(journey) {
	const extras = journey.customTypes.map((t) => t.trim()).filter(Boolean);
	const fromExpenses = journey.expenses.map((e) => e.type).filter(Boolean);
	const all = [
		...PRESET_TYPE_LIST,
		...extras,
		...fromExpenses
	];
	return [...new Set(all)];
}
var PRESET_TYPE_LIST = [
	"Fuel",
	"Food",
	"Tea",
	"Coffee",
	"Stay",
	"Toll",
	"Parking"
];
function ExpenseSheet() {
	const journey = useJourneyStore((s) => s.journey);
	const sheet = useJourneyStore((s) => s.sheet);
	const closeSheet = useJourneyStore((s) => s.closeSheet);
	const addExpense = useJourneyStore((s) => s.addExpense);
	const updateExpense = useJourneyStore((s) => s.updateExpense);
	const removeExpense = useJourneyStore((s) => s.removeExpense);
	const addCustomType = useJourneyStore((s) => s.addCustomType);
	const editing = journey.expenses.find((e) => e.id === sheet.editingId) ?? null;
	const types = (0, import_react.useMemo)(() => journeyTypes(journey), [journey]);
	const [kind, setKind] = (0, import_react.useState)("group");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("Food");
	const [customType, setCustomType] = (0, import_react.useState)("");
	const [place, setPlace] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [paidBy, setPaidBy] = (0, import_react.useState)("");
	const [splitAmong, setSplitAmong] = (0, import_react.useState)([]);
	const [at, setAt] = (0, import_react.useState)(todayISODate());
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
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
	}, [
		sheet.open,
		editing,
		journey.people
	]);
	const places = (0, import_react.useMemo)(() => {
		const seen = /* @__PURE__ */ new Set();
		const out = [];
		for (const e of journey.expenses) {
			const p = e.place.trim();
			if (p && !seen.has(p.toLowerCase())) {
				seen.add(p.toLowerCase());
				out.push(p);
			}
		}
		return out.slice(0, 8);
	}, [journey.expenses]);
	function toggleSplit(id) {
		setSplitAmong((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
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
		const draft = {
			kind,
			amount: parsed,
			type: resolvedType,
			place,
			note: note.trim(),
			paidBy,
			splitAmong: kind === "personal" ? [paidBy] : splitAmong,
			at
		};
		if (editing) updateExpense(editing.id, draft);
		else addExpense(draft);
		toast.success(editing ? "Expense updated" : "Expense added");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
		open: sheet.open,
		onOpenChange: (o) => !o ? closeSheet() : void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: editing ? "Edit expense" : "Add expense" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerDescription, { children: kind === "personal" ? "Logged against one person. Not split." : "Split equally among the people you pick." })] }),
			journey.people.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-5 pb-8 text-sm text-ink-muted",
				children: "Add people in Settings before logging expenses."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 overflow-y-auto px-5 pb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "amount",
							className: "text-ink-muted",
							children: "Amount"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-3xl text-ink-muted",
								children: "₹"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "amount",
								inputMode: "decimal",
								value: amount,
								onChange: (e) => setAmount(e.target.value),
								placeholder: "0",
								className: "w-full bg-transparent font-display text-4xl font-medium tabular-nums tracking-tight text-ink outline-none placeholder:text-ink-subtle"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4 grid grid-cols-2 gap-2 rounded-lg bg-surface-2 p-1",
						children: ["group", "personal"].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setKind(k),
							className: cn("h-10 rounded-md text-sm font-medium capitalize transition-colors duration-150", kind === k ? "bg-surface text-ink shadow-[var(--shadow-border)]" : "text-ink-muted"),
							children: k === "group" ? "Group split" : "Personal"
						}, k))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
						label: "Type",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [types.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								on: type === t,
								onClick: () => setType(t),
								children: t
							}, t)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								on: type === "__custom",
								onClick: () => setType("__custom"),
								children: "Custom"
							})]
						}), type === "__custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-2",
							value: customType,
							onChange: (e) => setCustomType(e.target.value),
							placeholder: "e.g. Snacks, Temple, Ferry"
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
						label: "Place",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: place,
							onChange: (e) => setPlace(e.target.value),
							placeholder: "Lonavala, Panvel, hotel name…"
						}), places.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: places.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								on: place === p,
								onClick: () => setPlace(p),
								children: p
							}, p))
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: kind === "personal" ? "Whose expense" : "Who paid",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonChips, {
							people: journey.people,
							selected: paidBy ? [paidBy] : [],
							multiple: false,
							onToggle: (id) => {
								setPaidBy(id);
								if (kind === "personal") setSplitAmong([id]);
							}
						})
					}),
					kind === "group" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Split equally among",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonChips, {
							people: journey.people,
							selected: splitAmong,
							onToggle: toggleSplit
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Date",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: at,
								onChange: (e) => setAt(e.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Note (optional)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: note,
								onChange: (e) => setNote(e.target.value),
								rows: 2,
								placeholder: "Anything to remember"
							})
						})]
					})
				]
			}),
			journey.people.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerFooter, {
				className: "border-t border-line bg-bg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: save,
					className: "h-12",
					children: editing ? "Save changes" : "Add expense"
				}), editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					className: "text-danger",
					onClick: () => setConfirmDelete(true),
					children: "Delete expense"
				}) : null]
			}) : null
		] })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
		open: confirmDelete,
		onOpenChange: setConfirmDelete,
		title: "Delete this expense?",
		description: "It will be removed from the journey and the report will update.",
		confirmLabel: "Delete",
		destructive: true,
		onConfirm: () => {
			if (editing) {
				removeExpense(editing.id);
				toast.success("Expense deleted");
			}
		}
	})] });
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-sm font-medium text-ink",
			children: label
		}), children]
	});
}
function Chip({ on, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("inline-flex h-11 items-center rounded-full border px-3 text-sm font-medium transition-colors duration-150", on ? "border-accent bg-accent text-accent-fg" : "border-line bg-surface text-ink hover:bg-surface-2"),
		children
	});
}
var NAV = [
	{
		to: "/",
		label: "Home",
		icon: House
	},
	{
		to: "/expenses",
		label: "Log",
		icon: Wallet
	},
	{
		to: "/report",
		label: "Report",
		icon: BookOpen
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const journeyName = useJourneyStore((s) => s.journey.name);
	const openAddExpense = useJourneyStore((s) => s.openAddExpense);
	const peopleCount = useJourneyStore((s) => s.journey.people.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "no-print sticky top-0 z-30 border-b border-line/80 bg-bg/90 pt-[env(safe-area-inset-top)] backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex h-14 w-full max-w-lg items-center justify-between px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-[0.18em] text-ink-subtle uppercase",
							children: "Safar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: journeyName
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-lg px-4 pt-5 pb-28",
				children
			}),
			(pathname === "/" || pathname === "/expenses") && peopleCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-print pointer-events-none fixed inset-x-0 bottom-24 z-40 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "pointer-events-auto h-12 rounded-full px-5 shadow-[var(--shadow-border)]",
					onClick: openAddExpense,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Add expense"]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "no-print fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid w-full max-w-lg grid-cols-4",
					children: NAV.map((item) => {
						const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-14 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors duration-150", active ? "text-accent" : "text-ink-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-5",
								strokeWidth: active ? 2.2 : 1.8
							}), item.label]
						}, item.to);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseSheet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				richColors: true,
				theme: "light"
			})
		]
	});
}
var styles_default = "/assets/styles-DK8vp_JV.css";
var APP_NAME = "Safar";
var Route$4 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Record journey expenses, split them, and share a clear report."
			},
			{
				name: "theme-color",
				content: "#f3eee6"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$3 = () => import("./routes-B2QCpCWF.mjs");
var Route$3 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./expenses-Xg6t1ERT.mjs");
var Route$2 = createFileRoute("/expenses")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./report-DGSgpbjV.mjs");
var Route$1 = createFileRoute("/report")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./settings-X6TvJ2r9.mjs");
var Route = createFileRoute("/settings")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	ExpensesRoute: Route$2.update({
		id: "/expenses",
		path: "/expenses",
		getParentRoute: () => Route$4
	}),
	ReportRoute: Route$1.update({
		id: "/report",
		path: "/report",
		getParentRoute: () => Route$4
	}),
	SettingsRoute: Route.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { RELATION_LABEL as _, PersonChips as a, Input as c, DrawerDescription as d, DrawerFooter as f, RELATIONS as g, Button as h, ConfirmDialog as i, Drawer$1 as l, DrawerTitle as m, buildShareText as n, Textarea as o, DrawerHeader as p, computeReport as r, Label as s, router_exports as t, DrawerContent as u };
