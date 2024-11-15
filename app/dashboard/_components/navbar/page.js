"use client";
import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="pt-8 py-4 bg-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        {/* Left side: Logo with vertical divider */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image
              src="/assets/images/logo.png"
              alt="CareerConnect Logo"
              width={120}
              height={40}
              className="cursor-pointer"
            />
          </Link>
          <div className="border-l h-8 border-gray-300" /> {/* Vertical Divider */}
        </div>

        {/* Right side: Navigation Links */}
        <div className="flex space-x-8 items-center">
          <Link href="/" className="text-black hover:text-blue-500">
            Home
          </Link>

          {/* Dropdown for Interviews */}
          <div className="relative">
            <button onClick={toggleDropdown} className="text-black hover:text-blue-500">
              Interviews
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-black text-white mt-2 py-2 w-48 shadow-lg rounded">
                <Link href="/interviews/PostInterview" className="block px-4 py-2 hover:bg-gray-200 hover:text-black">
                  Company Interviews
                </Link>
                <Link href="/dashboard/interviewInsights" className="block px-4 py-2 hover:bg-gray-200 hover:text-black">
                  Post Interview Experience
                </Link>
              </div>
            )}
          </div>

          <Link href="/resume-analysis" className="text-black hover:text-blue-500">
            Resume Analysis
          </Link>
          <Link href="/analytics" className="text-black hover:text-blue-500">
            Analytics Dashboard
          </Link>

          {/* Vertical divider and Profile Icon */}
          <div className="flex items-center space-x-4">
            <div className="border-l h-8 border-gray-300" /> {/* Vertical Divider */}
            <button onClick={toggleProfileDropdown}>
              <Image
                src="/assets/images/person.jpg"
                alt="My Profile"
                width={32}
                height={32}
                className="rounded-full"
              />
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute right-0 bg-white text-black mt-36 py-2 w-48 shadow-lg rounded">
                <Link href="/dashboard/user-profile" className="block px-4 py-2 hover:bg-gray-200">
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="border-gray-300" /> {/* Horizontal rule */}
    </nav>
  );
}