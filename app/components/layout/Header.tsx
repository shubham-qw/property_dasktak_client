"use client";

import React , {useState} from 'react';
import AuthModal from '../ui/AuthModal';

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const checkForLogin = () => {
    const fullName = localStorage.getItem('full_name');
    const access_token = localStorage.getItem('access_token');

    if (fullName && access_token) {
      return {
        fullName,access_token
      }
    } else {
      return null;
    }
  }

  return (
    <>
    <header className="bg-[#272727] shadow-sm border-b border-[#272727]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-[#cc6c43]">
              Property Dastak
            </h1>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <a 
              href="/insights" 
              className="text-white hover:text-gray-400 px-3 py-2 text-[15px] font-medium transition-colors "
            >
              Insights
            </a>
            <a 
              href="/owners" 
              className="text-white hover:text-gray-400 px-3 py-2 text-[15px] font-medium transition-colors "
            >
              Owners
            </a>
          </nav>

          {/* Login Button */}
          <div className="flex items-center space-x-4">
           { checkForLogin() ? 
           <span  className="text-white hover:text-gray-400 px-3 py-2 text-[15px] font-medium transition-colors ">{checkForLogin()?.fullName}</span> : <button onClick={() => setIsAuthModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
              Login/Sign in
            </button>}
            
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
    <AuthModal open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </>
  );
};

export default Header; 