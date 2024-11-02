import React from 'react'
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="pt-8 py-4 bg-black text-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
            {/* Left side: Logo/Name */}
            <div className="text-2xl font-bold text-white">
                CareerConnect
            </div>

            {/* Right side: Navigation Links */}
            <div className="flex space-x-8 items-center -ml-24">
                <Link href="">
                    Analytics Dashboard
                </Link>
                <Link href="">
                    Resume Review
                </Link>
                
                {/* Profile Icon */}
                <Link href="">
                    <Image
                        src="/assets/images/person.png" 
                        alt="My Profile"
                        width={32}
                        height={32}
                        className="rounded-full"
                    />
                </Link>
            </div>
        </div>
    </nav>
    )
}
