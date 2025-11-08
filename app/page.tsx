"use client";

import PuzzlePage from "@/app/puzzle/[id]/page"; // relative path
import { currentPuzzleString } from "../public/puzzles/current";

export default function Home() {
  
  return (
    <>
    <PuzzlePage params={{
        id: currentPuzzleString
      }}      
    />
    </>
  )
}
