"use client"
import React, { useEffect, useState } from 'react';
import Navbar from '../../_components/navbar/page';
import GlobalApi from '@/app/_services/GlobalApi';
import Link from 'next/link';

export default function Page() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await GlobalApi.getCompany();
        console.log(response)
        setCompanies(response.data.companies);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h2 className="text-xl font-semibold">Company List</h2>
        {companies.length > 0 ? (
          <ul className="mt-4">
            {companies.map((company,index) => (
              <li key={index} className="py-2 border-b">
                <Link href={`/dashboard/company/${encodeURIComponent(company)}`}>
                  {company}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4">No companies available.</p>
        )}
      </div>
    </div>
  );
}
