import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { ReportView } from "@/components/report-view";
import { useJourneyStore } from "@/lib/store";
import { useState } from "react";

export const Route = createFileRoute("/report")({ component: ReportPage });

function ReportPage() {
  const journey = useJourneyStore((s) => s.journey);
  const completeJourney = useJourneyStore((s) => s.completeJourney);
  const reopenJourney = useJourneyStore((s) => s.reopenJourney);
  const [confirmComplete, setConfirmComplete] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-medium tracking-tight">Report card</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Live totals. Edit any line and the settlement updates. Share opens your phone’s share sheet —
            pick Signal if it’s installed.
          </p>
        </div>
      </div>

      {journey.status === "open" ? (
        <Button className="w-full h-12" onClick={() => setConfirmComplete(true)}>
          Complete journey
        </Button>
      ) : (
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={reopenJourney}>
            Reopen
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate({ to: "/settings" })}
          >
            Start a new one
          </Button>
        </div>
      )}

      <ReportView />

      <ConfirmDialog
        open={confirmComplete}
        onOpenChange={setConfirmComplete}
        title="Mark this journey complete?"
        description="The report stays editable. Completing just stamps it as finished so you can share a clean card."
        confirmLabel="Complete"
        onConfirm={completeJourney}
      />
    </div>
  );
}
