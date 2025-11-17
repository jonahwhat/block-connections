"use client";

import { useEffect, useState } from "react";
import { puzzleList } from "../../public/puzzles/puzzle-list";
import { Category, CurrentPuzzleStatus, Word } from "../_types";

export function createCurrentPuzzleStorage(id: string) {
    // null = not yet loaded from localStorage
    const [stats, setStats] = useState<CurrentPuzzleStatus | null>(null);
    const categories = puzzleList[id];
    const [gameWords, setGameWords] = useState<Word[]>([]);

    useEffect(() => {
        try {
            const raw = localStorage.getItem("currentPuzzleStatus");
            setStats(raw ? JSON.parse(raw) : {});
        } catch (e) {
            console.error("Failed to parse currentPuzzleStatus:", e);
            setStats({});
        }
    }, []);

    useEffect(() => {
        if (!categories) {
            setGameWords([]);
            return;
        }

        const words: Word[] = categories.flatMap((category) =>
            category.items.map((word) => ({ word, level: category.level }))
        );

        setGameWords(words);
    }, [id]); 

    useEffect(() => {
        if (stats === null) return;

        if (!gameWords.length) return;

        if (stats[id]) return;

        const newEntry = {
            puzzle_id: id,
            mistakesRemaining: 4,
            gameWords,
            clearedCategories: [] as Category[],
            guessHistory: [] as Word[][],
        };

        const newStats = { ...stats, [id]: newEntry };

        setStats(newStats);
        try {
            localStorage.setItem("currentPuzzleStatus", JSON.stringify(newStats));
        } catch (e) {
            console.error("Failed to save currentPuzzleStatus:", e);
        }
    }, [stats, gameWords, id]);
}


export function updateCurrentPuzzleMistakes(
    id: string,
    mistakesRemaining: number
) {
    const stats = JSON.parse(localStorage.getItem("currentPuzzleStatus") ?? "{}");

    stats[id]["mistakesRemaining"] = mistakesRemaining;

    localStorage.setItem("currentPuzzleStatus", JSON.stringify(stats));
}
