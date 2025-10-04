"use client";
import { useState } from "react";
import { useWizard } from "../WizardContext";

function Field({ label, children }: any) {
  return (
    <div className="mb-5">
      {label && <p className="mb-2 text-xl font-semibold text-white">{label}</p>}
      {children}
    </div>
  );
}

function PillInput({
  label,
  values,
  onAdd,
  onRemove,
  placeholder,
}: {
  label: string;
  values: string[];
  onAdd: (v: string) => void;
  onRemove: (v: string) => void;
  placeholder: string;
}) {
  const [val, setVal] = useState("");
  return (
    <div className="mb-6">
      <p className="mb-2 text-xl font-semibold text-white">{label}</p>
      <div className="flex items-center gap-2">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl bg-white px-4 py-3 outline-none"
        />
        <button
          type="button"
          onClick={() => {
            if (!val.trim()) return;
            onAdd(val.trim());
            setVal("");
          }}
          className="rounded-xl bg-white px-4 py-2 font-semibold"
        >
          Add
        </button>
      </div>
      {values.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {values.map((v) => (
            <span
              key={v}
              className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm"
            >
              {v}
              <button
                type="button"
                onClick={() => onRemove(v)}
                className="rounded px-1 text-gray-600 hover:bg-gray-100"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StepAmenities() {
  const { data, setData } = useWizard();

  return (
    <>
      <PillInput
        label="Amenities"
        values={data.amenities}
        placeholder="other+"
        onAdd={(v) => setData((d) => ({ ...d, amenities: [...d.amenities, v] }))}
        onRemove={(v) =>
          setData((d) => ({ ...d, amenities: d.amenities.filter((x) => x !== v) }))
        }
      />

      <PillInput
        label="Property Features"
        values={data.features}
        placeholder="Add Features"
        onAdd={(v) => setData((d) => ({ ...d, features: [...d.features, v] }))}
        onRemove={(v) =>
          setData((d) => ({ ...d, features: d.features.filter((x) => x !== v) }))
        }
      />

      <Field label="Description">
        <textarea
          value={data.description || ""}
          onChange={(e) => setData((d) => ({ ...d, description: e.target.value }))}
          placeholder="Enter description"
          className="h-28 w-full resize-none rounded-xl bg-white px-4 py-3 outline-none"
        />
      </Field>
    </>
  );
}
