"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/_services/GlobalApi";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/dashboard/_components/navbar/page";

function Page() {
    const [companyDetails, setCompanyDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const params = useParams();
    //const company = params.company;
    const company = decodeURIComponent(params.company);

    useEffect(() => {
        // Fetch data only if company is available
        if (company) {
            const fetchCompanyDetails = async () => {
                try {
                    const response = await GlobalApi.getCompanyStudents(company);
                    const sortedData = response.data.sort((a, b) => b.year - a.year);
                    setCompanyDetails(sortedData);
                } catch (error) {
                    setError("Failed to fetch company details");
                } finally {
                    setLoading(false);
                }
            };

            fetchCompanyDetails();
        }
    }, [company]);

    // Handle cases when company is not provided
    if (!company) {
        return <div>Loading company details...</div>;
    }

    // Handle loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Handle error state
    if (error) {
        return <div>{error}</div>;
    }

    // No details found state
    if (!companyDetails) {
        return <div>No details found for this company</div>;
    }

    return (
        <>
        <Navbar/>
        <div className="container mx-auto px-4 mt-10">
            <h1 className="text-2xl font-bold text-center mb-6">Company Details: {company}</h1>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Interview</th>
                    </tr>
                </thead>
                <tbody>
                    {companyDetails.map((detail, index) => (
                        <tr key={index} className="odd:bg-white even:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2 text-black">{detail.name}</td>
                            <td className="border border-gray-300 px-4 py-2 text-black">{detail.yearOfPassout}</td>
                            <td className="border border-gray-300 px-4 py-2 text-black">
                                <Link href={`/dashboard/company/${encodeURIComponent(company)}/${encodeURIComponent(detail.name)}`}>
                                    Click Here
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default Page;
