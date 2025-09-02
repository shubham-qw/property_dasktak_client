"use client";
import { useWizard } from "../WizardContext";
import clsx from "clsx";

function Field({ label, children }: any) {
  return (
    <div className="mb-5">
      {label && <p className="mb-2 text-xl font-semibold text-white">{label}</p>}
      {children}
    </div>
  );
}
function Input({ value, onChange, placeholder }: any) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl bg-white px-4 py-3 outline-none"
    />
  );
}

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


export default function StepPrice() {
  const { data, setData } = useWizard();
  return (
    <>
      <Field label="Ownership">
        <div className="grid grid-cols-2 gap-3">
          {[
            ["freehold", "Freehold"],
            ["leasehold", "Leasehold"],
            ["co-operative", "Co-Operative"],
            ["power_of_attorney", "Power of Attorney"],
          ].map(([value, label]) => (
            <Chip
            checked={data.ownership === value}
            onClick={() => setData((d) => ({ ...d, ownership: value }))}
          >
            {label}
          </Chip>
          ))}
        </div>
      </Field>

      <Field label="Price details">
        <div className="space-y-3">
          <Input
            value={data.price || ""}
            onChange={(v: string) => setData((d) => ({ ...d, price: v }))}
            placeholder="₹ Price"
          />
          <Input
            value={data.pricePerSqft || ""}
            onChange={(v: string) => setData((d) => ({ ...d, pricePerSqft: v }))}
            placeholder="Price per Sq. ft"
          />
        </div>
      </Field>

      <Field label="Do you charge Brokerage ?">
        <Input
          value={data.brokerage || ""}
          onChange={(v: string) => setData((d) => ({ ...d, brokerage: v }))}
          placeholder="Enter Amount (Optional)"
        />
      </Field>
    </>
  );
}
