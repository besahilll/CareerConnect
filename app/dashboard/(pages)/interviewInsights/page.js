"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../_components/navbar/page";
import GlobalApi from "@/app/_services/GlobalApi";
import Link from "next/link";

const officeImages = [
  "/assets/images/office/office1.jpg",
  "/assets/images/office/office2.jpg",
  "/assets/images/office/office3.jpg",
  "/assets/images/office/office4.jpg",
  "/assets/images/office/office5.jpg",
  "/assets/images/office/office6.jpg",
  "/assets/images/office/office7.jpg",
  "/assets/images/office/office8.jpg",
  "/assets/images/office/office9.jpg",
  "/assets/images/office/office10.jpg",
];

export default function Page() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch companies from API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await GlobalApi.getCompany();
        console.log(response);
        setCompanies(response.data.companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  // Filter companies based on search
  const filteredCompanies = companies.filter((company) =>
    company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Search Bar */}
      <div className="flex justify-end p-6 bg-white">
        <div className="relative justify-end">
          {/* Single Search Bar */}
          <input
            type="text"
            placeholder="Search by Company"
            className="w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Magnifying Glass Icon */}
          <span className="absolute left-3 top-2.5 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m-1.2-1.8A7.5 7.5 0 1118 10.5 7.5 7.5 0 0115.45 14.85z"
              />
            </svg>
          </span>
        </div>

      </div>
      
      {/* Company Cards */}
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Explore Companies</h2>

        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCompanies.map((company, index) => (
              <Link
                key={index}
                href={`/dashboard/company/${encodeURIComponent(company)}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  {/* Randomized Image */}
                  <div className="h-40">
                    <img
                      src={officeImages[index % officeImages.length]} // Cycle through images
                      alt={company}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                      {company}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Industry: <span className="font-medium">Consulting</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Rating: <span className="font-bold text-green-500">4.0</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-gray-600">No companies match your search.</p>
        )}
      </div>
    </div>
  );
}
