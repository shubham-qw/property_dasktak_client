"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "post_property_draft_v1";
const PRIMARY = "#C76033";

export type FormData = {
    purpose?: "sell" | "rent" | "pg";
    propertyTypes: Array<"flat" | "land" | "plot" | "commercial" | "pg_hostel">;
    phone: string;
    city: string; locality: string; subLocality?: string; apartment?: string;
    area: string; areaUnit: "sqft" | "sqyd" | "sqm";
    rooms?: string; bathrooms?: string; balconies?: string; otherRooms?: string;
    reservedParking?: string; parkingType?: "covered" | "open";
    floor?: string; availability?: "immediate" | "30days" | "60days" | "under_construction";
    video?: File | null; images: File[];
    ownership?: string; price?: string; pricePerSqft?: string; brokerage?: string;
    amenities: string[]; features: string[]; description?: string;
};

export const initialForm: FormData = {
    purpose: undefined,
    propertyTypes: [],
    phone: "",
    city: "", locality: "", subLocality: "", apartment: "",
    area: "", areaUnit: "sqft",
    rooms: "", bathrooms: "", balconies: "", otherRooms: "",
    reservedParking: "", parkingType: undefined, floor: "", availability: undefined,
    video: null, images: [],
    ownership: "", price: "", pricePerSqft: "", brokerage: "",
    amenities: [], features: [], description: "",
};

type Ctx = {
    data: FormData;
    setData: React.Dispatch<React.SetStateAction<FormData>>;
    PRIMARY: string;
};

const WizardCtx = createContext<Ctx | null>(null);

export function WizardProvider({ children }: { children: React.ReactNode }) {

    const [data, setData] = useState<FormData>(initialForm);

    const value = useMemo(() => ({ data, setData, PRIMARY }), [data]);

    return <WizardCtx.Provider value={value}>{children}</WizardCtx.Provider>;
}

export function useWizard() {
    const ctx = useContext(WizardCtx);
    if (!ctx) throw new Error("useWizard must be used within WizardProvider");
    return ctx;
}
