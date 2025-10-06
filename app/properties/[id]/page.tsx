import PropertyHero from "app/components/detail/PropertyHero";
import PropertyDetailTracker from "app/components/detail/PropertyDetailTracker";
import axios from 'axios';
type Props = {
  params: Promise<{ id: string }>;
};

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;

  // 🔹 Sample property with multiple images (API will return these)
  const property = {
    id,
    title: "5 BHK builder Floor apartment",
    price: "7.5 Cr",
    size: "5000 sq. ft",
    floor: "2nd Floor",
    location: "Delhi, Mukherjee Nagar",
    status: "Ready to move",
    furnishing: "Fully furnished",
    amenities: ["Gym", "Wi-Fi", "Kitchen"],
    media: [
      { "type": "image", "src": "/assets/property-1.png" },
      { "type": "video", "src": "/assets/sample-video.mp4", "poster": "/assets/property-2.png" }
    ], // 👈 API will supply this
  };

  return (
    <div className="w-full">
      <PropertyDetailTracker propertyId={id} />
      <PropertyHero property={property} />
    </div>
  );
}
