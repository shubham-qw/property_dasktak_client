import React from 'react';

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      name: 'Amar Apartments',
      price: 'Rs. 2.25 to Rs. 3 Crore',
      image: '🏢',
      location: 'Delhi NCR',
      description: 'Modern living with premium amenities'
    },
    {
      id: 2,
      name: 'Amar Apartments',
      price: 'Rs. 2.25 to Rs. 3 Crore',
      image: '🏢',
      location: 'Delhi NCR',
      description: 'Luxury apartments with city views'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            High demand projects in Delhi
          </h2>
          <button className="bg-[#ce6d44] hover:bg-[#a35136] text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
            Know more
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
            >
              {/* Project Image */}
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <div className="text-6xl">{project.image}</div>
              </div>
              
              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.name}
                </h3>
                <p className="text-orange-500 font-semibold mb-2">
                  {project.price}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {project.description}
                </p>
                
                {/* Arrow Icon */}
                <div className="flex justify-end">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 