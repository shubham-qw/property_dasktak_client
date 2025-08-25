"use client";
import { useWizard } from "../WizardContext";
import clsx from "clsx";

const ACTIVE_COLOR = "#ce6d44"; // highlight color
const TEXT_COLOR_DEFAULT = "white"; // default text color

function Chip({
  checked,
  onClick,
  children,
}: { checked?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition duration-200",
        checked
          ? "bg-white text-[#ce6d44]"
          : "bg-transparent text-white hover:bg-white/10"
      )}
      style={{
        border: checked ? "none" : "none", // no border around text area
      }}
    >
      <span
        className={clsx(
          "grid h-4 w-4 place-items-center rounded-[3px] transition duration-200",
          checked
            ? "bg-[#ce6d44]"
            : "border border-white bg-transparent hover:bg-white/20"
        )}
      >
        {checked ? (
          <span className="block h-2 w-2 rounded-[2px] bg-white" />
        ) : null}
      </span>
      {children}
    </button>
  );
}


function PhoneInput({
  value,
  onChange,
}: { value: string; onChange: (v: string) => void }) {
  const handle = (v: string) => onChange(v.replace(/\D/g, "").slice(0, 10));
  return (
    <div
      className="flex items-center rounded-xl bg-white px-3 py-2"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
    >
      <span
        className="mr-2 select-none rounded-lg px-2 py-1 text-sm font-semibold"
        style={{ color: ACTIVE_COLOR }}
      >
        +91
      </span>
      <input
        inputMode="numeric"
        value={value}
        onChange={(e) => handle(e.target.value)}
        placeholder="Phone number"
        className="w-full bg-transparent outline-none placeholder:text-gray-400"
      />
    </div>
  );
}

export default function StepIntro() {
  const { data, setData } = useWizard();

  const t = (k: "flat" | "land" | "plot" | "commercial" | "pg_hostel") =>
    setData((d) => ({
      ...d,
      propertyTypes: d.propertyTypes.includes(k)
        ? d.propertyTypes.filter((x) => x !== k)
        : [...d.propertyTypes, k],
    }));

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-xl font-semibold text-white">
          What you want to ?
        </p>
        <div className="flex flex-wrap gap-4">
          <Chip
            checked={data.purpose === "sell"}
            onClick={() => setData((d) => ({ ...d, purpose: "sell" }))}
          >
            Sell
          </Chip>
          <Chip
            checked={data.purpose === "rent"}
            onClick={() => setData((d) => ({ ...d, purpose: "rent" }))}
          >
            Lease/Rent
          </Chip>
          <Chip
            checked={data.purpose === "pg"}
            onClick={() => setData((d) => ({ ...d, purpose: "pg" }))}
          >
            PG/Hostel
          </Chip>
        </div>
      </div>

      <div>
        <p className="mb-3 text-xl font-semibold text-white">Property type</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Chip
            checked={data.propertyTypes.includes("flat")}
            onClick={() => t("flat")}
          >
            Flat
          </Chip>
          <Chip
            checked={data.propertyTypes.includes("land")}
            onClick={() => t("land")}
          >
            land
          </Chip>
          <Chip
            checked={data.propertyTypes.includes("plot")}
            onClick={() => t("plot")}
          >
            plot
          </Chip>
          <Chip
            checked={data.propertyTypes.includes("commercial")}
            onClick={() => t("commercial")}
          >
            Commercial
          </Chip>
          <Chip
            checked={data.propertyTypes.includes("pg_hostel")}
            onClick={() => t("pg_hostel")}
          >
            PG/hostel
          </Chip>
        </div>
      </div>

      <div>
        <p className="mb-3 text-xl font-semibold text-white">
          Please share your contact number&nbsp; to reach you
        </p>
        <PhoneInput
          value={data.phone}
          onChange={(v) => setData((d) => ({ ...d, phone: v }))}
        />
      </div>
    </div>
  );
}
