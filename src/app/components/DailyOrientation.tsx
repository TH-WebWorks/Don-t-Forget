import * as React from "react";
import { clearToday, getToday, getYesterday, setToday, type MemoryData } from "../../lib/memory";

type Mode =
  | "onboarding"
  | "carry_forward"
  | "morning"
  | "midday"
  | "evening"
  | "closed";

const ONBOARDED_KEY = "dont-forget:onboarded";

function getLocalDateString(now: Date): string {
  const yyyy = String(now.getFullYear());
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function isOnboarded(): boolean {
  return localStorage.getItem(ONBOARDED_KEY) === "1";
}

function setOnboarded(): void {
  localStorage.setItem(ONBOARDED_KEY, "1");
}

function normalizeTodayForDate(today: MemoryData | null, date: string): MemoryData | null {
  if (!today) return null;
  if (today.date !== date) return null;
  return today;
}

function deriveInitialMode(params: {
  onboarded: boolean;
  today: MemoryData | null;
  yesterday: MemoryData | null;
  now: Date;
}): Mode {
  const { onboarded, today, yesterday, now } = params;

  if (!onboarded) return "onboarding";
  if (!today && (yesterday?.intention || yesterday?.practical?.length)) return "carry_forward";

  const hour = now.getHours();
  if (today && hour >= 17 && !today.reflection) return "evening";
  if (today) return "midday";
  return "morning";
}

export function DailyOrientation() {
  const now = React.useMemo(() => new Date(), []);
  const todayDate = React.useMemo(() => getLocalDateString(now), [now]);

  const [mode, setMode] = React.useState<Mode>("morning");
  const [closedSummary, setClosedSummary] = React.useState<string>("");
  const [devModeOverride, setDevModeOverride] = React.useState<"morning" | "midday" | "evening" | null>(null);

  const [onboardingIntention, setOnboardingIntention] = React.useState("");
  const [morningIntention, setMorningIntention] = React.useState("");
  const [eveningReflection, setEveningReflection] = React.useState("");
  const [middayNote, setMiddayNote] = React.useState("");

  const [today, setTodayState] = React.useState<MemoryData | null>(null);
  const [yesterday, setYesterdayState] = React.useState<MemoryData | null>(null);

  React.useEffect(() => {
    const storedTodayRaw = getToday();
    const storedYesterday = getYesterday();
    const normalizedToday = normalizeTodayForDate(storedTodayRaw, todayDate);

    if (storedTodayRaw && !normalizedToday) {
      clearToday();
    }

    setTodayState(normalizedToday);
    setYesterdayState(storedYesterday);

    const initial = deriveInitialMode({
      onboarded: isOnboarded(),
      today: normalizedToday,
      yesterday: storedYesterday,
      now,
    });
    setMode(initial);
  }, [now, todayDate]);

  function closeInteraction(summary: string) {
    setClosedSummary(summary);
    setMode("closed");
  }

  function handleCompleteOnboarding() {
    setOnboarded();

    const data: MemoryData = onboardingIntention.trim()
      ? { date: todayDate, intention: onboardingIntention.trim() }
      : { date: todayDate };

    setToday(data);
    setTodayState(data);
    closeInteraction("Done for now.");
  }

  function handleSkipOnboarding() {
    setOnboarded();
    closeInteraction("Done for now.");
  }

  function handleSubmitMorning() {
    const data: MemoryData = morningIntention.trim()
      ? { date: todayDate, intention: morningIntention.trim() }
      : { date: todayDate };

    setToday(data);
    setTodayState(data);
    closeInteraction("Done for now.");
  }

  function handleSubmitEvening() {
    const current = today ?? { date: todayDate };
    const reflection = eveningReflection.trim();
    const next: MemoryData = reflection ? { ...current, reflection } : current;

    setToday(next);
    setTodayState(next);
    closeInteraction("Done.");
  }

  function handleSubmitMidday() {
    const note = middayNote.trim();
    const current = today ?? { date: todayDate };

    const next: MemoryData = note
      ? {
          ...current,
          practical: [note],
        }
      : current;

    setToday(next);
    setTodayState(next);
    setMiddayNote("");
    closeInteraction("Done.");
  }

  function handleCarryForwardKeep() {
    const intention = yesterday?.intention?.trim();
    const next: MemoryData = intention ? { date: todayDate, intention } : { date: todayDate };

    setToday(next);
    setTodayState(next);
    closeInteraction("Done for now.");
  }

  function handleCarryForwardNotToday() {
    const next: MemoryData = { date: todayDate };
    setToday(next);
    setTodayState(next);
    closeInteraction("Done for now.");
  }

  const isDev = (import.meta as unknown as { env?: { DEV?: boolean } }).env?.DEV === true;
  const effectiveMode: Mode =
    mode === "closed" ? "closed" : isDev && devModeOverride ? devModeOverride : mode;

  const page = (content: React.ReactNode) => (
    <div className="min-h-screen bg-[#F9F7F4] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {content}
        {isDev ? (
          <div className="mt-6 flex items-center justify-between gap-3 rounded-lg border border-[#E5E5E5] bg-white px-3 py-2">
            <div className="text-xs tracking-wide text-[#9B9B9B]">DEV</div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="text-xs text-[#6B6B6B] hover:text-[#2B2B2B] transition-colors"
                onClick={() => setDevModeOverride("morning")}
              >
                Morning
              </button>
              <button
                type="button"
                className="text-xs text-[#6B6B6B] hover:text-[#2B2B2B] transition-colors"
                onClick={() => setDevModeOverride("midday")}
              >
                Midday
              </button>
              <button
                type="button"
                className="text-xs text-[#6B6B6B] hover:text-[#2B2B2B] transition-colors"
                onClick={() => setDevModeOverride("evening")}
              >
                Evening
              </button>
              <span className="text-xs text-[#CACACA]">·</span>
              <button
                type="button"
                className="text-xs text-[#9B9B9B] hover:text-[#6B6B6B] transition-colors"
                onClick={() => setDevModeOverride(null)}
              >
                Reset
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );

  const screen = (params: { header?: React.ReactNode; body: React.ReactNode; footer: React.ReactNode }) => (
    <section className="flex flex-col justify-between min-h-[600px] py-12">
      <div className="space-y-10">
        {params.header ? <div className="space-y-2">{params.header}</div> : null}
        <div className="space-y-6 text-[#6B6B6B] leading-relaxed">{params.body}</div>
      </div>
      <div className="space-y-4">{params.footer}</div>
    </section>
  );

  const primaryButtonClass =
    "w-full bg-[#3A3A3A] text-[#F9F7F4] py-4 px-8 rounded-lg text-base hover:bg-[#4A4A4A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6B6B6B] focus-visible:ring-offset-[#F9F7F4]";
  const secondaryButtonClass =
    "w-full text-[#9B9B9B] py-2 text-sm hover:text-[#6B6B6B] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#CACACA] focus-visible:ring-offset-[#F9F7F4]";
  const inputClass =
    "w-full bg-white border border-[#E5E5E5] rounded-lg px-4 py-3 text-[#2B2B2B] placeholder:text-[#CACACA] focus:outline-none focus:border-[#9B9B9B] focus:ring-2 focus:ring-[#E5E5E5]";
  const textAreaClass =
    "w-full bg-white border border-[#E5E5E5] rounded-lg p-4 text-[#2B2B2B] placeholder:text-[#CACACA] focus:outline-none focus:border-[#9B9B9B] focus:ring-2 focus:ring-[#E5E5E5] resize-none leading-relaxed";

  function exitClosedState() {
    const next = deriveInitialMode({
      onboarded: isOnboarded(),
      today,
      yesterday,
      now,
    });
    setMode(next);
  }

  if (effectiveMode === "closed") {
    return page(
      screen({
        header: (
          <>
            <h2 className="text-3xl tracking-tight text-[#2B2B2B] leading-snug">Done.</h2>
          </>
        ),
        body: <p>{closedSummary || "Done for now."}</p>,
        footer: (
          <button type="button" onClick={exitClosedState} className={secondaryButtonClass}>
            Close
          </button>
        ),
      }),
    );
  }

  if (effectiveMode === "onboarding") {
    return page(
      screen({
        header: <h2 className="text-3xl tracking-tight text-[#2B2B2B] leading-snug">Before you start</h2>,
        body: (
          <div className="space-y-3">
            <p>One sentence is enough.</p>
            <label className="block space-y-2">
              <span className="text-sm text-[#9B9B9B]">If you want, name a simple intention for today.</span>
              <input
                value={onboardingIntention}
                onChange={(e) => setOnboardingIntention(e.target.value)}
                type="text"
                placeholder="Optional"
                className={inputClass}
              />
            </label>
          </div>
        ),
        footer: (
          <>
            <button type="button" onClick={handleCompleteOnboarding} className={primaryButtonClass}>
              Continue
            </button>
            <button type="button" onClick={handleSkipOnboarding} className={secondaryButtonClass}>
              Skip
            </button>
          </>
        ),
      }),
    );
  }

  if (effectiveMode === "carry_forward") {
    return page(
      screen({
        header: <h2 className="text-3xl tracking-tight text-[#2B2B2B] leading-snug">From yesterday</h2>,
        body: (
          <>
            <p>Only if it still fits.</p>
            <div className="rounded-lg bg-white border border-[#E5E5E5] p-4 text-[#2B2B2B]">
              {yesterday?.intention || "Nothing to carry forward."}
            </div>
          </>
        ),
        footer: (
          <>
            <button type="button" onClick={handleCarryForwardKeep} className={primaryButtonClass}>
              Keep in mind
            </button>
            <button type="button" onClick={handleCarryForwardNotToday} className={secondaryButtonClass}>
              Not today
            </button>
          </>
        ),
      }),
    );
  }

  if (effectiveMode === "morning") {
    return page(
      screen({
        header: (
          <>
            <h2 className="text-3xl tracking-tight text-[#2B2B2B] leading-snug">A small pause</h2>
            <p className="text-sm text-[#9B9B9B]">You can keep this simple.</p>
          </>
        ),
        body: (
          <label className="block space-y-2">
            <span className="text-sm text-[#9B9B9B]">What matters most to hold in mind today?</span>
            <input
              value={morningIntention}
              onChange={(e) => setMorningIntention(e.target.value)}
              type="text"
              placeholder="One sentence is enough"
              className={inputClass}
            />
          </label>
        ),
        footer: (
          <>
            <button type="button" onClick={handleSubmitMorning} className={primaryButtonClass}>
              Done
            </button>
            <button type="button" onClick={() => closeInteraction("Done for now.")} className={secondaryButtonClass}>
              Skip
            </button>
          </>
        ),
      }),
    );
  }

  if (effectiveMode === "evening") {
    const savedThought = today?.practical?.[0]?.trim() || "";
    const savedIntention = today?.intention?.trim() || "";

    return page(
      screen({
        header: (
          <>
            <h2 className="text-3xl tracking-tight text-[#2B2B2B] leading-snug">Before you close the day</h2>
            <p className="text-sm text-[#9B9B9B]">Just enough to mark what happened.</p>
          </>
        ),
        body: (
          <>
            {savedIntention ? (
              <div className="rounded-lg bg-white border border-[#E5E5E5] p-4 text-[#2B2B2B]">
                {savedIntention}
              </div>
            ) : null}

            {savedThought ? (
              <div className="rounded-lg bg-white border border-[#E5E5E5] p-4 text-[#2B2B2B]">
                {savedThought}
              </div>
            ) : null}

            <label className="block space-y-2">
              <span className="text-sm text-[#9B9B9B]">Anything worth noting? (optional)</span>
              <textarea
                value={eveningReflection}
                onChange={(e) => setEveningReflection(e.target.value)}
                rows={5}
                placeholder="One sentence is enough."
                className={textAreaClass}
              />
            </label>
          </>
        ),
        footer: (
          <>
            <button type="button" onClick={handleSubmitEvening} className={primaryButtonClass}>
              Done
            </button>
            <button type="button" onClick={() => closeInteraction("Done.")} className={secondaryButtonClass}>
              Skip
            </button>
          </>
        ),
      }),
    );
  }

  if (effectiveMode === "midday") {
    const savedThought = today?.practical?.[0]?.trim() || "";

    return page(
      screen({
        header: (
          <>
            <h2 className="text-3xl tracking-tight text-[#2B2B2B] leading-snug">For today</h2>
          </>
        ),
        body: (
          <>
            <p className="text-[#6B6B6B]">Here’s what you said mattered today.</p>
            <div className="rounded-lg bg-white border border-[#E5E5E5] p-4 text-[#2B2B2B]">
              {today?.intention || "Nothing saved yet."}
            </div>

            {savedThought ? (
              <div className="rounded-lg bg-white border border-[#E5E5E5] p-4 text-[#2B2B2B]">
                {savedThought}
              </div>
            ) : null}

            <label className="block space-y-2">
              <span className="text-sm text-[#9B9B9B]">Add one thought (optional)</span>
              <textarea
                value={middayNote}
                onChange={(e) => setMiddayNote(e.target.value)}
                rows={4}
                placeholder="Optional"
                className={textAreaClass}
              />
            </label>
          </>
        ),
        footer: (
          <button type="button" onClick={handleSubmitMidday} className={primaryButtonClass}>
            Done
          </button>
        ),
      }),
    );
  }

  return page(
    screen({
      header: <h2 className="text-3xl tracking-tight text-[#2B2B2B] leading-snug">For today</h2>,
      body: (
        <>
          <p className="text-[#6B6B6B]">Here’s what you said mattered today.</p>
          <div className="rounded-lg bg-white border border-[#E5E5E5] p-4 text-[#2B2B2B]">
            {today?.intention || "Nothing saved yet."}
          </div>
        </>
      ),
      footer: (
        <button type="button" onClick={() => closeInteraction("Done for now.")} className={primaryButtonClass}>
          Done
        </button>
      ),
    }),
  );
}

