"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import axios from "axios";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
type Step = "chooser" | "login" | "intent" | "profile" | "identity" | "verify";
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
  const [userClass, setUserClass] = useState<"buyer" | "seller" | "">("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [accepted, setAccepted] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([null, null, null, null]);

  // login states
  const [loginValue, setLoginValue] = useState({ loginEmail: "", loginPassword: "" });

  // ✅ login handlers (unchanged)
  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginValue({ ...loginValue, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const config = {
      url: `http://localhost:8080/users/login`,
      method: "POST",
      data: {
        email: loginValue.loginEmail,
        password: loginValue.loginPassword,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios(config);

      if (response.status === 200) {
        const data = response.data;
        const { access_token } = data;
        const { first_name, last_name, email, class : userClass } = data.user;

        const fullName = first_name + " " + last_name;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("email", email);
        localStorage.setItem("full_name", fullName);
        localStorage.setItem("class", userClass);

        window.location.reload();
      }
    } catch (err: any) {
      console.log(err);

      if (err.name == 'AxiosError') {
        if (err.status == 401) {
          toast.error('Wrong username or password.');
        }
      }

    }
  };

  // ✅ signup handler (new)
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const config = {
        url: `http://localhost:8080/users/signup`,
        method: "POST",
        data: {
          first_name: firstName,
          last_name: lastName,
          phone_number: signUpPhone,
          email: signUpEmail,
          class: userClass,
          password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios(config);

      if (response.status === 201) {
        alert("Sign up successful!");

        const data = response.data;

        const fullName = firstName + ' ' + lastName;

        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("email", signUpEmail);
        localStorage.setItem("full_name", fullName);
        localStorage.setItem("class", userClass);

        window.location.reload();
        onOpenChange(false);
      }
    } catch (err: any) {
      console.error(err);

      if (err.name == 'AxiosError') {
        const errResponse = err.response;
        const errData = errResponse.data;
        const errMessage = errData.message;
        if (err.status == 400) {
          let showMessage = '';

          if (Array.isArray(errMessage)) {
            showMessage = errMessage.join(',');
          }
          toast.warning(showMessage);
        } else if (err.status == 409) {
          toast.error(errMessage);
        }
      }
    }
  };

  // reset modal on open
  useEffect(() => {
    if (open) {
      setStep("chooser");
      setMode("otp");
      setOtp(["", "", "", ""]);
      setAccepted(false);
      setFirstName("");
      setLastName("");
      setSignUpEmail("");
      setSignUpPhone("");
      setPassword("");
      setUserClass("");
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
    <>
      <ToastContainer />
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        aria-modal="true"
        role="dialog"
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
                  onClick={() => {
                    setStep("intent");
                  }}
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

          {/* Step: profile (First & Last Name) */}
          {step === "profile" && (
            <div className="pt-4">
              <div className="mt-2 space-y-4">
                <p className="text-lg font-medium">Tell us about you</p>

                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-xl border border-black/20 bg-[#C76033]/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#C76033]"
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-xl border border-black/20 bg-[#C76033]/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#C76033]"
                />

                <button
                  onClick={() => setStep("identity")}
                  disabled={!firstName || !lastName}
                  className={clsx(
                    "mt-2 w-full rounded-2xl px-5 py-3 font-semibold",
                    firstName && lastName
                      ? "bg-[#C76033] text-white"
                      : "bg-[#C76033]/20 text-black/60 cursor-not-allowed"
                  )}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step: login (UNCHANGED) */}
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
                className="w-full rounded-2xl bg-[#C76033] px-5 py-3 font-semibold text-white"
              >
                Login
              </button>
            </form>
          )}

          {/* Step: intent */}
          {step === "intent" && (
            <div className="pt-4">
              <div className="mt-2 space-y-4">
                <p className="text-lg font-medium">What are you here for?</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setIntent("buy");
                      setUserClass("buyer");
                    }}
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
                    onClick={() => {
                      setIntent("sell");
                      setUserClass("seller");
                    }}
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
                  onClick={() => setStep("profile")}
                  disabled={!intent}
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

          {/* Step: identity (Email + Phone) */}
          {step === "identity" && (
            <div className="pt-4">
              <div className="mt-2 space-y-4">
                <p className="text-lg font-medium">Provide your contact details</p>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-black/20 bg-[#C76033]/10 px-4 py-3"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                />

                <input
                  type="tel"
                  placeholder="Enter your phone"
                  className="w-full rounded-xl border border-black/20 bg-[#C76033]/10 px-4 py-3"
                  value={signUpPhone}
                  onChange={(e) =>
                    setSignUpPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))
                  }
                />

                <button
                  onClick={() => setStep("verify")}
                  disabled={
                    !signUpEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ||
                    signUpPhone.length !== 10
                  }
                  className={clsx(
                    "mt-2 w-full rounded-2xl px-5 py-3 font-semibold",
                    signUpEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) &&
                      signUpPhone.length === 10
                      ? "bg-[#C76033] text-white"
                      : "bg-[#C76033]/20 text-black/60 cursor-not-allowed"
                  )}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step: verify (with password) */}
          {step === "verify" && (
            <form onSubmit={handleSignUpSubmit} className="pt-4">
              <label className="mb-2 block text-base font-semibold">Create Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4 w-full rounded-xl border border-black/20 bg-[#C76033]/10 px-4 py-3"
              />

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
                type="submit"
                disabled={!accepted || !password}
                className={clsx(
                  "mt-3 w-full rounded-2xl px-5 py-3 text-base font-semibold",
                  accepted && password
                    ? "bg-[#C76033] text-white"
                    : "bg-[#C76033]/20 text-black/60 cursor-not-allowed"
                )}
              >
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
