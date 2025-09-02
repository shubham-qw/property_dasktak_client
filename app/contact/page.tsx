import ContactInfo from "app/components/contact/ContactInfo";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Top Illustration + Text */}
      <div className="text-center">
        <img
          src="/assets/contact-illustration.png"
          alt="Contact illustration"
          className="mx-auto h-64"
        />
        <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
          Please Feel Free to Contact us for any PG Booking related Issues,
          Complaints and for any support needed for moving to the PG you have
          booked through us.
        </p>
      </div>

      {/* Cards Section */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ContactInfo
          title="Address"
          items={[
            "Headquarters: IIMT incubation center, Greater Noida",
            "Registered Office: East Delhi",
          ]}
        />
        <ContactInfo
          title="Contact Info"
          items={[
            "Phone: +91 8920642742",
            "Email: sagarvikas901@gmail.com",
          ]}
        />
        <ContactInfo
          title="Social Media"
          items={[
            "Website: www.hobolivings.com",
            "Facebook: www.facebook.com/my",
            "Blog: www.blog.mycompany.com",
          ]}
        />
      </div>
    </div>
  );
}
