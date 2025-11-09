"use client";

import { useCallback, useState } from "react";
import { Alfa_Slab_One } from 'next/font/google'
import { validPuzzleList } from "../../public/puzzles/valid-puzzles";
import ArchiveList from "../_components/archive/archive-list";
import { currentPuzzleString } from "@/public/puzzles/current";
import Link from "next/link";


const alfaSlabOne = Alfa_Slab_One({
  subsets: ['latin'],
  weight: "400"
});

export default function PuzzlePage() {
  return (
    <>
      <div className="flex p-1 flex-col items-center w-full md:w-3/4 lg:w-9/12 xl:w-7/12 2xl:w-6/12 mx-auto mt-1">
        <h1 className={`${alfaSlabOne.className} text-black text-4xl font-bold`} style={{ fontSize: "clamp(1.8rem, 2vw, 2.5rem)" }}>
          Craft Connections
        </h1>
        <hr className="w-full"></hr>
        <h1 className="text-slate-800 my-1" style={{ fontSize: "clamp(0.7rem, 2vw, 1.0rem)" }}>Solve previous puzzles!</h1>
        <ArchiveList 
          validPuzzleList={validPuzzleList}
          currentPuzzle={currentPuzzleString}
        />

          <Link href={`/`} className={`w-full text-center`}>
            <h2 className={`${alfaSlabOne.className} p-10 underline text-gray-900 text-center font-bold text-2xl`}>
                Today&apos;s Puzzle
            </h2>
        </Link>
        </div>
    </>
  );
}
