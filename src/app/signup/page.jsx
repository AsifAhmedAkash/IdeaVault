"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signUp } from "../lib/auth-client";

export default function SignupPage() {
    const [darkMode, setDarkMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        photoURL: "",
        password: "",
    });

    const toggleTheme = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            document.documentElement.classList.toggle("dark", newMode);
            return newMode;
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError("");
    };

    const validateForm = () => {
        if (!formData.fullName.trim()) {
            setError("Full name is required");
            return false;
        }
        if (!formData.email.trim()) {
            setError("Email is required");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email");
            return false;
        }
        if (!formData.password) {
            setError("Password is required");
            return false;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
        }
        return true;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const response = await signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.fullName,
                image: formData.photoURL || undefined,
            });

            if (response.error) {
                setError(response.error.message || "Signup failed. Please try again.");
            } else {
                setSuccess("Account created successfully! Redirecting...");
                setTimeout(() => {
                    router.push("/");
                }, 1500);
            }
        } catch (err) {
            console.error("Signup error:", err);
            setError(err.message || "An error occurred during signup");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#f0f3e7] text-on-background transition-colors duration-300">

            {/* Background Glow */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-20 -left-20 w-[40%] h-[60%] bg-[#4c6700]/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[40%] h-[60%] bg-secondary/10 blur-[120px] rounded-full" />
            </div>

            <div className="w-full max-w-5xl grid md:grid-cols-12 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-xl">

                {/* LEFT SIDE */}
                <div className="hidden md:flex md:col-span-5 relative bg-[#4c6700] text-white p-10 flex-col justify-end">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')] bg-cover bg-center" />

                    <div className="relative z-10">
                        <p className="text-xs tracking-widest text-secondary-fixed">
                            IdeaVault
                        </p>
                        <h2 className="text-3xl font-bold mt-3">
                            Join the future of innovation.
                        </h2>
                        <p className="text-sm text-primary-fixed mt-2">
                            Build, share, and scale startup ideas with global innovators.
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="col-span-1 md:col-span-7 p-10 md:p-14">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-10">
                        <h1 className="text-2xl font-bold text-primary">
                            IdeaVault
                        </h1>

                    </div>

                    <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                    <p className="text-on-surface-variant mb-8">
                        Join IdeaVault and start building your ideas.
                    </p>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleSignup}>

                        {error && (
                            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm border border-red-300">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm border border-green-300">
                                {success}
                            </div>
                        )}

                        <input
                            type="text"
                            placeholder="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg border border-outline-variant bg-surface"
                            disabled={loading}
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg border border-outline-variant bg-surface"
                            disabled={loading}
                        />

                        <input
                            type="url"
                            placeholder="Photo URL (optional)"
                            name="photoURL"
                            value={formData.photoURL}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg border border-outline-variant bg-surface"
                            disabled={loading}
                        />

                        {/* Password */}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full p-3 rounded-lg border border-outline-variant bg-surface"
                                disabled={loading}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-sm text-on-surface-variant"
                                disabled={loading}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* Button */}
                        <Button
                            type="submit"
                            className="w-full bg-[#4c6700] text-on-primary py-3"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Create Account →"}
                        </Button>

                        <p className="text-sm text-center text-on-surface-variant">
                            Already have an account?{" "}
                            <a href="/login" className="text-secondary font-semibold cursor-pointer hover:underline">
                                Login
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}