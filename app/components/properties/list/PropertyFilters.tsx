"use client";

import { useId } from "react";

export type FilterState = {
    q: string;
    city: string;
    budgetMin: number;
    budgetMax: number; // INR
    availability: Array<"" | "women" | "men" | "co_living">;
    types: Array<"flat" | "land" | "plot" | "commercial" | "pg_hostel">;
    localities: string[];
    furnishing: "" | "furnished" | "unfurnished";
    areaMin: number; // sqft
    areaMax: number;
    amenities: string[];
};

const PRIMARY = "#C76033";

export default function PropertyFilters({
    value,
    onChange,
}: {
    value: FilterState;
    onChange: (next: FilterState) => void;
}) {
    const id = useId();

    const toggle = <T extends string>(arr: T[], item: T) =>
        arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];

    return (
        <aside
            className="rounded-2xl p-4 text-white w-full"
            style={{ background: PRIMARY, border: `2px solid ${PRIMARY}` }}
        >
            <h3 className="mb-4 text-xl font-semibold">Apply filters</h3>

            {/* Search */}
            <div className="mb-4">
                <input
                    value={value.q}
                    onChange={(e) => onChange({ ...value, q: e.target.value })}
                    placeholder="Search"
                    className="w-full rounded-md bg-white px-3 py-2 text-black placeholder:text-gray-500"
                />
            </div>

            {/* City */}
            <div className="mb-6">
                <select
                    value={value.city}
                    onChange={(e) => onChange({ ...value, city: e.target.value })}
                    className="w-full rounded-md bg-white px-3 py-2 text-black"
                >
                    <option value="">Select your city</option>
                    <option>Delhi</option>
                    <option>Mumbai</option>
                    <option>Bengaluru</option>
                </select>
            </div>

            {/* Budget */}
            <div className="mb-6">
                <label className="mb-2 block font-semibold">Budget</label>
                <input
                    type="range"
                    min={0}
                    max={20 * 1e7}
                    step={5 * 1e5}
                    value={value.budgetMax}
                    onChange={(e) =>
                        onChange({ ...value, budgetMax: Number(e.target.value) })
                    }
                    className="w-full"
                />
                <div className="mt-1 flex justify-between text-xs">
                    <span>₹50L</span>
                    <span>20+ Crs</span>
                </div>
            </div>

            {/* Availability for */}
            <fieldset className="mb-6 flex flex-wrap">
                <legend className="mb-2 block font-semibold">Availability for</legend>
                {[
                    ["women", "Women"],
                    ["men", "Men"],
                    ["co_living", "Co-livings"],
                ].map(([val, label]) => (
                    <label key={val} className="mb-1 ml-2 flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={value.availability.includes(val as any)}
                            onChange={() =>
                                onChange({
                                    ...value,
                                    availability: toggle(value.availability, val as any),
                                })
                            }
                        />
                        {label}
                    </label>
                ))}
            </fieldset>

            {/* Property type */}
            <fieldset className="mb-6 flex flex-wrap">
                <legend className="mb-2 block font-semibold">Property type</legend>
                {[
                    ["flat", "Flat"],
                    ["land", "land"],
                    ["plot", "plot"],
                    ["commercial", "Commercial"],
                    ["pg_hostel", "PG/hostel"],
                ].map(([v, label]) => (
                    <label key={v} className="mb-1 ml-2 flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={value.types.includes(v as any)}
                            onChange={() =>
                                onChange({ ...value, types: toggle(value.types, v as any) })
                            }
                        />
                        {label}
                    </label>
                ))}
            </fieldset>

            {/* Localities */}
            <fieldset className="mb-6 flex flex-wrap">
                <legend className="mb-2 block font-semibold">Localities</legend>
                {["South Delhi", "West Delhi", "North Delhi", "East Delhi"].map((loc) => (
                    <label key={loc} className="mb-1 ml-2 flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={value.localities.includes(loc)}
                            onChange={() =>
                                onChange({
                                    ...value,
                                    localities: toggle(value.localities, loc),
                                })
                            }
                        />
                        {loc}
                    </label>
                ))}
            </fieldset>

            {/* Furniture Status */}
            <fieldset className="mb-6 flex flex-wrap">
                <legend className="mb-2 block font-semibold">Furniture Status</legend>
                <label className="mb-1 ml-2 flex items-center gap-2">
                    <input
                        type="radio"
                        name={`${id}-furn`}
                        checked={value.furnishing === "furnished"}
                        onChange={() => onChange({ ...value, furnishing: "furnished" })}
                    />
                    Furnished
                </label>
                <label className="ml-2 flex items-center gap-2">
                    <input
                        type="radio"
                        name={`${id}-furn`}
                        checked={value.furnishing === "unfurnished"}
                        onChange={() => onChange({ ...value, furnishing: "unfurnished" })}
                    />
                    Non Furnished
                </label>
                <button
                    type="button"
                    className="mt-2 text-xs underline"
                    onClick={() => onChange({ ...value, furnishing: "" })}
                >
                    clear
                </button>
            </fieldset>

            {/* Area */}
            <div className="mb-6">
                <label className="mb-2 block font-semibold">Area</label>
                <input
                    type="range"
                    min={0}
                    max={10000}
                    step={100}
                    value={value.areaMax}
                    onChange={(e) =>
                        onChange({ ...value, areaMax: Number(e.target.value) })
                    }
                    className="w-full"
                />
                <div className="mt-1 flex justify-between text-xs">
                    <span>0 sq. ft</span>
                    <span>{value.areaMax.toLocaleString()} sq. ft</span>
                </div>
            </div>

            {/* Amenities */}
            <fieldset className="mb-2 flex flex-wrap">
                <legend className="mb-2 block font-semibold">Amenities</legend>
                {["Gym", "Swimming area", "Wi-Fi", "Computer", "Dining", "Kitchen"].map((a) => (
                    <label key={a} className="ml-2 mb-1 flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={value.amenities.includes(a)}
                            onChange={() =>
                                onChange({ ...value, amenities: toggle(value.amenities, a) })
                            }
                        />
                        {a}
                    </label>
                ))}
            </fieldset>
        </aside>
    );
}
