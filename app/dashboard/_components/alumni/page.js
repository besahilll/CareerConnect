import React from "react";
import Slider from "react-slick";
import Image from "next/image";

const alumniData = [
  {
    name: "Sahil Bathla",
    company: "BT Group",
    message: "It was overall a good experience interviewing at BT Group. CareerConnect helped to prepare for interview rounds ",
    image: "/assets/images/sahil.jpg",
  },
  {
    name: "Avni Goyal",
    company: "DE Shaw",
    message: "Interviewing at DE Shaw is like dream come to true. CareerConnect played a very big role for getting me into DE Shaw",
    image: "/assets/images/avni.jpg",
  },
  {
    name: "Yoshudeep Gaur",
    company: "Capgemini",
    message: "CareerConnect helped me alot to strengthen my interpersonal skills.",
    image: "/assets/images/yoshu.jpg",
  },
  {
    name: "Navya Saluja",
    company: "Avvatar",
    message: "Avvatar is a super dream company which have one of the toughest OA's, and proud to say CareerConnect is one of the best platform which helped me to crack my OA.",
    image: "/assets/images/yoshu.jpg",   //needs to add navya's image
  },
];

const AlumniCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
  };

  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-left text-2xl font-bold mb-4 text-black">Why Join CareerConnect?</h2>
      <p className="text-left text-lg mb-6 text-blue-400">See what our happily placed students say!</p>
      <Slider {...settings}>
        {alumniData.map((alumni, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center text-center">
              <Image
                src={alumni.image}
                alt={alumni.name}
                width={80}
                height={80}
                className="rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold text-blue-600">{alumni.name}</h3>
              <p className="text-sm text-gray-500 mb-2">Placed in {alumni.company}</p>
              <p className="text-gray-700">
                {alumni.message} <a href="#" className="text-blue-500">Read More...</a>
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AlumniCarousel;
