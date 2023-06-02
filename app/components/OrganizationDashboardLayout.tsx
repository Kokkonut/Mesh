//deprecated


import React, { useState } from 'react';

interface OrganizationDashboardLayoutProps {
  children: React.ReactNode;
  orgData: {
    name: string;
  };
}

const OrganizationDashboardLayout: React.FC<OrganizationDashboardLayoutProps> = ({
  children,
  orgData,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-slate-700 text-white">
        <div className="text-3xl logo">TaskMaster</div>
        <div className="text-lg font-semibold">{orgData.name}</div>
        {/* Hamburger icon */}
        <button
          className="text-gray-800 focus:outline-none block sm-hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 5h14a1 1 0 110 2H3a1 1 0 110-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </header>

      {/* Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        {isOpen && (
          <nav className="w-1/4 p-4 bg-blue-100">
            {/* Add your navigation items here */}
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </nav>
        )}

        {/* Main content */}
        <main className={`w-${isOpen ? '3/4' : 'full'} p-4`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default OrganizationDashboardLayout;
