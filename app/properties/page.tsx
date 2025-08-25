import PropertyList from "@/app/components/properties/list/PropertyList";

export default function PropertiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Fill the Form to buy</h1>
      <h2 className="text-4xl font-extrabold text-[#C76033] mb-8">
        your favourite property
      </h2>
      <PropertyList />
    </div>
  );
}
