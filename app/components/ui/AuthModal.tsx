"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import axios from 'axios';
type Step = "chooser" | "login" | "intent" | "identity" | "verify"; // 🔧 CHANGED: include "login", remove "signup"
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
  const [intent, setIntent] = useState<"buy" | "sell" | null>(null);
  const [contactMethod, setContactMethod] = useState("email");
  const [contactValue, setContactValue] = useState(""); 

  // identity entry (email/phone)
  const [identityValue, setIdentityValue] = useState("");

  // OTP state (4 boxes)
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [accepted, setAccepted] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([null, null, null, null]);

  const [loginValue, setLoginValue] = useState({loginEmail : "", loginPassword : ""})

  const handleLoginChange = (e : ChangeEvent<HTMLInputElement>) => {

    setLoginValue({...loginValue, [e.target.name] : e.target.value});
  }

  const handleLoginSubmit = async (e : ChangeEvent<HTMLInputElement>) => {

    e.preventDefault();

      const config = {
        url : `http://localhost:8080/users/login`,
        method : 'POST',
        data : {
          email : loginValue.loginEmail,
          password : loginValue.loginPassword
        },
        headers : {
          'Conten-Type' : 'application/json'
        }
      };

      const response = await axios(config);

      if (response.status == 200) {
          const data = response.data;
          const {access_token} = data;
          const {first_name, last_name, email} = data.user;

          const fullName = first_name + ' ' + last_name;

          localStorage.setItem('access_token', access_token);
          localStorage.setItem('email', email);
          localStorage.setItem('full_name', fullName);

          window.location.reload();
      } else {
        console.log(response.status, response.data);
        alert('Wrong user or password');
      }
    
  }

  useEffect(() => {
    if (open) {
      setStep("chooser");
      setMode("otp");
      setOtp(["", "", "", ""]);
      setAccepted(false);
      setIdentityValue("");
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
            <h2 className="text-2xl font-semibold leading-tight">
              {step === "verify" ? "Verify your account" : "Sign up"}
            </h2>
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
                onClick={() => { setStep("intent"); }}  // 🔧 CHANGED: go to intent, not signup
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

        {/* Step: login */}
        {step === "login" && (
          <form onSubmit={handleLoginSubmit} className="pt-4">
            <label className="mb-2 block text-base font-semibold">Email</label>
            <input
              value={loginValue.loginEmail}
              onChange={handleLoginChange}
              type="email"
              placeholder="you@example.com"
              name="loginEmail"
              className="mb-4 w-full rounded-xl border border-black/20 bg-[#C76033]/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#C76033]"
            />
            <label className="mb-2 block text-base font-semibold">Password</label>
            <input
              value={loginValue.loginPassword}
              onChange={handleLoginChange}
              type="password"
              name="loginPassword"
              placeholder="Enter Password"
              className="mb-5 w-full rounded-xl border border-black/20 bg-[#C76033]/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#C76033]"
            />
            <button 
            type="submit"
            className="w-full rounded-2xl bg-[#C76033] px-5 py-3 font-semibold text-white">
              Login
            </button>
          </form>
        )}

        {/* Step: intent (Buy / Sell) */}
{step === "intent" && (
  <div className="pt-4">
    <div className="mt-2 space-y-4">
      <p className="text-lg font-medium">What are you here for?</p>
      <div className="flex gap-3">
        <button
          onClick={() => setIntent("buy")}
          className={clsx(
            "flex-1 rounded-full px-4 py-2 font-semibold",
            intent === "buy"
              ? "bg-[#C76033] text-white"
              : "bg-[#C76033]/20 text-[#C76033]"
          )}
        >
          Buy a property
        </button>
        <button
          onClick={() => setIntent("sell")}
          className={clsx(
            "flex-1 rounded-full px-4 py-2 font-semibold",
            intent === "sell"
              ? "bg-[#C76033] text-white"
              : "bg-[#C76033]/20 text-[#C76033]"
          )}
        >
          Sell a Property
        </button>
      </div>
      <button
        onClick={() => setStep("identity")}
        disabled={!intent} // disable until user selects
        className={clsx(
          "mt-2 w-full rounded-2xl px-5 py-3 font-semibold",
          intent
            ? "bg-[#C76033] text-white"
            : "bg-[#C76033]/20 text-black/60 cursor-not-allowed"
        )}
      >
        Next
      </button>
    </div>
  </div>
)}

        {/* Step: identity (Email or Phone) */}
        {step === "identity" && (
        <div className="pt-4">
          <div className="mt-2 space-y-4">
            <p className="text-lg font-medium">Choose how you want to continue</p>

            {/* Toggle buttons for Email / Phone */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setContactMethod("email");
                  setContactValue(""); // clear input on switch
                }}
                className={clsx(
                  "flex-1 rounded-full px-4 py-2 font-semibold",
                  contactMethod === "email"
                    ? "bg-[#C76033] text-white"
                    : "bg-[#C76033]/20 text-[#C76033]"
                )}
              >
                Email
              </button>
              <button
                onClick={() => {
                  setContactMethod("phone");
                  setContactValue(""); // clear input on switch
                }}
                className={clsx(
                  "flex-1 rounded-full px-4 py-2 font-semibold",
                  contactMethod === "phone"
                    ? "bg-[#C76033] text-white"
                    : "bg-[#C76033]/20 text-[#C76033]"
                )}
              >
                Phone
              </button>
            </div>

            {/* Input field stays always */}
            <input
              type={contactMethod === "email" ? "email" : "tel"}
              placeholder={
                contactMethod === "email" ? "Enter your email" : "Enter your phone"
              }
              className="w-full rounded-xl border border-black/20 bg-[#C76033]/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#C76033]"
              value={contactValue}
              onChange={(e) => {
                let val = e.target.value;

                if (contactMethod === "phone") {
                  // Only allow numbers, limit to 10 digits
                  val = val.replace(/[^0-9]/g, "").slice(0, 10);
                }

                setContactValue(val);
              }}
            />

            <button
              onClick={() => setStep("verify")}
              disabled={
                !contactValue ||
                (contactMethod === "phone" && contactValue.length !== 10) || // phone must be 10 digits
                (contactMethod === "email" &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue)) // email must be valid
              }
              className={clsx(
                "mt-2 w-full rounded-2xl px-5 py-3 font-semibold",
                contactValue &&
                ((contactMethod === "phone" && contactValue.length === 10) ||
                  (contactMethod === "email" &&
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue)))
                  ? "bg-[#C76033] text-white"
                  : "bg-[#C76033]/20 text-black/60 cursor-not-allowed"
              )}
            >
              Continue
            </button>
          </div>
        </div>
        )}

        {/* Step: verify (OTP / Password) */}
        {step === "verify" && (
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
                <div className="mb-6 flex gap-4">
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => { inputsRef.current[i] = el; }}
                      inputMode="numeric"
                      maxLength={1}
                      value={d}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="h-12 w-12 rounded-lg border border-black/20 text-center text-xl outline-none focus:ring-2 focus:ring-[#C76033]"
                    />
                  ))}
                </div>

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
                  onClick={() => onOpenChange(false)}
                  className={clsx(
                    "mt-3 w-full rounded-2xl px-5 py-3 text-base font-semibold",
                    canSendOtp
                      ? "bg-[#C76033] text-white"
                      : "bg-[#C76033]/20 text-black/60 cursor-not-allowed"
                  )}
                >
                  Verify & Continue
                </button>
              </>
            ) : (
              <>
                <label className="mb-2 block text-base font-semibold">Create Password</label>
                <div className="mb-4">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="w-full rounded-xl border border-black/20 bg-[#C76033]/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#C76033]"
                  />
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
                  onClick={() => onOpenChange(false)}
                  className={clsx(
                    "mt-3 w-full rounded-2xl px-5 py-3 text-base font-semibold",
                    accepted
                      ? "bg-[#C76033] text-white"
                      : "bg-[#C76033]/20 text-black/60 cursor-not-allowed"
                  )}
                >
                  Create Account
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
