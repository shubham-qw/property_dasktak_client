"use client";

import { useState, useEffect } from "react";
import axios from 'axios';
type Property = {
  id: string;
  title: string;
  price: string;
  size: string;
  floor: string;
  location: string;
  status: string;
  furnishing: string;
  amenities: string[];
  images: string[]; // 👈 array of images from backend
};

export default function PropertyHero({ property : Troperty }: { property: Property }) {
  const [current, setCurrent] = useState(0);
  const [property, setProperty] = useState(Troperty);

  const prev = () => {
    setCurrent((c) => (c === 0 ? property.images.length - 1 : c - 1));
  };

  const next = () => {
    setCurrent((c) => (c === property.images.length - 1 ? 0 : c + 1));
  };

  const loadProperties = async () => {
    console.log(property.id);

    const access_token = localStorage.getItem('access_token');


        const config = {
            method: "get",
            url: `http://localhost:8080/properties/${property.id}`, // 👈 change to your backend URL if needed
            headers: {
                "authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json",
            }
        };

        const response = await axios(config);

        console.log(response.data);

        if (response.data) {
          const data = response.data;
          const newProperty  : Property= {
          id : property.id,
          price :  property.price,
          size : property.size,
          title : data.apartment,
          amenities : data.property_amenities,
          status : data.availability_status,
          location : data.locality + ", " + data.sub_locality,
          images : property.images,
          furnishing : property.furnishing,
          floor : property.floor
          }
          setProperty(newProperty);
        }
  }

  useEffect(() => {
    loadProperties()
  },[])

  return (
    <section className="relative w-full">
      {/* Hero Image Carousel */}
      <div className="relative">
        <img
          src={property.images[current]}
          alt={`${property.title} - ${current + 1}`}
          className="h-[500px] w-full object-cover rounded-b-lg"
        />

        {/* Arrows */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow-md hover:bg-white"
            >
              ←
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow-md hover:bg-white"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Floating Card */}
      <div className="absolute left-6 bottom-[-80px] z-10 w-[60%] rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="text-xl font-bold">{property.title}</h1>
        <p className="text-2xl font-extrabold text-orange-600">
          Rs. {property.price}
        </p>
        <p className="text-gray-700">
          {property.size} | {property.floor}
        </p>
        <p className="mt-2 text-sm text-gray-600">📍 {property.location}</p>
        <p className="text-sm">
          <span className="font-semibold">Construction Status:</span>{" "}
          {property.status}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Furnishing Status:</span>{" "}
          {property.furnishing}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Amenities:</span>{" "}
          {property.amenities.join(", ")}
        </p>

        <button className="mt-4 rounded-lg bg-orange-600 px-6 py-2 text-white font-semibold hover:bg-orange-700">
          Contact
        </button>
      </div>

      {/* Decorative House Image */}
      <div className="absolute right-12 bottom-[-60px] hidden md:block">
        <img
          src="/house-small.png"
          alt="Decorative House"
          className="h-40 w-auto"
        />
      </div>
    </section>
  );
}
