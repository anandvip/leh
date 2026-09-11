import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { d as useJourneyStore, i as formatDayLong, n as defaultClubName, t as cn } from "./store-CIkdvI6i.mjs";
import { i as Trash2, n as Users } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as RELATION_LABEL, a as PersonChips, c as Input, g as RELATIONS, h as Button, i as ConfirmDialog, s as Label } from "./router-DSq9Z4Xs.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D9AHXztE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-X6TvJ2r9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const journey = useJourneyStore((s) => s.journey);
	const pastJourneys = useJourneyStore((s) => s.pastJourneys);
	const setJourneyName = useJourneyStore((s) => s.setJourneyName);
	const addPerson = useJourneyStore((s) => s.addPerson);
	const updatePerson = useJourneyStore((s) => s.updatePerson);
	const removePerson = useJourneyStore((s) => s.removePerson);
	const addClub = useJourneyStore((s) => s.addClub);
	const removeClub = useJourneyStore((s) => s.removeClub);
	const addCustomType = useJourneyStore((s) => s.addCustomType);
	const removeCustomType = useJourneyStore((s) => s.removeCustomType);
	const startNewJourney = useJourneyStore((s) => s.startNewJourney);
	const openPastJourney = useJourneyStore((s) => s.openPastJourney);
	const loadSample = useJourneyStore((s) => s.loadSample);
	const [name, setName] = (0, import_react.useState)(journey.name);
	const [personName, setPersonName] = (0, import_react.useState)("");
	const [relation, setRelation] = (0, import_react.useState)("friend");
	const [clubName, setClubName] = (0, import_react.useState)("");
	const [clubMembers, setClubMembers] = (0, import_react.useState)([]);
	const [customType, setCustomType] = (0, import_react.useState)("");
	const [confirmNew, setConfirmNew] = (0, import_react.useState)(false);
	const [confirmSample, setConfirmSample] = (0, import_react.useState)(false);
	const [removeId, setRemoveId] = (0, import_react.useState)(null);
	const unclubbed = (0, import_react.useMemo)(() => {
		const taken = new Set(journey.clubs.flatMap((c) => c.memberIds));
		return journey.people.filter((p) => !taken.has(p.id));
	}, [journey.clubs, journey.people]);
	function saveName() {
		setJourneyName(name);
		toast.success("Journey name saved");
	}
	function onAddPerson() {
		const err = addPerson(personName, relation);
		if (err) {
			toast.error(err);
			return;
		}
		setPersonName("");
		toast.success("Person added");
	}
	function onAddClub() {
		const err = addClub(clubName, clubMembers);
		if (err) {
			toast.error(err);
			return;
		}
		setClubName("");
		setClubMembers([]);
		toast.success("Club created — they share one report head");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-medium tracking-tight",
				children: "Settings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-ink-muted",
				children: "Everything stays on this device, in the browser. Clearing site data deletes the ledger."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Journey name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Shown on the home screen and on the shared report." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: name,
					onChange: (e) => setName(e.target.value),
					onBlur: () => {
						if (name.trim() && name.trim() !== journey.name) saveName();
					},
					placeholder: "Western Ghats drive"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: saveName,
					className: "sm:w-28",
					children: "Save"
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "People" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Add or remove by name. Mark brother / sister to club them later." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "person-name",
							children: "Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "person-name",
							value: personName,
							onChange: (e) => setPersonName(e.target.value),
							placeholder: "Rahul",
							onKeyDown: (e) => {
								if (e.key === "Enter") onAddPerson();
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-sm font-medium",
						children: "Relation"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: RELATIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setRelation(r),
							className: cn("h-11 rounded-full border px-3 text-sm font-medium", relation === r ? "border-accent bg-accent text-accent-fg" : "border-line bg-surface text-ink hover:bg-surface-2"),
							children: RELATION_LABEL[r]
						}, r))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: onAddPerson,
						children: "Add person"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-line",
						children: journey.people.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									defaultValue: p.name,
									onBlur: (e) => {
										const next = e.target.value.trim();
										if (next && next !== p.name) updatePerson(p.id, { name: next });
									}
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: "h-11 w-full rounded-md border border-input bg-surface px-3 text-sm text-ink outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
									value: p.relation,
									onChange: (e) => updatePerson(p.id, { relation: e.target.value }),
									"aria-label": `Relation for ${p.name}`,
									children: RELATIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: r,
										children: RELATION_LABEL[r]
									}, r))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "text-ink-muted",
								onClick: () => setRemoveId(p.id),
								"aria-label": `Remove ${p.name}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
							})]
						}, p.id))
					}),
					journey.people.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ink-muted",
						children: "No one yet. Add the people on this journey."
					}) : null
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Club relatives" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Brother and sister (or any pair) become one head on the report. Everyone else stays separate." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [journey.clubs.map((club) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3 rounded-lg bg-surface-2 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-ink-muted" }), club.name]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-ink-muted",
						children: club.memberIds.map((id) => journey.people.find((p) => p.id === id)?.name).filter(Boolean).join(", ")
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => removeClub(club.id),
						children: "Unclub"
					})]
				}, club.id)), unclubbed.length >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Club name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: clubName,
							onChange: (e) => setClubName(e.target.value),
							placeholder: clubMembers.length >= 2 ? defaultClubName(journey.people, clubMembers) : "Brother & Sister"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonChips, {
						people: unclubbed,
						selected: clubMembers,
						onToggle: (id) => setClubMembers((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: onAddClub,
						children: "Club selected"
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-ink-muted",
					children: "Need at least two unclubbed people. Add names above, then group brother and sister here."
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Custom expense types" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Fuel, food, tea and coffee are already there. Add your own." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: customType,
						onChange: (e) => setCustomType(e.target.value),
						placeholder: "Snacks, Ferry, Temple",
						onKeyDown: (e) => {
							if (e.key === "Enter") {
								addCustomType(customType);
								setCustomType("");
							}
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => {
							addCustomType(customType);
							setCustomType("");
						},
						children: "Add"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [journey.customTypes.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => removeCustomType(t),
						className: "h-11 rounded-full border border-line bg-surface px-3 text-sm text-ink-muted hover:border-danger hover:text-danger",
						children: [t, " ×"]
					}, t)), journey.customTypes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ink-muted",
						children: "No custom types yet."
					}) : null]
				})]
			})] }),
			pastJourneys.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Past journeys" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Open one to view or edit its report." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "space-y-2",
				children: pastJourneys.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => openPastJourney(j.id),
					className: "flex w-full items-center justify-between rounded-lg bg-surface-2 px-3 py-3 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-medium",
						children: j.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-ink-muted",
						children: [
							j.status === "completed" ? "Completed" : "Open",
							" · ",
							j.expenses.length,
							" expenses",
							j.completedAt ? ` · ${formatDayLong(j.completedAt.slice(0, 10))}` : ""
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium text-accent",
						children: "Open"
					})]
				}, j.id))
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setConfirmSample(true),
					children: "Load sample trip"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setConfirmNew(true),
					children: "Start a new journey"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirmNew,
				onOpenChange: setConfirmNew,
				title: "Start a new journey?",
				description: "The current one is kept under Past journeys. People and expenses on this screen will reset.",
				confirmLabel: "Start new",
				onConfirm: () => {
					startNewJourney();
					setName("Untitled journey");
					toast.success("New journey started");
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirmSample,
				onOpenChange: setConfirmSample,
				title: "Load the sample trip?",
				description: "A Western Ghats drive with five people, brother and sister clubbed, and mixed expenses. Your current journey is saved under Past journeys.",
				confirmLabel: "Load sample",
				onConfirm: () => {
					loadSample();
					setName("Western Ghats drive");
					toast.success("Sample trip loaded");
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: Boolean(removeId),
				onOpenChange: (o) => !o && setRemoveId(null),
				title: "Remove this person?",
				description: "They must not appear on any expense. If they do, edit those expenses first.",
				confirmLabel: "Remove",
				destructive: true,
				onConfirm: () => {
					if (!removeId) return;
					const err = removePerson(removeId);
					if (err) toast.error(err);
					else toast.success("Person removed");
					setRemoveId(null);
				}
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
