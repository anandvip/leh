import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as formatINRFromPaise, d as useJourneyStore, i as formatDayLong, o as formatINRSigned, r as formatDay } from "./store-CIkdvI6i.mjs";
import { n as ExpenseRow, t as Badge } from "./expense-row-C-ZRPjp_.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Share2, d as Check, p as ArrowRight, s as Printer, u as Copy } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as DrawerDescription, f as DrawerFooter, h as Button, i as ConfirmDialog, l as Drawer$1, m as DrawerTitle, n as buildShareText, o as Textarea, p as DrawerHeader, r as computeReport, u as DrawerContent } from "./router-DSq9Z4Xs.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-D9AHXztE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/report-DGSgpbjV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReportView({ compact = false }) {
	const journey = useJourneyStore((s) => s.journey);
	const openEditExpense = useJourneyStore((s) => s.openEditExpense);
	const report = computeReport(journey);
	const [textOpen, setTextOpen] = (0, import_react.useState)(false);
	const shareText = buildShareText(journey, report);
	const range = report.dateStart && report.dateEnd ? report.dateStart === report.dateEnd ? formatDayLong(report.dateStart) : `${formatDay(report.dateStart)} – ${formatDayLong(report.dateEnd)}` : "No expenses yet";
	async function share() {
		try {
			if (navigator.share) {
				await navigator.share({
					title: `${journey.name} · Safar`,
					text: shareText
				});
				return;
			}
			setTextOpen(true);
		} catch (err) {
			if (err.name === "AbortError") return;
			setTextOpen(true);
		}
	}
	async function copy() {
		try {
			await navigator.clipboard.writeText(shareText);
			toast.success("Copied — paste into Signal");
		} catch {
			setTextOpen(true);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "print-sheet rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.18em] text-ink-subtle uppercase",
						children: "Safar report"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-3xl font-medium tracking-tight text-ink",
						children: journey.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-ink-muted",
						children: [
							range,
							" · ",
							journey.people.length,
							" people · ",
							journey.status === "completed" ? "Completed" : "Open"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Total",
								value: formatINRFromPaise(report.totalPaise)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Group",
								value: formatINRFromPaise(report.groupPaise)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Personal",
								value: formatINRFromPaise(report.personalPaise)
							})
						]
					})
				]
			}),
			!compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-print flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: share,
						className: "flex-1 sm:flex-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {}), "Share"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: copy,
						className: "flex-1 sm:flex-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), "Copy for Signal"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => window.print(),
						className: "flex-1 sm:flex-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {}), "Print"]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Heads" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-ink-muted",
				children: "Relatives you clubbed appear as one line. Everyone else is listed on their own."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "space-y-3",
				children: report.heads.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-ink-muted",
					children: "Add people in Settings."
				}) : report.heads.map((head) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadRow, { head }, head.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Settle these" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: report.transfers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-2 text-sm text-ink-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-credit" }), report.itemCount === 0 ? "No group expenses to settle yet." : "Books are even."]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: report.transfers.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3 rounded-lg bg-surface-2 px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: t.fromLabel
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 shrink-0 text-ink-subtle" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: t.toLabel
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 font-medium tabular-nums",
						children: formatINRFromPaise(t.paise)
					})]
				}, `${t.fromId}-${t.toId}`))
			}) })] }),
			!compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breakdown, {
					title: "By type",
					rows: report.byType
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breakdown, {
					title: "By place",
					rows: report.byPlace
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Line items" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-ink-muted",
				children: "Tap any row to edit. The report updates immediately."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "-mx-2",
				children: journey.expenses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-2 text-sm text-ink-muted",
					children: "No expenses recorded."
				}) : [...journey.expenses].sort((a, b) => a.at.localeCompare(b.at)).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseRow, {
					expense: e,
					people: journey.people,
					onClick: () => openEditExpense(e.id)
				}, e.id))
			})] })] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
				open: textOpen,
				onOpenChange: setTextOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: "Share this text" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerDescription, { children: "Paste into Signal, WhatsApp, or anywhere else. On a phone, Share also opens the system sheet." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-5 pb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							readOnly: true,
							value: shareText,
							className: "h-72 font-mono text-xs leading-relaxed",
							onFocus: (e) => e.currentTarget.select()
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: async () => {
							try {
								await navigator.clipboard.writeText(shareText);
								toast.success("Copied — paste into Signal");
							} catch {
								toast.message("Select the text above, then copy.");
							}
						},
						children: "Copy text"
					}) })
				] })
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs font-medium tracking-wide text-ink-subtle uppercase",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 font-display text-xl font-medium tabular-nums tracking-tight",
		children: value
	})] });
}
function HeadRow({ head }) {
	const netPositive = head.netPaise > 0;
	const even = head.netPaise === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface-2 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: head.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-ink-muted",
					children: head.subtitle
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: even ? "secondary" : netPositive ? "credit" : "debit",
				children: even ? "Settled" : netPositive ? `Owed ${formatINRSigned(head.netPaise)}` : `Owes ${formatINRSigned(head.netPaise)}`
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid grid-cols-3 gap-2 text-xs text-ink-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Paid ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-medium tabular-nums text-ink",
					children: formatINRFromPaise(head.paidPaise)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Share ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-medium tabular-nums text-ink",
					children: formatINRFromPaise(head.sharePaise)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Personal",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-medium tabular-nums text-ink",
						children: formatINRFromPaise(head.personalPaise)
					})
				] })
			]
		})]
	});
}
function Breakdown({ title, rows }) {
	const max = rows[0]?.paise ?? 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: title }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
		className: "space-y-3",
		children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-ink-muted",
			children: "Nothing yet."
		}) : rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-1 flex items-center justify-between text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.key }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums text-ink-muted",
				children: formatINRFromPaise(row.paise)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1.5 overflow-hidden rounded-full bg-surface-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full rounded-full bg-accent",
				style: { width: `${Math.max(6, row.paise / max * 100)}%` }
			})
		})] }, row.key))
	})] });
}
function ReportPage() {
	const journey = useJourneyStore((s) => s.journey);
	const completeJourney = useJourneyStore((s) => s.completeJourney);
	const reopenJourney = useJourneyStore((s) => s.reopenJourney);
	const [confirmComplete, setConfirmComplete] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-start justify-between gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-medium tracking-tight",
					children: "Report card"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-ink-muted",
					children: "Live totals. Edit any line and the settlement updates. Share opens your phone’s share sheet — pick Signal if it’s installed."
				})] })
			}),
			journey.status === "open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full h-12",
				onClick: () => setConfirmComplete(true),
				children: "Complete journey"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "flex-1",
					onClick: reopenJourney,
					children: "Reopen"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "flex-1",
					onClick: () => navigate({ to: "/settings" }),
					children: "Start a new one"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportView, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirmComplete,
				onOpenChange: setConfirmComplete,
				title: "Mark this journey complete?",
				description: "The report stays editable. Completing just stamps it as finished so you can share a clean card.",
				confirmLabel: "Complete",
				onConfirm: completeJourney
			})
		]
	});
}
//#endregion
export { ReportPage as component };
