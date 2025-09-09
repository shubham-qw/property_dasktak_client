"use client";
import Link from 'next/link';

type Props = {
  title: string;
  price: string;
  size: string;
  floor: string;
  location: string;
  status: string;
  furnishing: string;
  amenities: string[];
  image: string;
  uuid:number;
};

export default function PropertyCard(props: Props) {
  const { title, price, size, floor, location, status, furnishing, amenities, image, uuid } = props;
  console.log(uuid, props);
  return (
    <div className="flex gap-6 rounded-xl border border-gray-200 bg-white shadow p-4">
      <div className="w-40 flex-shrink-0">
        <img src={image} alt={title} className="h-32 w-40 rounded-md object-cover" />
      </div>
      <div className="flex-1 space-y-1">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-xl font-semibold text-[#C76033]">Rs. {price}</p>
        <p className="text-sm text-gray-700">{size} | {floor}</p>
        <p className="text-sm text-gray-600">📍 {location}</p>
        <p className="text-sm"><span className="font-semibold">Construction Status:</span> {status}</p>
        <p className="text-sm"><span className="font-semibold">Furnishing Status:</span> {furnishing}</p>
        <p className="text-sm"><span className="font-semibold">Amenities:</span> {amenities.join(", ")}</p>
        <div className="mt-3 flex gap-3">
          <button className="rounded-md bg-[#C76033] px-4 py-2 text-white font-semibold hover:opacity-90">
            <Link href={"/properties/"+uuid}>
             View details
          </Link>
          </button>
          <button className="rounded-md border border-[#C76033] px-4 py-2 font-semibold text-[#C76033] hover:bg-orange-50">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}
