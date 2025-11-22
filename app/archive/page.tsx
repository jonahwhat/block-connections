"use client";

import { Alfa_Slab_One } from 'next/font/google'
import ArchiveList from "../_components/archive/archive-list";
import { currentPuzzleString } from "@/public/puzzles/current";
import Link from "next/link";
import useSound from "use-sound";
import { Analytics } from "@vercel/analytics/next"


const alfaSlabOne = Alfa_Slab_One({
  subsets: ['latin'],
  weight: "400"
});

export default function PuzzlePage() {

  const [playClick] = useSound('/sounds/click.mp3', {volume: 0.4,});
  const playSoundClick = () => {playClick()};

  
  return (
    <>
      <Analytics />
      <div className="flex p-1 lg:p-6 flex-col items-center w-full md:w-3/4 lg:w-9/12 xl:w-7/12 2xl:w-6/12 mx-auto mt-1">
        <h1 className={`${alfaSlabOne.className} text-center text-black text-4xl font-bold`} style={{ fontSize: "clamp(1.9rem, 3vw, 3rem)" }}>
          CraftConnections
        </h1>
        <h1 className="text-slate-800 my-1 lg:my-2 text-center" style={{ fontSize: "clamp(0.85rem, 2vw, 1.15rem)" }}>Click to solve any previous puzzles!</h1>

        <ArchiveList 
          currentPuzzle={currentPuzzleString}
        />
        </div>
    </>
  );
}
