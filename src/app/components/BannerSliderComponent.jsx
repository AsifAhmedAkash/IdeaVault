"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
    const [current, setCurrent] = useState(0);
    const intervalRef = useRef(null);

    const totalSlides = 3;

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % totalSlides);
    };

    const goToSlide = (index) => {
        setCurrent(index);
        restartAuto();
    };

    const restartAuto = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(nextSlide, 5000);
    };

    useEffect(() => {
        intervalRef.current = setInterval(nextSlide, 5000);
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <main className="relative h-screen w-full overflow-hidden bg-background">

            {/* Slides */}
            {[0, 1, 2].map((i) => (
                <section
                    key={i}
                    className={`absolute inset-0 transition-all duration-700 ${current === i ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30 z-10" />

                    {/* Background image */}
                    <img
                        src={`/slide-${i + 1}.jpg`}
                        alt=""
                        className="w-full h-full object-cover"
                    />

                    {/* Content */}
                    <div className="absolute inset-0 z-20 flex items-center px-10 md:px-24">
                        <div className="max-w-2xl text-white">

                            <span className="text-xs uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full">
                                Growth Ecosystem
                            </span>

                            <h1 className="text-4xl md:text-6xl font-bold mt-6">
                                {i === 0 && "Grounded Ideas, High Stakes Growth"}
                                {i === 1 && "Structured Success, Scalable Future"}
                                {i === 2 && "Build Together. Grow Enduringly."}
                            </h1>

                            <p className="mt-6 text-white/80 border-l-2 border-green-400 pl-4">
                                Altravo bridges innovation and structured capital for modern founders.
                            </p>

                            <div className="flex gap-4 mt-8">
                                <button className="px-6 py-3 bg-green-500 text-black rounded-lg">
                                    Explore Ideas
                                </button>
                                <button className="px-6 py-3 border border-white rounded-lg">
                                    View Portfolio
                                </button>
                            </div>

                        </div>
                    </div>
                </section>
            ))}

            {/* Dots */}
            <div className="absolute bottom-10 right-10 z-30 flex flex-col gap-3">
                {[0, 1, 2].map((i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`w-3 h-3 rounded-full border transition-all ${current === i ? "bg-white" : "bg-white/30"
                            }`}
                    />
                ))}
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-30">
                <div
                    key={current}
                    className="h-full bg-green-400 transition-all duration-[5000ms] ease-linear"
                    style={{ width: "100%" }}
                />
            </div>
        </main>
    );
}