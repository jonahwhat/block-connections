"use client"

import Link from "next/link";
import { Alfa_Slab_One } from 'next/font/google'
import useSound from "use-sound";
import CountdownTimer from "../countdown";

const alfaSlabOne = Alfa_Slab_One({
  subsets: ['latin'],
  weight: "400"
});

type ArchiveProps = {
  validPuzzleList: string[];
  currentPuzzle: string;
};

export default function ArchiveList(props: ArchiveProps) {

  if (typeof window == 'undefined') {
    return(
      <></>
    )
  }

  const [playClick] = useSound('/sounds/click.mp3', {volume: 0.4,});
  const playSoundClick = () => {playClick()};
  const [playNo] = useSound('/sounds/villagerno.mp3', {volume: 0.4,});
  const playSoundNo = () => {playNo()};
  
  const stats = JSON.parse(localStorage.getItem("puzzleStatistics") ?? "{}");




  function getPuzzleColorClass(id: string) {
    if (!stats[id]) {  return "bg-slate-200 hover:bg-slate-300";}
      const data = stats[id];
    if (!data?.solved) return "bg-amber-200 hover:bg-amber-300";
    if (data?.solved) return "bg-lime-200 hover:bg-lime-300";
  }

  const puzzleTextComponent = (id: string) => {

    if (!stats[id]) {
      return(<h3 className="text-gray-600"><b>Unsolved</b> - Tap to play!</h3>)
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


      return(<h3 className="text-gray-600"><b>Solved!</b> - {mistakeString}</h3>)
    }

    return(<h3 className="text-gray-600"><b>Failed!</b> - Better luck next time!</h3>)

  }

  return (
    <div className="grid py-2 grid-cols-1 gap-3 w-4/5 text-wrap">
      {props.validPuzzleList.map((item) => (
       <Link key={item} href={`/puzzle/${item}`} className={`${getPuzzleColorClass(item)} py-5 rounded-md text-center`} onClick={playSoundClick}>
            <h2 className={`${alfaSlabOne.className} text-black text-base text-center font-bold`} style={{ fontSize: "clamp(1.3rem, 2vw, 1.6rem)" }}>
                Puzzle #{parseInt(item)}
            </h2>

            {puzzleTextComponent(item)}
        </Link>
      ))}
      <button  className={`bg-zinc-100 py-5 rounded-md text-center`}  onClick={playSoundNo}>
            <h2 className={`${alfaSlabOne.className} text-zinc-400 text-base text-center font-bold`} style={{ fontSize: "clamp(1.3rem, 2vw, 1.6rem)" }}>
                Puzzle #{parseInt(props.currentPuzzle) + 1}
            </h2>
            <h3 className="text-gray-400">
                New puzzle in <CountdownTimer/>
            </h3>
        </button>
    </div>
  );
}
