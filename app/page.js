"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (!token && window.location.pathname !== "/login") {
      router.push("/login");
    } else if (token && window.location.pathname !== "/dashboard") {
      router.push("/dashboard");
    }
  }, [router]);
  return (
    <div>
      
    </div>
  );
}