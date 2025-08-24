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
function Select({ value, onChange, options }: any) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-xl bg-white px-4 py-3 outline-none"
        >
            {options.map((o: any) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
    );
}

export default function StepLocation() {
    const { data, setData } = useWizard();
    return (
        <>
            <Field label="Where is your Property Located">
                <div className="space-y-3">
                    <Input value={data.city} onChange={(v: string) => setData(d => ({ ...d, city: v }))} placeholder="Enter City" />
                    <Input value={data.locality} onChange={(v: string) => setData(d => ({ ...d, locality: v }))} placeholder="Enter Locality" />
                    <Input value={data.subLocality || ""} onChange={(v: string) => setData(d => ({ ...d, subLocality: v }))} placeholder="Enter Sub Locality (Optional)" />
                    <Input value={data.apartment || ""} onChange={(v: string) => setData(d => ({ ...d, apartment: v }))} placeholder="Enter Apartment (Optional)" />
                </div>
            </Field>
            <Field label="Area details">
                <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                        <Input value={data.area} onChange={(v: string) => setData(d => ({ ...d, area: v }))} placeholder="Area" />
                    </div>
                    <Select
                        value={data.areaUnit}
                        onChange={(v: string) =>
                            setData((d) => ({ ...d, areaUnit: v as "sqft" | "sqyd" | "sqm" }))
                        }
                        options={[
                            { label: "in sq ft.", value: "sqft" },
                            { label: "in sq yd.", value: "sqyd" },
                            { label: "in sq m.", value: "sqm" },
                        ]}
                    />
                </div>
            </Field>
        </>
    );
}
