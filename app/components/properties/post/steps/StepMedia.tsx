"use client";
import { useWizard } from "../WizardContext";

function Field({ label, children }: any) {
  return (
    <div className="mb-5">
      {label && <p className="mb-2 text-xl font-semibold text-white">{label}</p>}
      {children}
    </div>
  );
}

export default function StepMedia() {
  const { data, setData } = useWizard();

  const setImages = (files: FileList | null) => {
    if (!files) return;
    const selected = Array.from(files).slice(0, 10); // suggest 5–10
    setData((d) => ({ ...d, images: selected }));
  };

  const setVideo = (file: File | null) => {
    setData((d) => ({ ...d, video: file }));
  };

  return (
    <>
      <Field label="Add video">
        <label className="block cursor-pointer rounded-xl bg-white px-4 py-6 text-center text-gray-700">
          <input
            type="file"
            accept="video/*"
            hidden
            onChange={(e) => setVideo(e.target.files?.[0] ?? null)}
          />
          <div>
            <p className="font-semibold">Add video of your property+</p>
            <p className="text-sm text-gray-500">Upload video of max size 80 mb</p>
            {data.video && <p className="mt-1 text-xs text-gray-600">{data.video.name}</p>}
          </div>
        </label>
      </Field>

      <Field label="Add Images">
        <label className="block cursor-pointer rounded-xl bg-white px-4 py-6 text-center text-gray-700">
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => setImages(e.target.files)}
          />
          <div>
            <p className="font-semibold">Add images of your property</p>
            <p className="text-sm text-gray-500">We suggest adding 5–10 photos</p>
            {data.images.length > 0 && (
              <p className="mt-1 text-xs text-gray-600">{data.images.length} selected</p>
            )}
          </div>
        </label>
      </Field>
    </>
  );
}
