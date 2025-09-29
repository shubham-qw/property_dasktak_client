import React from 'react';
import Link from 'next/link';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'Movers and Packers',
      icon: '📦',
      description: 'Professional moving services for your property',
      color: 'from-blue-500 to-blue-600',
      url: '/mover-and-packers'
    },
    {
      id: 2,
      title: 'Interior Design',
      icon: '🏠',
      description: 'Transform your space with expert design',
      color: 'from-purple-500 to-purple-600',
      url: '/Interior-Designers'
    },
    {
      id: 3,
      title: 'Home Loan',
      icon: '💰',
      description: 'Easy financing solutions for your dream home',
      color: 'from-green-500 to-green-600',
      url: '/Home-Loan'
    },
    {
      id: 4,
      title: 'Vastu',
      icon: '✨',
      description: 'Harmonious living with Vastu principles',
      color: 'from-orange-500 to-orange-600',
      url: '/Vastu'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            A One-Stop Shop for all Your Real Estate Needs
          </h2>
          <button className="bg-[#ce6d44] hover:bg-[#a35136] text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
            See more
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link href={service.url}>
            <div
              key={service.id}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {service.description}
              </p>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 