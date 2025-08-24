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

export default function StepRooms() {
  const { data, setData } = useWizard();
  return (
    <>
      <Field label="Add rooms">
        <Input value={data.rooms || ""} onChange={(v: string) => setData(d => ({...d, rooms: v}))} placeholder="Enter Room no." />
      </Field>
      <Field label="Add bathrooms">
        <Input value={data.bathrooms || ""} onChange={(v: string) => setData(d => ({...d, bathrooms: v}))} placeholder="Enter Bathrooms no." />
      </Field>
      <Field label="Add balconies">
        <Input value={data.balconies || ""} onChange={(v: string) => setData(d => ({...d, balconies: v}))} placeholder="Enter Balcony no." />
      </Field>
      <Field label="Other rooms">
        <Input value={data.otherRooms || ""} onChange={(v: string) => setData(d => ({...d, otherRooms: v}))} placeholder="Enter Pooja room, Store room & etc." />
      </Field>
    </>
  );
}
