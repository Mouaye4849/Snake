import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [darkMode, setDarkMode] = useState(false);
    const [glitch, setGlitch] = useState(false);
    const navigate = useNavigate();

    const toggleDarkMode = () => {
        const mode = !darkMode;
        setDarkMode(mode);

        if (mode) {
            setGlitch(true);

            setTimeout(() => {
                setGlitch(false);
                navigate("/snake");
            }, 2000);
        }
    };

    return (
        <div className={darkMode ? "dark" : ""}>
            {glitch && <div className="glitch-overlay">ACCESS GRANTED</div>}

            <button
                onClick={toggleDarkMode}
                className="absolute top-4 right-4 text-3xl z-50 text-white"
            >
                {darkMode ? "☀" : "🌙"}
            </button>

            <main className="relative h-screen w-full flex items-center justify-center overflow-hidden">


                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0a0a0a,#000000)] opacity-80"></div>
                <div className="absolute inset-0 bg-grid"></div>
                <div className="absolute top-4 left-4 flex items-center gap-2 z-50">
                    <img src="/snake1.jpg" alt="Logo Serpent" className="w-10 h-10" />
                    <span className="text-cyan-400 font-bold text-xl">
                        Serpent Caché
                    </span>
                </div>


                {!glitch && (
                    <h1 className="text-4xl font-bold text-cyan-400 tracking-wide z-20 text-center">
                        Active le Mode Sombre pour découvrir le secret...
                    </h1>
                )}
            </main>
        </div>
    );
}