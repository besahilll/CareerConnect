"use client";
import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement } from "chart.js";
import GlobalApi from "@/app/_services/GlobalApi";
import Navbar from "../../_components/navbar/page";

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement);

const SkillsChartPage = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [excludedSkills, setExcludedSkills] = useState([]);
  const [packageData, setPackageData] = useState([]);

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

    const fetchPackages = async () => { // Fetching package data
      try {
        const data = await GlobalApi.FetchPackage(); // Fetch package data from the correct API

        // Transform the package data to be used for the bar chart
        const transformedData = Object.entries(data.data).map(([range, value]) => ({
          range,
          value
        }));

        setPackageData(transformedData);
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
    labels: packageData.map((item) => item.range), // Ranges (0-8 LPA, 9-15 LPA, etc.)
    datasets: [
      {
        label: "Package Distribution (in LPA)",
        data: packageData.map((item) => item.value), // Values of the package distribution
        backgroundColor: generateUniqueColors(packageData.length),
        borderColor: '#000',
        borderWidth: 1,
      },
    ],
  };


  const options = {
    responsive: true,
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
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-4">
        <h1 class="text-4xl font-extrabold text-center text-white tracking-wide drop-shadow-lg bg-gradient-to-r from-blue-400 to-purple-600 py-4 rounded-md mb-16">
          Analytics Dashboard
        </h1>
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Skills Distribution
          </h2>

          {skillsData.length > 0 ? (
            <div className="flex justify-center items-center mb-6">
              <div className="w-3/4">
                <Pie data={chartData} options={options} />
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading skills data...</p>
          )}

          {excludedSkills.length > 0 && (
            <div className="mt-6 bg-indigo-50 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-indigo-700 mb-3">Other Skills:</h3>
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
      </div>
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Package Offered By Companies
          </h2>
          {packageData.length > 0 ? (
            <div className="flex justify-center items-center mb-6">
              <div className="w-3/4">
                <Bar data={barChartData} options={options} />
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading package data...</p>
          )}
        </div>

      </div>
    </>
  );
};

export default SkillsChartPage;
