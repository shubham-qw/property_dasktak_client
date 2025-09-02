type Props = {
  title: string;
  items: string[];
};

export default function ContactInfo({ title, items }: Props) {
  return (
    <div className="rounded-lg bg-[#C76033] p-6 text-white shadow-md">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
