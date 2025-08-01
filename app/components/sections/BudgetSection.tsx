import React from 'react';

const BudgetSection = () => {
  const budgetOptions = [
    {
      id: 1,
      title: 'Affordable projects Starting from Rs.25 lakh',
      icon: '🏠'
    },
    {
      id: 2,
      title: 'Budget friendly PG & Hostel Starting from Rs.5500 only',
      icon: '🏢'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Budget Friendly Options for you
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              You can choose as per your budget and requirements
            </p>
            
            <div className="space-y-4">
              {budgetOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                  <div className="text-2xl">{option.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{option.title}</p>
                  </div>
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Illustrative Graphic */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-8xl mb-4">📈</div>
                    <div className="text-6xl mb-4">🏠</div>
                    <div className="text-4xl mb-4">💰</div>
                    <p className="text-xl font-semibold">Growing Value</p>
                  </div>
                </div>
                {/* Arrow pointing upwards */}
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BudgetSection; 