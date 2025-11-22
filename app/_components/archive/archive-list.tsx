import Link from "next/link";
import { Alfa_Slab_One } from 'next/font/google'
import useSound from "use-sound";
import CountdownTimer from "../countdown";
import { useEffect, useState } from "react";
import { PuzzleStatistics } from "@/app/_types";
import { puzzleList } from "@/public/puzzles/puzzle-list";
import { currentPuzzleString } from "@/public/puzzles/current";

const alfaSlabOne = Alfa_Slab_One({
  subsets: ['latin'],
  weight: "400"
});

type ArchiveProps = {
  currentPuzzle: string;
};

export default function ArchiveList(props: ArchiveProps) {

  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.4, });
  const playSoundClick = () => { playClick() };
  const [playNo] = useSound('/sounds/villagerno.mp3', { volume: 0.4, });
  const playSoundNo = () => { playNo() };

  const [stats, setItem] = useState<PuzzleStatistics>({});;


  useEffect(() => {
    setItem(JSON.parse(localStorage.getItem("puzzleStatistics") ?? "{}"));
  }, [])


  function getPuzzleColorClass(id: string) {
    if (!stats[id]) { return "bg-slate-200 sm:hover:bg-slate-300"; }
    const data = stats[id];
    if (!data?.solved) return "bg-rose-200 sm:hover:bg-rose-300";
    if (data?.solved) return "bg-lime-200 sm:hover:bg-lime-300";
  }

  const puzzleTextComponent = (id: string) => {

    if (!stats[id]) {
      return (<h3 className="text-gray-600"><b>Unsolved</b> - Tap to play!</h3>)
    }

    if (stats[id]["solved"]) {

      const mistakes = stats[id]["mistakes"]
      let mistakeString = `${mistakes} Mistakes`

      if (mistakes == 0) {
        mistakeString = "Perfect!"
      }
      else if (mistakes == 1) {
        mistakeString = "1 Mistake"
      }


      return (<h3 className="text-gray-600"><b>Solved!</b> - {mistakeString}</h3>)
    }

    return (<h3 className="text-gray-600"><b>Failed!</b> - Better luck next time!</h3>)

  }

  const date = new Date()
  const dateWritten = date.toLocaleDateString('en-US', {year: "numeric", month: "long", day: "2-digit"})


  return (
    <div className="grid py-2 grid-cols-1 gap-3 w-11/12 text-wrap">
      <hr/>
      <Link key={"current_puzzle"} href={`/`} className={`bg-slate-200 sm:hover:bg-slate-300 py-2 md:py-4 rounded-md text-center`} style={{background: "linear-gradient(128deg,rgba(224, 210, 175, 1) 0%, rgba(240, 249, 250, 1) 52%, rgba(184, 184, 227, 1) 100%)"}} onClick={playSoundClick}>
        <h2 className={`${alfaSlabOne.className} text-black text-base text-center font-bold py-1`} style={{ fontSize: "clamp(1.3rem, 2vw, 1.6rem)" }}>
          Today's Puzzle ⛏️
        </h2>
        <h3 className="text-gray-600"><b>Puzzle #{parseInt(currentPuzzleString)}</b> - {dateWritten}</h3>
      </Link>

      <hr/>

      {Object.keys(puzzleList).map((item) => (
        <Link key={item} href={`/puzzle/${item}`} className={`${getPuzzleColorClass(item)} py-2 md:py-4 rounded-md text-center`} onClick={playSoundClick}>
          <h2 className={`${alfaSlabOne.className} text-black text-base text-center font-bold py-1`} style={{ fontSize: "clamp(1.3rem, 2vw, 1.6rem)" }}>
            Puzzle #{parseInt(item)}
          </h2>

          {puzzleTextComponent(item)}
        </Link>
      ))}
      <button className={`bg-zinc-100 py-2 md:py-4 rounded-md text-center`} onClick={playSoundNo}>
        <h2 className={`${alfaSlabOne.className} text-zinc-400 text-base text-center font-bold py-1`} style={{ fontSize: "clamp(1.3rem, 2vw, 1.6rem)" }}>
          Puzzle #{parseInt(props.currentPuzzle) + 1}
        </h2>
        <h3 className="text-gray-400">
          New puzzle in <CountdownTimer />
        </h3>
      </button>
    </div>
  );
}
