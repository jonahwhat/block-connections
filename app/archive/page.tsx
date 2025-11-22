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
      <div className="flex p-1 lg:p-6 flex-col items-center w-full md:w-3/4 lg:w-9/12 xl:w-7/12 2xl:w-6/12 mx-auto mt-3">
        <h1 className={`${alfaSlabOne.className} text-center text-black text-4xl font-bold sm:my-2`} style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.5rem)" }}>
          CraftConnections
        </h1>
        <h2 className="text-center text-slate-800 font-normal text-2xl font-sans sm:mb-2" style={{ fontSize: "clamp(0.8rem, 2vw, 1.4rem)" }}>Click to solve any previous puzzles!</h2>

        <ArchiveList 
          currentPuzzle={currentPuzzleString}
        />
        </div>
    </>
  );
}
