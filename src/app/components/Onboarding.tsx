import * as React from "react";

export function Onboarding(props: { onComplete: () => void }) {
  const { onComplete } = props;
  const [step, setStep] = React.useState<1 | 2>(1);

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {step === 1 ? (
          <div className="flex flex-col justify-between min-h-[600px] py-12">
            <div className="space-y-10">
              <div className="space-y-3">
                <h1 className="text-5xl tracking-tight text-[#2B2B2B]">Don't Forget</h1>
              </div>

              <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
                <p>This is a small pause to help you feel clear.</p>
                <p>It’s not a productivity tool.</p>
                <p>There’s nothing to keep up with, and nothing to maintain.</p>
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-[#3A3A3A] text-[#F9F7F4] py-4 px-8 rounded-lg text-base hover:bg-[#4A4A4A] transition-colors"
              >
                Next
              </button>

              <button
                type="button"
                onClick={onComplete}
                className="w-full text-[#9B9B9B] py-2 text-sm hover:text-[#6B6B6B] transition-colors"
              >
                Skip and start
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-between min-h-[600px] py-12">
            <div className="space-y-10">
              <div className="space-y-3">
                <h2 className="text-3xl tracking-tight text-[#2B2B2B] leading-snug">What to expect</h2>
              </div>

              <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
                <p>One sentence is enough.</p>
                <p>You can skip. You can leave. You can come back later.</p>
                <p>For now, it remembers only on this device.</p>
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="button"
                onClick={onComplete}
                className="w-full bg-[#3A3A3A] text-[#F9F7F4] py-4 px-8 rounded-lg text-base hover:bg-[#4A4A4A] transition-colors"
              >
                Start now
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-[#9B9B9B] py-2 text-sm hover:text-[#6B6B6B] transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

