"use client";

import { X, Edit3, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import GlobalApi from "@/app/_services/GlobalApi";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../../_components/navbar/page";

function Page() {
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Authentication Check
  useEffect(() => {
    const authCheck = () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      }
    };
    authCheck();
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  // Fetch User Data
  const getUserData = async () => {
    setIsLoading(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const resp = await GlobalApi.GetUserData(token);
      setUserData(resp.data);
    } catch (error) {
      console.error("Error Fetching UserData:", error);
      toast.error("Error fetching user data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // Initialize Form Fields
  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name,
        username: userData.username,
        email: userData.email,
      });
    }
  }, [reset, userData]);

  // Form Submission Handler
  const onSubmit = async (data) => {
    setIsSubmit(true);

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const response = await GlobalApi.UpdateUser(data, token);

      if (response.status === 200 || response.status === 201) {
        toast.success("User data updated successfully.");
        getUserData();
      } else {
        const errorMessage = response.data?.message || "Unexpected error occurred.";
        toast.error(`Error: ${errorMessage}`);
      }
    } catch (err) {
      if (err?.response?.status === 409) {
        setError("username", {
          type: "manual",
          message: "Username already exists.",
        });
        toast.error("Username already exists.");
      } else {
        toast.error("Unexpected error occurred.");
      }
    } finally {
      setIsSubmit(false);
    }
  };

  // Loading or Authentication State
  if (isLoading || !isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-800">
        <div className="font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            {/* User Profile Section */}
            <div className="md:flex-shrink-0 bg-gradient-to-b from-purple-600 to-indigo-700 p-8 text-white">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden">
                  <img
                    src="/assets/images/avatardef.png"
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold">{userData?.name || "Loading..."}</h2>
                <p className="text-indigo-200">{userData?.username || "Username"}</p>
              </div>
            </div>

            {/* Profile Form Section */}
            <div className="p-8 w-full">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                <button
                  onClick={() => setIsEditable(!isEditable)}
                  className={`p-2 rounded-full transition-colors duration-200 ${isEditable
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-indigo-500 hover:bg-indigo-600"
                    }`}
                  aria-label="Toggle Edit Mode"
                >
                  {isEditable ? (
                    <X className="w-5 h-5 text-white" />
                  ) : (
                    <Edit3 className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      {...register("name", { required: "Name is required." })}
                      disabled={!isEditable}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
                    />
                    {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
                  </div>

                  {/* Username Field */}
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      {...register("username", { required: "Username is required." })}
                      disabled={!isEditable}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
                    />
                    {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username.message}</p>}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      {...register("email", { required: "Email is required." })}
                      disabled={!isEditable}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                  </div>
                </div>

                {/* Submit Button */}
                {isEditable && (
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmit}
                      className="mt-6 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
                    >
                      <Save className="mr-2 h-5 w-5" />
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
