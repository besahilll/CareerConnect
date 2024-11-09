import React from 'react';
import Image from 'next/image';

export default function InterviewButton() {
  return (
    <section className="bg-gray-50 py-16 flex">
      <div className="w-1/2 px-8">
        <h1 className="text-6xl font-bold text-gray-800">Preparing for <br></br>Interviews? </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Get insights from alumni placed in top companies.
        </p>
        <div className="mt-8 space-x-4">
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg shadow-md">
            Check Interview Insights
          </button>
          <button className="bg-green-500 text-white px-8 py-3 rounded-lg shadow-md">
            Post Interview Experience
          </button>
        </div>
      </div>
      <div className="w-1/2">
        <Image
          src="/assets/images/info.png" // updated image needs to be uploaded
          alt="Placement Preparation"
          width={500}
          height={400}
          className="mx-auto"
        />
      </div>
    </section>
  );
}