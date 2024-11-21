"use client";
import GlobalApi from '@/app/_services/GlobalApi';
import React, { useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../../_components/navbar/page';

export default function Page() {
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState("");
    const [companies, setCompanies] = useState([]); // State to store the suggested companies
    const [isPredicting, setIsPredicting] = useState(false);

    // Use a ref to directly manipulate the file input element
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setCategory("");
        setCompanies([]); // Reset category and companies when a new file is uploaded
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error('Please upload a file!');
            return;
        }

        setIsPredicting(true);

        try {
            const response = await GlobalApi.Predict(file);
            setCategory(response.data.category);
            setCompanies(response.data.companies); // Update the companies state
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsPredicting(false); // Reset the predicting state
            setFile(null); // Reset the file state
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Clear the file input element
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-gray-100 min-h-screen flex flex-col items-center">
                <Toaster />
                <div className="w-full max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                        Resume Prediction
                    </h1>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <label
                            htmlFor="file-upload"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Upload Resume
                        </label>
                        <input
                            ref={fileInputRef} // Bind the ref to the file input
                            id="file-upload"
                            type="file"
                            accept=".txt,.pdf"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500 
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-lg file:border-0
                              file:text-sm file:font-semibold
                              file:bg-blue-100 file:text-blue-700
                              hover:file:bg-blue-200"
                        />
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 rounded-lg transition ${isPredicting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            disabled={isPredicting} // Disable the button while predicting
                        >
                            {isPredicting ? 'Predicting...' : 'Upload'}
                        </button>
                    </form>
                    {category && (
                        <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                            <p className="font-medium">
                                Predicted Job Role: <span className="font-bold">{category}</span>
                            </p>
                        </div>
                    )}
                    {companies.length > 0 && (
                        <div className="mt-6 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg">
                            <h2 className="font-bold text-lg mb-2">Suggested Companies:</h2>
                            <ul className="list-disc ml-6">
                                {companies.map((company, index) => (
                                    <li key={index} className="mb-1">
                                        <span className="font-semibold">{company.company}:</span> {company.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
