"use client"
import { useState } from 'react';
import React from 'react'
import Navbar from '../../_components/navbar/page'
import { useForm } from "react-hook-form";
import GlobalApi from '@/app/_services/GlobalApi';
import toast, { Toaster } from 'react-hot-toast';

export default function Page() {
    const [step, setStep] = useState(1);
    const [interviewLevel, setInterviewLevel] = useState(1);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        const levels = {
            1: "Easy",
            2: "Moderate",
            3: "Hard"
        };
        data.interviewLevel = levels[interviewLevel];
        try {
            const response = await GlobalApi.postInterview(data);
            if (response.data.success) {
                toast.success("Interview experience submitted successfully");
                reset();
                setStep(1);
            } else {
                toast.error("Failed to submit interview experience:");
                console.log(response)
            }
        }catch (error) {
            toast.error("An error occurred while submitting interview experience:");
            console.log(error)
        }
    };

    const handleNextStep = (data) => {
        // Move to the next step if validation passes
        setStep((prev) => prev + 1);
    };

    return (
        <div>
            <Toaster/>
            <Navbar />
            <br /> <br />
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
                {step === 1 && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Personal Details</h2>
                        <input className="border p-2 mb-4 w-full" {...register("name", { required: true })} placeholder="Your Name" />
                        {errors.name && <span className="text-red-500">Name is required</span>}

                        <input className="border p-2 mb-4 w-full" {...register("course", { required: true })} placeholder="Course" />
                        {errors.course && <span className="text-red-500">Course is required</span>}

                        <input className="border p-2 mb-4 w-full" {...register("branch", { required: true })} placeholder="Branch" />
                        {errors.branch && <span className="text-red-500">Branch is required</span>}

                        <input className="border p-2 mb-4 w-full" {...register("yearOfPassout", { required: true })} placeholder="Year of Passout" />
                        {errors.yearOfPassout && <span className="text-red-500">Year of Passout is required</span>}

                        <input className="border p-2 mb-4 w-full" {...register("cgpa", { required: true })} placeholder="CGPA" />
                        {errors.cgpa && <span className="text-red-500">CGPA is required</span>}

                        <input className="border p-2 mb-4 w-full" {...register("contactNo")} placeholder="Contact No (Optional)" />
                        <input className="border p-2 mb-4 w-full" {...register("linkedinProfile", { required: true })} placeholder="LinkedIn Profile" />
                        {errors.linkedinProfile && <span className="text-red-500">LinkedIn Profile is required</span>}
                        <br />

                        <button type="button" className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleSubmit(handleNextStep)}>Next</button>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Job Details</h2>
                        <input className="border p-2 mb-4 w-full" {...register("company", { required: true })} placeholder="Company" />
                        {errors.company && <span className="text-red-500">Company is required</span>}

                        <input className="border p-2 mb-4 w-full" {...register("jobProfile", { required: true })} placeholder="Job Profile" />
                        {errors.jobProfile && <span className="text-red-500">Job Profile is required</span>}

                        <input className="border p-2 mb-4 w-full" {...register("jobLocation", { required: true })} placeholder="Job Location" />
                        {errors.jobLocation && <span className="text-red-500">Job Location is required</span>}

                        <input className="border p-2 mb-4 w-full" {...register("packageOffered", { required: true })} placeholder="Package Offered" />
                        {errors.packageOffered && <span className="text-red-500">Package Offered is required</span>}

                        <input className="border p-2 mb-4 w-full" {...register("studentsHired", { required: true })} placeholder="Number of Students Hired" />
                        {errors.studentsHired && <span className="text-red-500">Number of Students Hired is required</span>}

                        <button type="button" className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleSubmit(handleNextStep)}>Next</button>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Interview Experience</h2>
                        <input className="border p-2 mb-4 w-full" {...register("rounds", { required: true })} placeholder="Number of Rounds" />
                        {errors.rounds && <span className="text-red-500">Number of Rounds is required</span>}

                        <input className="border p-2 mb-4 w-full" {...register("skillsAsked", { required: true })} placeholder="Skills Asked" />
                        {errors.skillsAsked && <span className="text-red-500">Skills Asked is required</span>}

                        <textarea className="border p-2 mb-4 w-full" {...register("experience", { required: true })} placeholder="Interview Experience" />
                        {errors.experience && <span className="text-red-500">Interview Experience is required</span>}

                        <label className="block text-gray-700 mt-4">Level of Interview</label>
                        <input
                            type="range"
                            min="1"
                            max="3"
                            value={interviewLevel}
                            onChange={(e) => setInterviewLevel(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                            <span>Easy</span>
                            <span>Moderate</span>
                            <span>Hard</span>
                        </div>
                        <br />
                        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Submit</button>
                    </div>
                )}
            </form>
            <br />
        </div>
    )
}
