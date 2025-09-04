"use client";

import { useState } from "react";
import { Phone } from "lucide-react";

export default function MoverAndPackersForm() {
  const [moveType, setMoveType] = useState("local");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [accepted, setAccepted] = useState(false);

  return (
    <form className="space-y-6">
      {/* Move type radio */}
      <div>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="local"
              checked={moveType === "local"}
              onChange={() => setMoveType("local")}
            />
            <span>Local Moving</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="intercity"
              checked={moveType === "intercity"}
              onChange={() => setMoveType("intercity")}
            />
            <span>Inter-city Moving</span>
          </label>
        </div>
      </div>

      {/* City */}
      <div>
        <label className="block text-white font-bold mb-2">City</label>
        <input
          type="text"
          placeholder="Enter your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full rounded-lg px-4 py-3 text-black outline-none"
        />
      </div>

      {/* Pincode */}
      <div>
        <label className="block text-white font-bold mb-2">Pincode</label>
        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="w-full rounded-lg px-4 py-3 text-black outline-none"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-white font-bold mb-2">
          Please share your contact number to reach you
        </label>
        <div className="flex items-center bg-white rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 px-3 text-black border-r">
            <Phone size={18} className="text-gray-600" /> +91
          </div>
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 px-3 py-3 text-black outline-none"
          />
        </div>
      </div>

      {/* Terms */}
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />
        <span>
          I accept all the terms and condition{" "}
          <a href="#" className="underline text-white">
            View T&amp;C
          </a>
        </span>
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={!accepted}
        className={`w-full rounded-lg px-5 py-3 font-semibold ${
          accepted
            ? "bg-white text-[#C76033]"
            : "bg-white/50 text-gray-600 cursor-not-allowed"
        }`}
      >
        Continue
      </button>
    </form>
  );
}
