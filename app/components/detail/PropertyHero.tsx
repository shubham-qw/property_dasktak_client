"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

type MediaItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string; alt?: string; loop?: boolean; muted?: boolean };

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
  media: any; // 👈 instead of just images
};

export default function PropertyHero({ property: initial }: { property: Property }) {
  const [current, setCurrent] = useState(0);
  const [property, setProperty] = useState<Property>(initial);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const prev = () => {
    setCurrent((c) => (c === 0 ? property.media.length - 1 : c - 1));
  };

  const next = () => {
    setCurrent((c) => (c === property.media.length - 1 ? 0 : c + 1));
  };

  const loadProperty = async () => {
    if (typeof window === 'undefined') return;
    const access_token = localStorage.getItem("access_token");

    try {
      const config = {
        method: "get",
        url: `${process.env.BACKEND_URL}/properties/${property.id}`,
        headers: {
          authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios(config);

      if (response.data) {
        const data = response.data;

        const media : any = [];

        const {videos,images} = data;

        if (videos && Array.isArray(videos)) {
          videos.forEach(videoPath => media.push({ "type": "video", "src": `${process.env.BACKEND_URL}/media?fileName=${videoPath}&mediaType=video`, "poster": "/assets/property-2.png" }))          
        } 

        if (images && Array.isArray(images)) {
          images.forEach(imagePath => media.push({ "type": "image", "src": `${process.env.BACKEND_URL}/media?fileName=${imagePath}&mediaType=image` }))          
        }

        const newProperty: Property = {
          ...property,
          title: data.apartment,
          amenities: data.property_amenities,
          status: data.availability_status,
          location: data.locality + ", " + data.sub_locality,
          media, // 👈 backend can also return media array in future,
          price: data.price
        };

        setProperty(newProperty);
      }
    } catch (err) {
      console.error("Failed to load property", err);
    }
  };

  useEffect(() => {
    loadProperty();
  }, []);

  useEffect(() => {
    // Pause video when leaving slide
    if (property.media[current]?.type === "video") {
      videoRef.current?.play();
    }
  }, [current]);

  const currentMedia = property.media[current];

  return (
    <section className="relative w-full">
      {/* Hero Carousel */}
      <div className="relative">
        <div className="h-[500px] w-full overflow-hidden rounded-b-lg bg-black">
          {currentMedia.type === "image" ? (
            <img
              src={currentMedia.src}
              alt={currentMedia.alt ?? property.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <video
              key={currentMedia.src}
              ref={videoRef}
              className="h-full w-full object-cover"
              poster={currentMedia.poster}
              controls
              playsInline
              autoPlay
              muted={currentMedia.muted ?? false}
              loop={currentMedia.loop ?? false}
            >
              <source src={currentMedia.src} />
              Your browser does not support video.
            </video>
          )}
        </div>

        {/* Arrows */}
        {property.media.length > 1 && (
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
        <p className="text-2xl font-extrabold text-orange-600">Rs. {property.price}</p>
        <p className="text-gray-700">
          {property.size} | {property.floor}
        </p>
        <p className="mt-2 text-sm text-gray-600">📍 {property.location}</p>
        <p className="text-sm">
          <span className="font-semibold">Construction Status:</span> {property.status}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Furnishing Status:</span> {property.furnishing}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Amenities:</span> {property.amenities.join(", ")}
        </p>

        <button className="mt-4 rounded-lg bg-orange-600 px-6 py-2 text-white font-semibold hover:bg-orange-700">
          Contact
        </button>
      </div>

      {/* Decorative House Image */}
      <div className="absolute right-12 bottom-[-60px] hidden md:block">
        <img src="/house-small.png" alt="Decorative House" className="h-40 w-auto" />
      </div>
    </section>
  );
}
