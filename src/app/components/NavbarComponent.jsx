"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function NavbarComponent() {
    const [dark, setDark] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);


    // will apply theme to comp later not functional
    useEffect(() => {
        const root = document.documentElement;

        if (dark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [dark]);

    return (
        <>
            {/* NAVBAR */}
            <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-outline-variant dark:border-white/10">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 h-20">

                    {/* BRAND */}
                    <h1 className="text-2xl font-bold text-primary dark:text-white tracking-tight">
                        IdeaVault
                    </h1>

                    {/* DESKTOP MENU */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <a className="text-primary dark:text-white" href="#">Home</a>
                        <a className="text-gray-500 hover:text-primary dark:hover:text-white" href="#">Ideas</a>
                        <a className="text-gray-500 hover:text-primary dark:hover:text-white" href="#">Add Idea</a>
                        <a className="text-gray-500 hover:text-primary dark:hover:text-white" href="#">Investors</a>
                    </nav>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-3">

                        {/* THEME TOGGLE */}
                        <Button
                            isIconOnly
                            variant="light"
                            onClick={() => setDark(!dark)}
                            className="text-primary dark:text-white"
                        >
                            {dark ? <FaSun /> : <FaMoon />}
                        </Button>

                        {/* PROFILE */}
                        <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-700" />

                        {/* MOBILE BUTTON */}
                        <Button
                            isIconOnly
                            variant="light"
                            className="md:hidden"
                            onClick={() => setMobileOpen(true)}
                        >
                            ☰
                        </Button>
                    </div>
                </div>
            </header>

            {/* MOBILE MENU */}
            <div
                className={`fixed inset-0 z-50 bg-black/50 transition ${mobileOpen ? "visible opacity-100" : "invisible opacity-0"
                    }`}
                onClick={() => setMobileOpen(false)}
            >
                <div
                    className={`absolute right-0 top-0 w-72 h-full bg-background dark:bg-gray-900 p-6 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-xl font-bold mb-8 text-primary dark:text-white">
                        IdeaVault
                    </h2>

                    <div className="flex flex-col gap-5">
                        <a href="#">Home</a>
                        <a href="#">Ideas</a>
                        <a href="#">Add Idea</a>
                        <a href="#">Investors</a>
                    </div>

                    <Button
                        className="mt-8 w-full"
                        onClick={() => setDark(!dark)}
                    >
                        Toggle Theme
                    </Button>
                </div>
            </div>
        </>
    );
}