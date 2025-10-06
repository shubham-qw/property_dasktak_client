import PostWizard from "@/app/components/properties/post/PostWizard";

type Props = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PostPropertyPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const raw = resolvedSearchParams?.step;
  const rawStr =
    typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : undefined;

  const n = Number.parseInt(rawStr ?? "0", 10);
  const initialStep = Number.isFinite(n) ? Math.min(5, Math.max(0, n)) : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="flex justify-center">
          <img
            src="/house-illustration.png"
            alt="Property illustration"
            className="max-h-[520px] w-auto"
          />
        </div>
        <div className="flex justify-center">
          
          <PostWizard initialStep={initialStep} />
        </div>
      </div>
    </div>
  );
}