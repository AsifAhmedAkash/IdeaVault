"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function LoginPage() {


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f3e7] text-on-background p-6 transition-colors duration-300">

            {/* Background Glow */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-[#4c6700]/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-secondary/10 blur-[120px] rounded-full" />
            </div>

            <div className="w-full max-w-5xl bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-xl grid md:grid-cols-12">

                {/* LEFT SIDE */}
                <div className="hidden md:flex md:col-span-6 relative bg-[#4c6700] text-white p-12 flex-col justify-end">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d')] bg-cover bg-center opacity-40" />

                    <div className="relative z-10">
                        <p className="text-xs tracking-widest text-secondary-fixed">
                            GROUNDED INNOVATION
                        </p>
                        <h1 className="text-3xl font-bold mt-3">
                            Building tomorrow’s legacies today.
                        </h1>
                        <p className="text-sm text-primary-fixed-dim mt-2">
                            IdeaVault connects founders, investors, and creators in one ecosystem.
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="col-span-1 md:col-span-6 p-10 md:p-14 ">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-10">
                        <h1 className="text-2xl font-bold text-primary">
                            IdeaVault
                        </h1>


                    </div>

                    <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                    <p className="text-on-surface-variant mb-8">
                        Continue your innovation journey.
                    </p>

                    {/* Form */}
                    <form className="space-y-5">

                        {/* Email */}
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full p-3 rounded-lg border border-outline-variant bg-surface"
                        />

                        {/* Password */}
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 rounded-lg border border-outline-variant bg-surface"
                        />

                        {/* Forgot Password */}
                        <div className="text-right">
                            <span className="text-sm text-secondary cursor-pointer hover:underline">
                                Forgot Password?
                            </span>
                        </div>

                        {/* Login Button */}
                        <Button className="w-full bg-[#4c6700] text-on-primary py-3">
                            Login →
                        </Button>

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-6">
                            <div className="flex-1 h-px bg-outline-variant" />
                            <span className="text-xs text-on-surface-variant">
                                OR CONTINUE WITH
                            </span>
                            <div className="flex-1 h-px bg-outline-variant" />
                        </div>

                        {/* Google Login */}
                        <button
                            type="button"
                            className="w-full p-3 border border-outline-variant rounded-lg flex items-center justify-center gap-3 hover:bg-surface-container transition"
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                className="w-5 h-5"
                                alt="Google"
                            />
                            Continue with Google
                        </button>

                        {/* Signup */}
                        <p className="text-center text-sm text-on-surface-variant mt-6">
                            Don’t have an account?{" "}
                            <span className="text-secondary font-semibold cursor-pointer hover:underline">
                                Sign up
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}