"use client";
import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import GlobalApi from "@/app/_services/GlobalApi";
import Navbar from "../../_components/navbar/page";

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement);

const SkillsChartPage = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [excludedSkills, setExcludedSkills] = useState([]);
  const [packageData, setPackageData] = useState([]);
  const [studentsPlaced, setStudentsPlaced] = useState(0); 
  const [highestPackage, setHighestPackage] = useState(0); 

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await GlobalApi.FetchSkills();
        const filteredSkills = data.data.filter((skill) => skill.count > 1);
        const excluded = data.data.filter((skill) => skill.count === 1);

        setSkillsData(filteredSkills);
        setExcludedSkills(excluded);
      } catch (error) {
        console.error("Error fetching skills data:", error);
      }
    };

    const fetchPackages = async () => {
      try {
        const data = await GlobalApi.FetchPackage();
        setHighestPackage(data.data.highestPackage);
        const transformedData = Object.entries(data.data.ranges).map(([range, value]) => ({
          range,
          value,
        }));

        setPackageData(transformedData);
        setStudentsPlaced(data.data.totalPlacedPeople); 
      } catch (error) {
        console.error("Error fetching package data:", error);
      }
    };

    fetchSkills();
    fetchPackages();
  }, []);

  const generateUniqueColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const hue = (i * 137.508) % 360;
      colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
  };

  const chartData = {
    labels: skillsData.map((skill) => skill.label),
    datasets: [
      {
        data: skillsData.map((skill) => skill.count),
        backgroundColor: generateUniqueColors(skillsData.length),
        hoverBackgroundColor: generateUniqueColors(skillsData.length),
        borderWidth: 1,
        borderColor: "#fff",
      },
    ],
  };

  const barChartData = {
    labels: packageData.map((item) => item.range),
    datasets: [
      {
        label: "Package Distribution (in LPA)",
        data: packageData.map((item) => item.value),
        backgroundColor: generateUniqueColors(packageData.length),
        borderColor: "#000",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow graph resizing
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ": " + tooltipItem.raw;
          },
        },
      },
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
        <h1 className="text-4xl font-extrabold text-center text-white tracking-wide drop-shadow-lg bg-gradient-to-r from-blue-400 to-indigo-600 py-4 rounded-md mb-8">
          Analytics Dashboard
        </h1>

        {/* Top Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">Students Placed</h3>
            <p className="text-4xl font-extrabold text-gray-700">{studentsPlaced}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">Skills Asked</h3>
            <p className="text-4xl font-extrabold text-gray-700">{skillsData.length}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">Highest Package</h3>
            <p className="text-4xl font-extrabold text-gray-700">{highestPackage} LPA</p>
          </div>
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Skills Distribution Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
              Skills Distribution
            </h2>
            {skillsData.length > 0 ? (
              <div className="h-[500px] flex justify-center items-center">
                <Pie data={chartData} options={options} />
              </div>
            ) : (
              <p className="text-center text-gray-500">Loading skills data...</p>
            )}

            {/* Excluded Skills Section */}
            {excludedSkills.length > 0 && (
              <div className="mt-6 bg-indigo-50 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-indigo-700 mb-3">
                  Other Skills:
                </h3>
                <div className="flex flex-wrap gap-3">
                  {excludedSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-800 text-sm font-medium px-4 py-2 rounded-full shadow-sm hover:bg-indigo-200 transition-all"
                    >
                      {skill.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Package Distribution Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
              Package Offered By Companies
            </h2>
            {packageData.length > 0 ? (
              <div className="h-[500px] flex justify-center items-center">
                <Bar data={barChartData} options={options} />
              </div>
            ) : (
              <p className="text-center text-gray-500">Loading package data...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillsChartPage;
