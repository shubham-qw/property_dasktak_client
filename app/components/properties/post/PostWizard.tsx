"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { WizardProvider, useWizard } from "./WizardContext";
import StepLocation from "./steps/StepLocation";
import StepRooms from "./steps/StepRooms";
import StepParking from "./steps/StepParking";
import StepMedia from "./steps/StepMedia";
import StepPrice from "./steps/StepPrice";
import StepAmenities from "./steps/StepAmenities";
import StepIntro from "./steps/StepIntro";
import axios from 'axios';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

type Props = { initialStep: number };

export default function PostWizard({ initialStep }: Props) {
  // Provider holds all form state (with localStorage autosave)
  return (
    <WizardProvider>
      <WizardBody initialStep={initialStep} />
    </WizardProvider>
  );
}

/* ------------------------------- Shell ------------------------------- */

function PostCard({ children }: { children: React.ReactNode }) {
  const { PRIMARY } = useWizard();
  return (
    <div
      className="mx-auto w-full max-w-3xl rounded-[22px] border-2 p-6 shadow-xl
                 overflow-visible max-h-none h-auto"   // <- key bits
      style={{ borderColor: PRIMARY, background: PRIMARY }}
    >
      <h2 className="mb-6 text-3xl font-semibold text-white">Post it for free !</h2>
      {children}
    </div>
  );
}

function WizardBody({ initialStep }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams(); // can be null during hydration

  // Read the current step from URL, fall back to initialStep
  const step = useMemo(() => {
    const raw = searchParams?.get("step");
    const n = Number.parseInt(raw ?? String(initialStep), 10);
    return Number.isFinite(n) ? n : initialStep;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, initialStep]);

  const maxStep = 6; // 0..6

  // Helper to write step back to URL (no scroll jump)
  const setStep = (n: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("step", String(Math.min(maxStep, Math.max(0, n))));
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // Normalize URL once if it had no step
  useEffect(() => {
    if (!searchParams?.get("step")) setStep(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data } = useWizard();

  // Gate the Next/Let’s Go button per step
  const nextEnabled = useMemo(() => {
    switch (step) {
      case 0: {
        const phoneOk = (data.phone || "").replace(/\D/g, "").length === 10;
        const purposeOk = !!data.purpose;
        const typeOk = data.propertyTypes.length > 0;
        return phoneOk && purposeOk && typeOk;
      }
      case 1: {
        const cityOk = !!data.city?.trim();
        const localityOk = !!data.locality?.trim();
        const areaOk = !!data.area?.trim();
        return cityOk && localityOk && areaOk;
      }
      case 2: {
        const roomsOk = !!data.rooms?.trim();
        const bathroomsOk = !!data.bathrooms?.trim();
        const balconiesOk = !!data.balconies?.trim();
        return roomsOk && bathroomsOk && balconiesOk;
      }
      case 3: {
        const reservedParkingOk = !!data.reservedParking?.trim();
        const availabilityOk = !!data.availability?.trim();
        const floorOk = !!data.floor?.trim();
        return reservedParkingOk && availabilityOk && floorOk;
      }
      case 4: {// media
        const videoOk = !!data.video;
        const imagesOk = !!data.images;
        return (!data.video || data.video.size <= 80 * 1024 * 1024) && videoOk && imagesOk;
      }
      case 5: {// price
        return !!data.price;
      }
      case 6: {
        const amenitiesOk = data.amenities.length;
        const featuresOk = data.features.length;
        return amenitiesOk && featuresOk;
      }
    }
  }, [step, data]);

  const onNext = () => setStep(step + 1);
  const onPrev = () => setStep(step - 1);
  const onSubmit = async () => {

    try {

      const payload = {
        title: data.apartment || "Untitled Property",   // add title field in form
        property_for: data.purpose,                 // "sell" | "rent" | "pg"
        property_type: data.propertyTypes[0] || "", // taking first (adjust if multi-select)
        city: data.city,
        locality: data.locality,
        sub_locality: data.subLocality || "",
        apartment: data.apartment || "",
        availability_status: data.availability || "ready_to_move",
        property_age: parseInt(data.propertyAge) || 0,        // add to FormData if not there yet
        ownership: data.ownership || "",
        price_per_sqft: (parseFloat(data.pricePerSqft || "") || 0).toString(),
        brokerage_charge: (parseFloat(data.brokerage || "") || 0).toString(),
        description: data.description || "",
        property_features: data.features || [],
        property_amenities: data.amenities || [],
        property_details: {
          rooms: Number(data.rooms || 0),
          bathrooms: Number(data.bathrooms || 0),
          balconies: Number(data.balconies || 0),
          other_rooms: data.otherRooms || "",
          floors: Number(data.floor || 0),
        },
        property_size: {
          number: data.area,
          metric: data.areaUnit
        },
        parking: {
          parking_count: Number(data.reservedParking || 0),
          parking_type: data.parkingType || "",
        },
      };

      const access_token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

      const config = {
        method: "post",
        url: "http://localhost:8080/properties", // 👈 change to your backend URL if needed
        headers: {
          "authorization": `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        data: payload,
      };

      const res = await axios(config);
      const created = res.data;

      // Upload media if any
      if ((data.images?.length || 0) > 0 || data.video) {
        const form = new FormData();
        (data.images || []).forEach((img: File) => form.append('images', img));
        if (data.video) form.append('video', data.video);

        await axios.post(`http://localhost:8080/properties/${created.id}/media`, form, {
          headers: { 'authorization': `Bearer ${access_token}` }
        });
      }

      console.log("✅ Property posted:", created);
      return created;
    } catch (err: any) {

      if (err.name == 'AxiosError') {
        const errResponse = err.response;
        const errData = errResponse.data;
        const errMessage = errData.message;
        if (err.status == 400) {
          let showMessage = '';

          if (Array.isArray(errMessage)) {
            showMessage = errMessage.join(',');
          } else {
            showMessage = errMessage;
          }

          toast.warning(showMessage);
        }
      }
      console.error("❌ handleSubmit error:", err.response?.data || err.message);

      //throw err;
    }
    // TODO: post to your API
   // alert("Submit -> wire to API");
  };

  return (
    <>
     <ToastContainer />
    <PostCard>
      {step === 0 && <StepIntro />}
      {step === 1 && <StepLocation />}
      {step === 2 && <StepRooms />}
      {step === 3 && <StepParking />}
      {step === 4 && <StepMedia />}
      {step === 5 && <StepPrice />}
      {step === 6 && <StepAmenities />}

      {/* Footer nav */}
      <div className="mt-6 flex gap-3">
        {step > 0 && (
          <button
            onClick={onPrev}
            className="w-32 rounded-2xl bg-white px-4 py-3 font-semibold"
          >
            Back
          </button>
        )}

        {step < maxStep ? (
          <button
            onClick={onNext}
            disabled={!nextEnabled}
            className="ml-auto w-full rounded-2xl bg-white px-5 py-3 text-lg font-semibold disabled:cursor-not-allowed disabled:opacity-70"
          >
            {step === 0 || step === 4 || step === 5 ? "Let’s Go" : "next"}
          </button>
        ) : (
          <button
            onClick={onSubmit}
            disabled={!nextEnabled}
            className="ml-auto w-full rounded-2xl bg-white px-5 py-3 text-lg font-semibold disabled:cursor-not-allowed disabled:opacity-70"
          >
            Let’s Go
          </button>
        )}
      </div>
    </PostCard>
    </>
  );
}