import PropertyHero from "app/components/detail/PropertyHero";

type Props = {
  params: { id: string };
};

export default function PropertyDetailPage({ params }: Props) {
  const { id } = params;

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
    images: [
      "/assets/property-1.png",
      "/assets/property-2.png",
      "/assets/property-3.png",
    ], // 👈 API will supply this
  };

  return (
    <div className="w-full">
      <PropertyHero property={property} />
    </div>
  );
}
