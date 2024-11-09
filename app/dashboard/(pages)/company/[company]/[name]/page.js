"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import GlobalApi from "@/app/_services/GlobalApi";
import Navbar from "@/app/dashboard/_components/navbar/page";

function InterviewExperiencePage() {
  const [interviewExperience, setInterviewExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const company = decodeURIComponent(params.company);
  const name = decodeURIComponent(params.name);

  useEffect(() => {
    const fetchInterviewExperience = async () => {
      try {
        const response = await GlobalApi.getInterviewExperience(company, name);
        console.log(response.data[0]);
        setInterviewExperience(response.data[0]);
      } catch (err) {
        setError("Failed to fetch interview experience");
      } finally {
        setLoading(false);
      }
    };

    fetchInterviewExperience();
  }, [company, name]);

  if (loading) {
    return <div className="text-center text-lg font-bold mt-10">Loading interview experience...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500 mt-10">{error}</div>;
  }

  if (!interviewExperience) {
    return <div className="text-center text-lg mt-10">No interview experience found for {name} at {company}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 mt-10">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-6 px-4 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-2">
            Interview Experience of {name}
          </h1>
          <p className="text-lg">
            Company: <span className="font-semibold">{company}</span>
          </p>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <InfoBlock label="Year of Passout" value={interviewExperience.yearOfPassout} />
          <InfoBlock label="Course" value={interviewExperience.course} />
          <InfoBlock label="Branch" value={interviewExperience.branch} />
          <InfoBlock label="CGPA" value={interviewExperience.cgpa} />
          <InfoBlock label="LinkedIn Profile" value={interviewExperience.linkedinProfile} />
          {interviewExperience.contactNo && (
            <InfoBlock label="Contact No" value={interviewExperience.contactNo} />
          )}
          <InfoBlock label="Job Profile" value={interviewExperience.jobProfile} />
          <InfoBlock label="Package" value={`${interviewExperience.packageOffered} LPA`} />
          <InfoBlock label="Location" value={interviewExperience.jobLocation} />
          <InfoBlock label="Number of Rounds" value={interviewExperience.rounds} />
          <InfoBlock label="Total Students Selected" value={interviewExperience.studentsHired} />
          <InfoBlock label="Interview Level" value={interviewExperience.interviewLevel} />
        </div>

        {/* Distinct Interview Experience Block */}
        <div className="mt-8 p-8 rounded-lg shadow-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white">
          <h2 className="text-xl font-bold mb-4">Interview Experience</h2>
          <p className="text-lg">{interviewExperience.experience}</p>
        </div>
      </div>
      <br /><br />
    </>
  );
}

const InfoBlock = ({ label, value }) => (
  <div className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 hover:from-blue-200 hover:to-blue-400 transition-all duration-300">
    <p className="text-lg font-semibold text-gray-800">{label}</p>
    <p className="text-gray-700">{value}</p>
  </div>
);

export default InterviewExperiencePage;
