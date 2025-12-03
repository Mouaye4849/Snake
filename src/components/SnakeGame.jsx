import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const gridSize = 20;
const initialSnake = [{ x: 10, y: 10 }];
const initialDirection = { x: 1, y: 0 };

export default function SnakeGame() {
    const navigate = useNavigate();

    const [snake, setSnake] = useState(initialSnake);
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [direction, setDirection] = useState(initialDirection);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const randomFood = () => ({
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
    });

    useEffect(() => {
        const handleKey = (e) => {
            switch (e.key) {
                case "ArrowUp": setDirection({ x: 0, y: -1 }); break;
                case "ArrowDown": setDirection({ x: 0, y: 1 }); break;
                case "ArrowLeft": setDirection({ x: -1, y: 0 }); break;
                case "ArrowRight": setDirection({ x: 1, y: 0 }); break;
                default: break;
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    useEffect(() => {
        if (gameOver) return;

        const interval = setInterval(() => {
            setSnake((prev) => {
                const newHead = {
                    x: prev[0].x + direction.x,
                    y: prev[0].y + direction.y,
                };

                if (
                    newHead.x < 0 || newHead.x >= gridSize ||
                    newHead.y < 0 || newHead.y >= gridSize ||
                    prev.some((seg) => seg.x === newHead.x && seg.y === newHead.y)
                ) {
                    setGameOver(true);
                    return prev;
                }

                const newSnake = [newHead, ...prev];

                if (newHead.x === food.x && newHead.y === food.y) {
                    setFood(randomFood());
                    setScore((s) => s + 1);
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        }, 150);

        return () => clearInterval(interval);
    }, [direction, food, gameOver]);


    const restartGame = () => {
        setSnake(initialSnake);
        setDirection(initialDirection);
        setScore(0);
        setGameOver(false);
        setFood(randomFood());
    };

    return (
        <div className="w-screen h-screen bg-black flex items-center justify-center relative overflow-hidden">


            <button
                onClick={() => navigate("/")}
                className="absolute top-4 left-4 text-white text-xl bg-red-600 px-3 py-1 rounded-lg shadow-lg"
            >
                ⬅ Retour
            </button>





            <div className="absolute top-4 text-white text-xl font-bold">
                Score : {score}
            </div>


            <div
                className="grid gap-px"
                style={{
                    width: "90vmin",
                    height: "90vmin",
                    background: "rgba(0,255,0,0.05)",
                    display: "grid",
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                }}
            >
                {[...Array(gridSize * gridSize)].map((_, i) => {
                    const x = i % gridSize;
                    const y = Math.floor(i / gridSize);
                    const isSnake = snake.some((seg) => seg.x === x && seg.y === y);
                    const isFood = food.x === x && food.y === y;

                    return (
                        <div
                            key={i}
                            className={
                                isSnake
                                    ? "bg-green-500"
                                    : isFood
                                        ? "bg-yellow-400"
                                        : ""
                            }
                        ></div>
                    );
                })}
            </div>


            {gameOver && (
                <div className="absolute bg-black/90 text-white px-10 py-8 rounded-xl text-center border border-red-600 shadow-lg">
                    <h2 className="text-3xl font-bold mb-3">💀 Game Over 💀</h2>
                    <p className="text-xl mb-4">Score Final : {score}</p>
                    <button
                        onClick={restartGame}
                        className="bg-green-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-green-600"
                    >
                        Rejouer
                    </button>
                </div>
            )}
            {!gameOver && (
                <div className="absolute top-4 right-4 text-green-400 text-sm font-bold tracking-wide">
                    Utilisez les flèches ⬆⬇⬅➡ pour déplacer le serpent 🐍
                </div>
            )}
        </div>
    );
}