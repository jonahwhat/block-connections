"use client";

import PuzzlePage from "@/app/puzzle/[id]/page"; // relative path
import { currentPuzzleString } from "../public/puzzles/current";
import { Analytics } from "@vercel/analytics/next"

export default function Home() {
  
  return (
    <>
    <Analytics />
    <PuzzlePage params={{
        id: currentPuzzleString
      }}      
    />
    </>
  )
}
