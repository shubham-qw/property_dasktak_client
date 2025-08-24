"use client";
import { useWizard } from "../WizardContext";

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

export default function StepPrice() {
  const { data, setData } = useWizard();
  return (
    <>
      <Field label="Ownership">
        <Input
          value={data.ownership || ""}
          onChange={(v: string) => setData((d) => ({ ...d, ownership: v }))}
          placeholder="Enter ownership type (e.g., Freehold)"
        />
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
