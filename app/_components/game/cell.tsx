"use client";

import { Word } from "@/app/_types";

type CellProps = {
  cellValue: Word;
  onClick: (word: Word) => void;
  animateGuess: boolean;
  animateWrongGuess: boolean;
  id: string;
};

export default function Cell(props: CellProps) {
  const bgColor = props.cellValue.selected ? "bg-slate-600" : "bg-slate-200";
  const textColor = props.cellValue.selected ? "text-stone-100" : "text-black";
  const hover = props.cellValue.selected ? "" : "sm:hover:bg-slate-300";
  const gifList = ["COMPASS", "PRISMARINE", "SEA LANTERN", "CLOCK", "CALIBRATED SKULK SENSOR", "STONECUTTER"]
  const fileExtension = gifList.includes(props.cellValue.word.toUpperCase()) ? "gif" : "png"

  const handleClick = () => {
    props.onClick(props.cellValue);
  };

  const guessAnimation = props.animateGuess ? "transform -translate-y-2" : "";
  const wrongGuessAnimation = props.animateWrongGuess ? "animate-horizontal-shake": "";
  // const shuffleAnimation = props.animateWrongGuess ? "animate-horizontal-shake": "";

  return (
    <button
      className={`${bgColor} ${hover} py-3 rounded-md break-all transition ease-in-out ${guessAnimation} ${wrongGuessAnimation}`}
      onClick={handleClick}
    >
      <img src={`\\images\\${props.id}\\${props.cellValue.word.toLowerCase()}.${fileExtension}`} className="mx-auto" width="70" height="70" draggable="false"></img>

      <h2 className={`${textColor} text-xs md:text-base text-center font-bold break-normal`} style={{ fontSize: "clamp(0.6rem, 2vw, 1.1rem)" }}>
        {props.cellValue.word.toUpperCase()}
      </h2>
    </button>
  );
}
