import { cn } from "@/lib/utils";
import type { Person } from "@/lib/types";

type Props = {
  people: Person[];
  selected: string[];
  onToggle: (id: string) => void;
  multiple?: boolean;
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
}

export function PersonChips({ people, selected, onToggle, multiple = true }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {people.map((person) => {
        const on = selected.includes(person.id);
        return (
          <button
            key={person.id}
            type="button"
            onClick={() => onToggle(person.id)}
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full border px-3 text-sm font-medium transition-[background-color,border-color,color] duration-150",
              on
                ? "border-accent bg-accent text-accent-fg"
                : "border-line bg-surface text-ink hover:bg-surface-2",
            )}
            aria-pressed={on}
          >
            <span
              className={cn(
                "flex size-6 items-center justify-center rounded-full text-xs font-semibold",
                on ? "bg-accent-fg/15" : "bg-surface-2",
              )}
            >
              {initials(person.name)}
            </span>
            {person.name}
          </button>
        );
      })}
      {multiple && people.length > 1 ? (
        <button
          type="button"
          onClick={() => {
            const allOn = people.every((p) => selected.includes(p.id));
            if (allOn) {
              people.forEach((p) => {
                if (selected.includes(p.id)) onToggle(p.id);
              });
            } else {
              people.forEach((p) => {
                if (!selected.includes(p.id)) onToggle(p.id);
              });
            }
          }}
          className="inline-flex h-11 items-center rounded-full border border-line bg-surface px-3 text-sm font-medium text-ink-muted hover:bg-surface-2"
        >
          {people.every((p) => selected.includes(p.id)) ? "Clear" : "Everyone"}
        </button>
      ) : null}
    </div>
  );
}
