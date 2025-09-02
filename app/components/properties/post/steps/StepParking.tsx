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
function Chip({ active, onClick, children }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl bg-white px-4 py-2 font-semibold"
      style={{ outline: active ? "2px solid #00000022" : "none" }}
    >
      {children}
    </button>
  );
}

export default function StepParking() {
  const { data, setData } = useWizard();

  return (
    <>
      <Field label="reserved parking">
        <Input
          value={data.reservedParking || ""}
          onChange={(v: string) => setData((d) => ({ ...d, reservedParking: v }))}
          placeholder="Enter no."
        />
        <div className="mt-3 flex gap-3">
          <Chip
            active={data.parkingType === "covered"}
            onClick={() => setData((d) => ({ ...d, parkingType: "covered" }))}
          >
            Covered parking
          </Chip>
          <Chip
            active={data.parkingType === "open"}
            onClick={() => setData((d) => ({ ...d, parkingType: "open" }))}
          >
            Open parking
          </Chip>
        </div>
      </Field>

      <Field label="Floor details">
        <Input
          value={data.floor || ""}
          onChange={(v: string) => setData((d) => ({ ...d, floor: v }))}
          placeholder="Enter no."
        />
      </Field>

      <Field label="Availability status">
        <div className="grid grid-cols-2 gap-3">
          {[
            ["ready_to_move", "Ready to move"],
            ["under_construction", "Under construction"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() =>
                setData((d) => ({ ...d, availability: value as any }))
              }
              className="rounded-xl bg-white px-4 py-3 font-semibold"
              style={{ outline: data.availability === value ? "2px solid #00000022" : "none" }}
            >
              {label}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Property Age">
        <Input
          value={data.propertyAge || ""}
          onChange={(v: string) => setData((d) => ({ ...d, propertyAge: v }))}
          placeholder="Enter no."
        />
      </Field>
    </>
  );
}
