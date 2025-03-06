'use client';

import { useState } from 'react';
import MainContent from '../MainContent';
import Navbar from '../shared/Navbar/Navbar';
import Sidebar from '../shared/Sidebar';
import { DASHBOARD_PAGES } from '@/core/constants';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeItem, setActiveItem] = useState<string>(DASHBOARD_PAGES.STORE);

  return (
    <div className='flex h-screen flex-col bg-gray-200'>
      <Navbar />

      <div className='flex flex-1 overflow-hidden'>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <div className={`flex-1 overflow-auto p-6 transition-all`}>
          <MainContent activeItem={activeItem} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
