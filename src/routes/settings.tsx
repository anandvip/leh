import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { PersonChips } from "@/components/person-chips";
import { defaultClubName, useJourneyStore } from "@/lib/store";
import { RELATION_LABEL, RELATIONS, type Relation } from "@/lib/types";
import { formatDayLong } from "@/lib/money";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

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

  const [name, setName] = useState(journey.name);
  const [personName, setPersonName] = useState("");
  const [relation, setRelation] = useState<Relation>("friend");
  const [clubName, setClubName] = useState("");
  const [clubMembers, setClubMembers] = useState<string[]>([]);
  const [customType, setCustomType] = useState("");
  const [confirmNew, setConfirmNew] = useState(false);
  const [confirmSample, setConfirmSample] = useState(false);
  const [removeId, setRemoveId] = useState<string | null>(null);

  const unclubbed = useMemo(() => {
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

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Everything stays on this device, in the browser. Clearing site data deletes the ledger.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Journey name</CardTitle>
          <CardDescription>Shown on the home screen and on the shared report.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 sm:flex-row">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => {
              if (name.trim() && name.trim() !== journey.name) saveName();
            }}
            placeholder="Western Ghats drive"
          />
          <Button onClick={saveName} className="sm:w-28">
            Save
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>People</CardTitle>
          <CardDescription>Add or remove by name. Mark brother / sister to club them later.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="person-name">Name</Label>
            <Input
              id="person-name"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              placeholder="Rahul"
              onKeyDown={(e) => {
                if (e.key === "Enter") onAddPerson();
              }}
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Relation</p>
            <div className="flex flex-wrap gap-2">
              {RELATIONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRelation(r)}
                  className={cn(
                    "h-11 rounded-full border px-3 text-sm font-medium",
                    relation === r
                      ? "border-accent bg-accent text-accent-fg"
                      : "border-line bg-surface text-ink hover:bg-surface-2",
                  )}
                >
                  {RELATION_LABEL[r]}
                </button>
              ))}
            </div>
          </div>
          <Button onClick={onAddPerson}>Add person</Button>

          <ul className="divide-y divide-line">
            {journey.people.map((p) => (
              <li key={p.id} className="flex items-center gap-2 py-3">
                <div className="min-w-0 flex-1 space-y-2">
                  <Input
                    defaultValue={p.name}
                    onBlur={(e) => {
                      const next = e.target.value.trim();
                      if (next && next !== p.name) updatePerson(p.id, { name: next });
                    }}
                  />
                  <select
                    className="h-11 w-full rounded-md border border-input bg-surface px-3 text-sm text-ink outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                    value={p.relation}
                    onChange={(e) => updatePerson(p.id, { relation: e.target.value as Relation })}
                    aria-label={`Relation for ${p.name}`}
                  >
                    {RELATIONS.map((r) => (
                      <option key={r} value={r}>
                        {RELATION_LABEL[r]}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-ink-muted"
                  onClick={() => setRemoveId(p.id)}
                  aria-label={`Remove ${p.name}`}
                >
                  <Trash2 />
                </Button>
              </li>
            ))}
          </ul>
          {journey.people.length === 0 ? (
            <p className="text-sm text-ink-muted">No one yet. Add the people on this journey.</p>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Club relatives</CardTitle>
          <CardDescription>
            Brother and sister (or any pair) become one head on the report. Everyone else stays separate.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {journey.clubs.map((club) => (
            <div key={club.id} className="flex items-start justify-between gap-3 rounded-lg bg-surface-2 p-3">
              <div>
                <p className="flex items-center gap-2 font-medium">
                  <Users className="size-4 text-ink-muted" />
                  {club.name}
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  {club.memberIds
                    .map((id) => journey.people.find((p) => p.id === id)?.name)
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeClub(club.id)}>
                Unclub
              </Button>
            </div>
          ))}

          {unclubbed.length >= 2 ? (
            <>
              <div className="space-y-2">
                <Label>Club name</Label>
                <Input
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  placeholder={
                    clubMembers.length >= 2
                      ? defaultClubName(journey.people, clubMembers)
                      : "Brother & Sister"
                  }
                />
              </div>
              <PersonChips
                people={unclubbed}
                selected={clubMembers}
                onToggle={(id) =>
                  setClubMembers((prev) =>
                    prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
                  )
                }
              />
              <Button variant="outline" onClick={onAddClub}>
                Club selected
              </Button>
            </>
          ) : (
            <p className="text-sm text-ink-muted">
              Need at least two unclubbed people. Add names above, then group brother and sister here.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom expense types</CardTitle>
          <CardDescription>Fuel, food, tea and coffee are already there. Add your own.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={customType}
              onChange={(e) => setCustomType(e.target.value)}
              placeholder="Snacks, Ferry, Temple"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addCustomType(customType);
                  setCustomType("");
                }
              }}
            />
            <Button
              variant="outline"
              onClick={() => {
                addCustomType(customType);
                setCustomType("");
              }}
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {journey.customTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => removeCustomType(t)}
                className="h-11 rounded-full border border-line bg-surface px-3 text-sm text-ink-muted hover:border-danger hover:text-danger"
              >
                {t} ×
              </button>
            ))}
            {journey.customTypes.length === 0 ? (
              <p className="text-sm text-ink-muted">No custom types yet.</p>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {pastJourneys.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Past journeys</CardTitle>
            <CardDescription>Open one to view or edit its report.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {pastJourneys.map((j) => (
              <button
                key={j.id}
                type="button"
                onClick={() => openPastJourney(j.id)}
                className="flex w-full items-center justify-between rounded-lg bg-surface-2 px-3 py-3 text-left"
              >
                <span>
                  <span className="block font-medium">{j.name}</span>
                  <span className="text-xs text-ink-muted">
                    {j.status === "completed" ? "Completed" : "Open"} · {j.expenses.length} expenses
                    {j.completedAt ? ` · ${formatDayLong(j.completedAt.slice(0, 10))}` : ""}
                  </span>
                </span>
                <span className="text-sm font-medium text-accent">Open</span>
              </button>
            ))}
          </CardContent>
        </Card>
      ) : null}

      <div className="flex flex-col gap-2 pb-4">
        <Button variant="outline" onClick={() => setConfirmSample(true)}>
          Load sample trip
        </Button>
        <Button variant="outline" onClick={() => setConfirmNew(true)}>
          Start a new journey
        </Button>
      </div>

      <ConfirmDialog
        open={confirmNew}
        onOpenChange={setConfirmNew}
        title="Start a new journey?"
        description="The current one is kept under Past journeys. People and expenses on this screen will reset."
        confirmLabel="Start new"
        onConfirm={() => {
          startNewJourney();
          setName("Untitled journey");
          toast.success("New journey started");
        }}
      />
      <ConfirmDialog
        open={confirmSample}
        onOpenChange={setConfirmSample}
        title="Load the sample trip?"
        description="A Western Ghats drive with five people, brother and sister clubbed, and mixed expenses. Your current journey is saved under Past journeys."
        confirmLabel="Load sample"
        onConfirm={() => {
          loadSample();
          setName("Western Ghats drive");
          toast.success("Sample trip loaded");
        }}
      />
      <ConfirmDialog
        open={Boolean(removeId)}
        onOpenChange={(o) => !o && setRemoveId(null)}
        title="Remove this person?"
        description="They must not appear on any expense. If they do, edit those expenses first."
        confirmLabel="Remove"
        destructive
        onConfirm={() => {
          if (!removeId) return;
          const err = removePerson(removeId);
          if (err) toast.error(err);
          else toast.success("Person removed");
          setRemoveId(null);
        }}
      />
    </div>
  );
}
