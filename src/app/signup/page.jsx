"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { authClient, signUp } from "@/app/lib/auth-client";

export default function SignupPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        photoURL: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const result = await signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.fullName,
                image: formData.photoURL || undefined,
            });

            if (result.data) {
                setSuccess("Account created!");
                setTimeout(() => router.push("/homepage"), 1200);
            } else {
                setError(result?.error?.message || "Signup failed");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/homepage",
            });
        } catch (err) {
            console.error(err);
            setError("Google signup failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f3e7] dark:bg-[#050805] p-6 transition-colors duration-500">

            <div className="w-full max-w-5xl grid md:grid-cols-12 bg-white dark:bg-[#11150f] rounded-2xl shadow-2xl overflow-hidden border border-black/5 dark:border-white/10 transition-colors duration-500">

                {/* LEFT */}
                <div className="hidden md:flex md:col-span-5 bg-[#4c6700] dark:bg-lime-500 text-white dark:text-black p-10 flex-col justify-end transition-colors duration-500">

                    <span className="text-xs uppercase tracking-[0.25em] opacity-80">
                        Join IdeaVault
                    </span>

                    <h2 className="text-4xl font-black mt-4 leading-tight">
                        Build & Share Ideas Globally
                    </h2>

                    <p className="text-sm opacity-80 mt-4 max-w-sm">
                        Connect with innovators, validate ideas, and turn concepts
                        into real-world startups.
                    </p>

                </div>

                {/* RIGHT */}
                <div className="md:col-span-7 p-8 md:p-10">

                    <h2 className="text-3xl font-black text-[#18240a] dark:text-white mb-6 transition-colors duration-500">
                        Create Account
                    </h2>

                    {/* ERROR */}
                    {error && (
                        <div className="p-3 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-500/20 rounded-xl mb-4">
                            {error}
                        </div>
                    )}

                    {/* SUCCESS */}
                    {success && (
                        <div className="p-3 bg-green-100 dark:bg-lime-500/10 text-green-700 dark:text-lime-300 border border-green-200 dark:border-lime-500/20 rounded-xl mb-4">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSignup} className="space-y-5">

                        {/* Full Name */}
                        <input
                            name="fullName"
                            placeholder="Full Name"
                            onChange={handleChange}
                            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0f08] px-4 py-3 text-[#18240a] dark:text-white placeholder:text-[#8a8d85] dark:placeholder:text-white/30 outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all"
                        />

                        {/* Email */}
                        <input
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0f08] px-4 py-3 text-[#18240a] dark:text-white placeholder:text-[#8a8d85] dark:placeholder:text-white/30 outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all"
                        />

                        {/* Photo URL */}
                        <input
                            name="photoURL"
                            placeholder="Photo URL (optional)"
                            onChange={handleChange}
                            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0f08] px-4 py-3 text-[#18240a] dark:text-white placeholder:text-[#8a8d85] dark:placeholder:text-white/30 outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all"
                        />

                        {/* Password */}
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0f08] px-4 py-3 text-[#18240a] dark:text-white placeholder:text-[#8a8d85] dark:placeholder:text-white/30 outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all"
                        />

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-[#18240a] dark:bg-lime-500 py-6 font-semibold text-white dark:text-black transition-all hover:scale-[1.02]"
                        >
                            {loading ? "Creating..." : "Create Account"}
                        </Button>

                        {/* Divider */}
                        <div className="flex items-center gap-3 py-2">
                            <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
                            <span className="text-xs text-[#7a7d75] dark:text-white/40 uppercase tracking-wider">
                                OR
                            </span>
                            <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
                        </div>

                        {/* GOOGLE */}
                        <button
                            type="button"
                            onClick={handleGoogleSignup}
                            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0f08] px-4 py-3 flex items-center justify-center gap-3 text-[#18240a] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition"
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                className="w-5 h-5"
                                alt="Google"
                            />
                            Continue with Google
                        </button>

                    </form>
                    {/* Footer Link */}
                    <p className="mt-8 text-center text-sm text-[#5b5d57] dark:text-white/60">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="font-semibold text-lime-700 dark:text-lime-400 hover:underline"
                        >
                            Login here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}