import React from 'react';
import Link from 'next/link';

const PostPropertySection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-black text-4xl lg:text-5xl font-bold mb-6">
          Post <span className="text-[#ce6d44]">10</span> properties for free!
        </h2>
        <p className="text-gray-500 font-bold text-xl mb-8">
          You can post your property here for free
        </p>
        <button className="bg-[#ce6d44] text-white hover:[#a35136] px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
          <Link href="/properties/post">
            Post Property
          </Link>
        </button>
      </div>
    </section>
  );
};

export default PostPropertySection; 