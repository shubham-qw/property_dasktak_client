import MoverAndPackersForm from "@/app/components/contact/InteriorDesignersForm";

export default function InteriorDesignersPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full">
        {/* Big heading text */}
        <h1 className="font-extrabold text-[#CE6D44] mb-12 leading-snug text-left">
          <span className="block text-4xl md:text-5xl">
            Room Revamp Experts
          </span>
        </h1>

        {/* Content: Image + Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side: Image */}
          <div className="flex justify-center md:justify-start">
            <img
              src="/assets/interior.png"
              alt="Interior Designers"
              className="w-full max-w-md"
            />
          </div>

          {/* Right side: Form */}
          <div className="bg-[#CE6D44] text-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-semibold mb-6">We’ll provide you best interior designers</h2>
            <MoverAndPackersForm />
          </div>
        </div>
      </div>
    </div>
  );
}
