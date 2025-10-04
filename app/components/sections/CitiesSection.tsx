import React from 'react';

const CitiesSection = () => {
  const cities = [
    {
      id: 1,
      name: 'Delhi/NCR',
      landmark: 'India Gate',
      icon: '🏛️',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 2,
      name: 'Uttar Pradesh',
      landmark: 'Taj Mahal',
      icon: '🏛️',
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 3,
      name: 'Gurgaon',
      landmark: 'Modern Cityscape',
      icon: '🏙️',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 4,
      name: 'Punjab',
      landmark: 'Golden Temple',
      icon: '🕌',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 5,
      name: 'Rajasthan',
      landmark: 'Desert Landscape',
      icon: '🐪',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 6,
      name: 'Bangalore',
      landmark: 'Vidhana Soudha',
      icon: '🏛️',
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            We are available for you in top Cities
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {cities.map((city) => (
            <div
              key={city.id}
              className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group text-center"
            >
              <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${city.color} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {city.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {city.name}
              </h3>
              <p className="text-xs text-gray-600">
                {city.landmark}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CitiesSection; 