"use client";
import Navbar from "./_components/navbar/page";
import StatCounter from "./_components/statcounter/page";
import AlumniExperiences from "./_components/alumni/page";
import Footer from "./_components/footer/page";
import InterviewButton from "./_components/interview/page";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <InterviewButton />

      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-12 p-8 bg-blue-900 text-center">
        <StatCounter target={500}  label="Students" duration={2000} />
        <StatCounter target={100} label="Alumni" duration={2000} />
        <StatCounter target={200} label="Companies" duration={2000} />
        <StatCounter target={10} label="Colleges" duration={1000} />
      </div>

      {/* Alumni Experiences Carousel */}
      <AlumniExperiences />
      
      <Footer />
    </div>
  );
}
