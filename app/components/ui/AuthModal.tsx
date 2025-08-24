"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type Step = "chooser" | "signup" | "login" | "intent";
type Mode = "otp" | "password";

export default function AuthModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [step, setStep] = useState<Step>("chooser");
  const [mode, setMode] = useState<Mode>("otp");

  // OTP state (4 boxes)
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [accepted, setAccepted] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([null, null, null, null]);

  useEffect(() => {
    if (open) {
      // reset when opening
      setStep("chooser");
      setMode("otp");
      setOtp(["", "", "", ""]);
      setAccepted(false);
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  // close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpenChange]);

  if (!open) return null;

  const canSendOtp = accepted && otp.join("").length === 4;

  const handleOtpChange = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return; // only one digit
    const next = [...otp];
    next[idx] = val;
    setOtp(next);

    // move focus
    if (val && idx < 3) inputsRef.current[idx + 1]?.focus();
    if (!val && idx > 0) inputsRef.current[idx - 1]?.focus();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      onClick={() => onOpenChange(false)}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[min(92vw,520px)] rounded-[22px] border-2 border-[#C76033] bg-white p-6 md:p-7 shadow-xl"
      >
        {/* Close */}
        <button
          aria-label="Close"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded p-1 text-black/70 hover:bg-black/5"
        >
          ✕
        </button>

        {/* Headline */}
        {step !== "chooser" && (
          <>
            <h2 className="text-2xl font-semibold leading-tight">Sign up</h2>
            <p className="mt-1 text-sm font-medium text-[#C76033]/80">
              Get started with Property Dastak
            </p>
          </>
        )}

        {/* Step: chooser */}
        {step === "chooser" && (
          <div className="py-6">
            <h2 className="mb-6 text-3xl font-semibold text-[#C76033]">Property Dastak</h2>

            <div className="space-y-3">
              <button
                onClick={() => { setStep("signup"); setMode("otp"); }}
                className="w-full rounded-xl bg-[#C76033] px-5 py-3 text-white font-medium"
              >
                Sign Up
              </button>
              <button
                onClick={() => setStep("login")}
                className="w-full rounded-xl border border-[#C76033] px-5 py-3 font-medium text-[#C76033]"
              >
                Login
              </button>
            </div>
          </div>
        )}

        {/* Step: signup */}
        {step === "signup" && (
          <div className="pt-4">
            {/* Tabs */}
            <div className="mb-5 flex gap-4">
              <button
                onClick={() => setMode("otp")}
                className={clsx(
                  "rounded-full px-5 py-2 text-sm font-semibold",
                  mode === "otp"
                    ? "bg-[#C76033] text-white"
                    : "bg-[#C76033]/15 text-[#C76033]"
                )}
              >
                OTP
              </button>
              <button
                onClick={() => setMode("password")}
                className={clsx(
                  "rounded-full px-5 py-2 text-sm font-semibold",
                  mode === "password"
                    ? "bg-[#C76033] text-white"
                    : "bg-[#C76033]/15 text-[#C76033]"
                )}
              >
                Password
              </button>
            </div>

            {mode === "otp" ? (
              <>
                {/* OTP inputs */}
                <div className="mb-6 flex gap-4">
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => {inputsRef.current[i] = el}}
                      inputMode="numeric"
                      maxLength={1}
                      value={d}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="h-12 w-12 rounded-lg border border-black/20 text-center text-xl outline-none focus:ring-2 focus:ring-[#C76033]"
                    />
                  ))}
                </div>

                {/* Terms */}
                <label className="mb-4 flex cursor-pointer items-center gap-2 text-sm text-black">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-black/30 accent-[#C76033]"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                  />
                  <span>
                    I accept all the terms and condition{" "}
                    <a href="/terms" className="font-semibold text-[#C76033] underline">
                      View T&amp;C
                    </a>
                  </span>
                </label>

                <button
                  disabled={!canSendOtp}
                  onClick={() => setStep("intent")}
                  className={clsx(
                    "mt-3 w-full rounded-2xl px-5 py-3 text-base font-semibold",
                    canSendOtp
                      ? "bg-[#C76033] text-white"
                      : "bg-[#C76033]/20 text-black/60 cursor-not-allowed"
                  )}
                >
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <label className="mb-2 block text-base font-semibold">Enter Password</label>
                <div className="mb-4">
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">@</span>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      className="w-full rounded-xl border border-black/20 bg-[#C76033]/10 px-8 py-3 outline-none focus:ring-2 focus:ring-[#C76033]"
                    />
                  </div>
                </div>
                <label className="mb-4 flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-black/30 accent-[#C76033]"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                  />
                  <span>
                    I accept all the terms and condition{" "}
                    <a href="/terms" className="font-semibold text-[#C76033] underline">
                      View T&amp;C
                    </a>
                  </span>
                </label>
                <button
                  disabled={!accepted}
                  onClick={() => setStep("intent")}
                  className={clsx(
                    "mt-3 w-full rounded-2xl px-5 py-3 text-base font-semibold",
                    accepted
                      ? "bg-[#C76033] text-white"
                      : "bg-[#C76033]/20 text-black/60 cursor-not-allowed"
                  )}
                >
                  Send OTP
                </button>
              </>
            )}
          </div>
        )}

        {/* Step: login (simple example) */}
        {step === "login" && (
          <div className="pt-4">
            <label className="mb-2 block text-base font-semibold">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mb-4 w-full rounded-xl border border-black/20 bg-[#C76033]/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#C76033]"
            />
            <label className="mb-2 block text-base font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="mb-5 w-full rounded-xl border border-black/20 bg-[#C76033]/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#C76033]"
            />
            <button className="w-full rounded-2xl bg-[#C76033] px-5 py-3 font-semibold text-white">
              Login
            </button>
          </div>
        )}

        {/* Step: intent (Buy / Sell) */}
        {step === "intent" && (
          <div className="pt-4">
            <h2 className="text-2xl font-semibold leading-tight">Sign up</h2>
            <p className="mt-1 text-sm font-medium text-[#C76033]/80">
              Get started with Property Dastak
            </p>

            <div className="mt-6 space-y-4">
              <p className="text-lg font-medium">What are you here for ?</p>
              <div className="flex gap-3">
                <button className="flex-1 rounded-full bg-[#C76033] px-4 py-2 font-semibold text-white">
                  Buy a property
                </button>
                <button className="flex-1 rounded-full bg-[#C76033]/20 px-4 py-2 font-semibold text-[#C76033]">
                  Sell a Property
                </button>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="mt-2 w-full rounded-2xl bg-[#C76033] px-5 py-3 font-semibold text-white"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
