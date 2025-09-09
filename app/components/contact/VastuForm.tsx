"use client";

import { useState } from "react";
import backendHttpClient from "@/app/lib/httpClient/backendHttpClient";
import { Phone } from "lucide-react";

export default function VastuForm() {
  const [consultationType, setConsultationType] = useState("online");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accepted) {
      alert("Please accept the terms & conditions before continuing.");
      return;
    }

    const formData = {
      consultationType,
      city,
      pincode,
      phone,
    };

    try {
      await backendHttpClient.post("/leads/vastu", formData);
      alert("Form submitted successfully!");
      setCity("");
      setPincode("");
      setPhone("");
      setAccepted(false);
      setConsultationType("online");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Failed to submit. Please try again.";
      alert(message);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Consultation type radio */}
      <div>
        <label className="flex items-center space-x-2 mb-2">
          <input
            type="radio"
            value="online"
            checked={consultationType === "online"}
            onChange={() => setConsultationType("online")}
          />
          <span>Online</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="offline"
            checked={consultationType === "offline"}
            onChange={() => setConsultationType("offline")}
          />
          <span>Offline</span>
        </label>
      </div>

      {/* City */}
      <div>
        <label className="block text-white font-semibold mb-2">City</label>
        <input
          type="text"
          placeholder="Enter your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full rounded-lg px-4 py-3 text-black outline-none"
          required
        />
      </div>

      {/* Pincode */}
      <div>
        <label className="block text-white font-semibold mb-2">Pincode</label>
        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="w-full rounded-lg px-4 py-3 text-black outline-none"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-white font-semibold mb-2">
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
            required
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
