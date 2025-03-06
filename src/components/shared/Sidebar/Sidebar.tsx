'use client';

import React, { JSX, useState } from 'react';
import {
  Home,
  Tag,
  Calendar,
  ChartBar,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react'; // Icons from Lucide React
import Link from 'next/link'; // For navigation

interface SideBarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  activeItem: string;
  setActiveItem: (activeItem: string) => void;
}

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  activeItem,
  setActiveItem,
}: SideBarProps) => {
  const handleItemClick = (label: string) => {
    setActiveItem(label);
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-20'
      } relative overflow-hidden bg-white p-4`}
    >
      {/* Toggle Button */}
      <div
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className='absolute top-0 right-4 rounded-full p-2 transition-colors hover:bg-gray-300'
      >
        {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </div>

      {/* Sidebar Content */}
      <div className='mt-6 space-y-4'>
        <SidebarItem
          icon={<Home />}
          label='Store'
          isActive={activeItem === 'Store'}
          onClick={() => handleItemClick('Store')}
          isSidebarOpen={isSidebarOpen}
        />
        <SidebarItem
          icon={<Tag />}
          label='SKU'
          isActive={activeItem === 'SKU'}
          onClick={() => handleItemClick('SKU')}
          isSidebarOpen={isSidebarOpen}
        />
        <SidebarItem
          icon={<Calendar />}
          label='Planning'
          isActive={activeItem === 'Planning'}
          onClick={() => handleItemClick('Planning')}
          isSidebarOpen={isSidebarOpen}
        />
        <SidebarItem
          icon={<ChartBar />}
          label='Chart'
          isActive={activeItem === 'Chart'}
          onClick={() => handleItemClick('Chart')}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
    </div>
  );
};

const SidebarItem = ({
  icon,
  label,
  isActive,
  onClick,
  isSidebarOpen,
}: {
  icon: JSX.Element;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isSidebarOpen: boolean;
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer items-center space-x-2 rounded-lg p-2 transition-colors ${isActive ? 'bg-gray-300' : 'hover:bg-gray-300'} ${!isSidebarOpen ? 'justify-center' : 'justify-start'}`}
    >
      <Link href='/dashboard' className='flex items-center space-x-2'>
        {icon}
        {isSidebarOpen && <span className='text-lg'>{label}</span>}
      </Link>
    </div>
  );
};

export default Sidebar;
