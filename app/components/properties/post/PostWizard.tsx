"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { WizardProvider, useWizard } from "./WizardContext";
import StepLocation from "./steps/StepLocation";
import StepRooms from "./steps/StepRooms";
import StepParking from "./steps/StepParking";
import StepMedia from "./steps/StepMedia";
import StepPrice from "./steps/StepPrice";
import StepAmenities from "./steps/StepAmenities";
import StepIntro from "./steps/StepIntro";

type Props = { initialStep: number };

export default function PostWizard({ initialStep }: Props) {
  // Provider holds all form state (with localStorage autosave)
  return (
    <WizardProvider>
      <WizardBody initialStep={initialStep} />
    </WizardProvider>
  );
}

/* ------------------------------- Shell ------------------------------- */

function PostCard({ children }: { children: React.ReactNode }) {
  const { PRIMARY } = useWizard();
  return (
    <div
      className="mx-auto w-full max-w-3xl rounded-[22px] border-2 p-6 shadow-xl
                 overflow-visible max-h-none h-auto"   // <- key bits
      style={{ borderColor: PRIMARY, background: PRIMARY }}
    >
      <h2 className="mb-6 text-3xl font-semibold text-white">Post it for free !</h2>
      {children}
    </div>
  );
}

function WizardBody({ initialStep }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams(); // can be null during hydration

  // Read the current step from URL, fall back to initialStep
  const step = useMemo(() => {
    const raw = searchParams?.get("step");
    const n = Number.parseInt(raw ?? String(initialStep), 10);
    return Number.isFinite(n) ? n : initialStep;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, initialStep]);

  const maxStep = 6; // 0..6

  // Helper to write step back to URL (no scroll jump)
  const setStep = (n: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("step", String(Math.min(maxStep, Math.max(0, n))));
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // Normalize URL once if it had no step
  useEffect(() => {
    if (!searchParams?.get("step")) setStep(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data } = useWizard();

  // Gate the Next/Let’s Go button per step
  const nextEnabled = useMemo(() => {
    switch (step) {
      case 0: {
        const phoneOk = (data.phone || "").replace(/\D/g, "").length === 10;
        const purposeOk = !!data.purpose;
        const typeOk = data.propertyTypes.length > 0;
        return phoneOk && purposeOk && typeOk;
      }
      case 4: // media
        return !data.video || data.video.size <= 80 * 1024 * 1024;
      case 5: // price
        return !!data.price;
      default:
        return true;
    }
  }, [step, data]);

  const onNext = () => setStep(step + 1);
  const onPrev = () => setStep(step - 1);
  const onSubmit = async () => {
    // TODO: post to your API
    alert("Submit -> wire to API");
  };

  return (
    <PostCard>
      {step === 0 && <StepIntro />}
      {step === 1 && <StepLocation />}
      {step === 2 && <StepRooms />}
      {step === 3 && <StepParking />}
      {step === 4 && <StepMedia />}
      {step === 5 && <StepPrice />}
      {step === 6 && <StepAmenities />}

      {/* Footer nav */}
      <div className="mt-6 flex gap-3">
        {step > 0 && (
          <button
            onClick={onPrev}
            className="w-32 rounded-2xl bg-white px-4 py-3 font-semibold"
          >
            Back
          </button>
        )}

        {step < maxStep ? (
          <button
            onClick={onNext}
            disabled={!nextEnabled}
            className="ml-auto w-full rounded-2xl bg-white px-5 py-3 text-lg font-semibold disabled:cursor-not-allowed disabled:opacity-70"
          >
            {step === 0 || step === 4 || step === 5 ? "Let’s Go" : "next"}
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="ml-auto w-full rounded-2xl bg-white px-5 py-3 text-lg font-semibold"
          >
            Let’s Go
          </button>
        )}
      </div>
    </PostCard>
  );
}