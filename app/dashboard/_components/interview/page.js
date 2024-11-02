import React from 'react'

export default function InterviewButton() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover" 
    style={{ backgroundImage: 'url("/assets/images/banner.jpg")' }}
    >
      <button className="bg-orange-500 text-white py-4 px-4 rounded hover:bg-orange-600 w-64">
        Post Your Interview Experience
      </button>
      <button className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 w-64">
        Check Interview Insights
      </button>
    </div>
  )
}
