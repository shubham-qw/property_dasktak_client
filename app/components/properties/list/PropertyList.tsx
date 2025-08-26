"use client";

import { useMemo, useState } from "react";
import PropertyFilters, { FilterState } from "./PropertyFilters";
import PropertyCard from "./PropertyCard";

const SAMPLE: Array<{
    id: number;
    title: string;
    priceLabel: string;
    price: number;          // in INR
    sizeSqft: number;
    floor: string;
    city: string;
    locality: string;
    propertyType: "flat" | "land" | "plot" | "commercial" | "pg_hostel";
    availability?: "women" | "men" | "co_living";
    furnishing: "furnished" | "unfurnished";
    amenities: string[];
    image: string;
}> = [
        {
            id: 1,
            title: "5 BHK builder Floor apartment",
            priceLabel: "7.5 Cr",
            price: 7.5 * 1e7,
            sizeSqft: 5000,
            floor: "2nd Floor",
            city: "Delhi",
            locality: "Mukherjee Nagar",
            propertyType: "flat",
            availability: "women",
            furnishing: "furnished",
            amenities: ["Gym", "Wi-Fi", "Kitchen"],
            image: "/house-illustration.png",
        },
        {
            id: 2,
            title: "5 BHK builder Floor apartment",
            priceLabel: "10 Cr",
            price: 10 * 1e7,
            sizeSqft: 5000,
            floor: "2nd Floor",
            city: "Delhi",
            locality: "West Delhi",
            propertyType: "commercial",
            availability: "co_living",
            furnishing: "furnished",
            amenities: ["Gym", "Dining"],
            image: "/house-illustration.png",
        },
        {
            id: 3,
            title: "5 BHK builder Floor apartment",
            priceLabel: "12.5 Cr",
            price: 12.5 * 1e7,
            sizeSqft: 5000,
            floor: "2nd Floor",
            city: "Delhi",
            locality: "South Delhi",
            propertyType: "plot",
            availability: "men",
            furnishing: "unfurnished",
            amenities: ["Kitchen", "Wi-Fi"],
            image: "/house-illustration.png",
        },
    ];

export default function PropertyList() {
    const [filters, setFilters] = useState<FilterState>({
        q: "",
        city: "",
        budgetMin: 0,
        budgetMax: 20 * 1e7, // 20 Cr
        availability: [],
        types: [],
        localities: [],
        furnishing: "",
        areaMin: 0,
        areaMax: 10000,
        amenities: [],
    });

    const data = useMemo(() => {
        return SAMPLE.filter((p) => {
            if (filters.q && !p.title.toLowerCase().includes(filters.q.toLowerCase())) return false;
            if (filters.city && p.city !== filters.city) return false;
            if (p.price < filters.budgetMin || p.price > filters.budgetMax) return false;
            if (filters.availability.length && !filters.availability.includes(p.availability ?? "")) return false;
            if (filters.types.length && !filters.types.includes(p.propertyType)) return false;
            if (filters.localities.length && !filters.localities.includes(p.locality)) return false;
            if (filters.furnishing && p.furnishing !== filters.furnishing) return false;
            if (p.sizeSqft < filters.areaMin || p.sizeSqft > filters.areaMax) return false;
            if (filters.amenities.length && !filters.amenities.every(a => p.amenities.includes(a))) return false;
            return true;
        });
    }, [filters]);

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 items-start">
            <div className="lg:col-span-1">
                <PropertyFilters value={filters} onChange={setFilters} />
            </div>
            <div className="lg:col-span-3 space-y-6">
                {data.map((p) => (
                    <PropertyCard
                        key={p.id}
                        title={p.title}
                        price={p.priceLabel}
                        size={`${p.sizeSqft.toLocaleString()} sq. ft`}
                        floor={p.floor}
                        location={`${p.city}, ${p.locality}`}
                        status="Ready to move"
                        furnishing={p.furnishing === "furnished" ? "Fully furnished" : "Non furnished"}
                        amenities={p.amenities}
                        image={p.image}
                    />
                ))}
                {!data.length && (
                    <div className="rounded-xl border p-6 text-gray-600">
                        No properties match your filters.
                    </div>
                )}
            </div>
        </div>
    );
}
