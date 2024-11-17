"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
    const router = useRouter();
    const { register, handleSubmit, setError, reset } = useForm();
    const [isSignup, setIsSignup] = useState(false); // Toggle between Login and Signup

    const handleFormSubmit = async (data) => {
        if (isSignup && data.password !== data.confirmPassword) {
            setError("confirmPassword", {
                type: "manual",
                message: "Passwords do not match.",
            });
            return;
        }

        try {
            const success = true; // Mock API response
            if (success) {
                toast.success(
                    isSignup
                        ? "Account created successfully!"
                        : "Logged in successfully!"
                );
                localStorage.setItem("token", "mock-token");
                reset();
                router.push("/dashboard");
            } else {
                toast.error("Something went wrong");
            }
        } catch {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">

            {/* Left Panel - Gradient Background */}
            <motion.div
                className={${
          isSignup ? "w-1/2 bg-white" : "w-1/2 bg-gradient-to-br from-blue-500 to-green-400"
                } h-full absolute left-0 top-0 flex justify-center items-center p-8 transition-all duration-500}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.5 }}
      >
            <div className="text-center text-white">
                <h1 className="text-3xl font-bold mb-4">
                    {isSignup ? "Welcome Back!" : "Hello, Friend!"}
                </h1>
                <p className="mb-6">
                    {isSignup
                        ? "Sign in to continue your journey."
                        : "Enter your details to get started."}
                </p>
                <motion.button
                    onClick={() => setIsSignup(!isSignup)}
                    className="bg-white text-green-600 px-6 py-2 rounded-lg shadow-md font-semibold hover:bg-gray-100 transition"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {isSignup ? "Login" : "Sign Up"}
                </motion.button>
            </div>
        </motion.div>

      {/* Right Panel - White Background */ }
    <motion.div
        className={${
          isSignup ? "w-1/2 bg-gradient-to-br from-blue-500 to-green-400" : "w-1/2 bg-white"
        } h-full absolute right-0 top-0 p-8 transition-all duration-500}
initial = {{ x: 100, opacity: 0 }}
animate = {{ x: 0, opacity: 1 }}
exit = {{ x: -100, opacity: 0 }}
transition = {{ duration: 0.5 }}
      >
    <AnimatePresence mode="wait">
        <motion.div
            key={isSignup ? "signup" : "login"} // Animation key for switching between forms
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
        >
            <h2 className="text-2xl font-bold text-center mb-6">
                {isSignup ? "Sign Up" : "Login"}
            </h2>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                {isSignup && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            {...register("name")}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        {...register("email")}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        {...register("password")}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                {isSignup && (
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            {...register("confirmPassword")}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                )}
                <motion.button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {isSignup ? "Sign Up" : "Login"}
                </motion.button>
            </form>
            <p className="mt-4 text-center">
                {isSignup ? (
                    <>
                        Already have an account?{" "}
                        <span
                            className="text-green-600 font-semibold cursor-pointer"
                            onClick={() => setIsSignup(false)}
                        >
                            Login
                        </span>
                    </>
                ) : (
                    <>
                        Don’t have an account?{" "}
                        <span
                            className="text-green-600 font-semibold cursor-pointer"
                            onClick={() => setIsSignup(true)}
                        >
                            Sign Up
                        </span>
                    </>
                )}
            </p>
        </motion.div>
    </AnimatePresence>
      </motion.div >
    </div >
  );
}