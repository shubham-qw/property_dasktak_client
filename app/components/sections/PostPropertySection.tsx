import React from 'react';
import Link from 'next/link';

const PostPropertySection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
          Post 10 properties for free!
        </h2>
        <p className="text-xl mb-8 text-orange-100">
          You can post your property here for free
        </p>
        <button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
          <Link href="/properties/post">
            Post Property
          </Link>
        </button>
      </div>
    </section>
  );
};

export default PostPropertySection; 