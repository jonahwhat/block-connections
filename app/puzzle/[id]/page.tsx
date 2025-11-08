"use client";

import { useCallback, useState } from "react";
import ControlButton from "../../_components/button/control-button";
import Grid from "../../_components/game/grid";
import GameWonModal from "../../_components/modal/game-won-modal";
import Popup from "../../_components/popup";
import useAnimation from "../../_hooks/use-animation";
import useGameLogic from "../../_hooks/use-game-logic";
import usePopup from "../../_hooks/use-popup";
import { SubmitResult, Word } from "../../_types";
import { getPerfection, getMessage } from "../../_utils";
import { useSounds } from "@/app/_hooks/useSounds";
import { Analytics } from "@vercel/analytics/next"
import { redirect } from "next/navigation";
import { validPuzzleList } from "../../../public/puzzles/valid-puzzles";
import { Alfa_Slab_One } from 'next/font/google'
import Link from "next/link";

type PuzzlePageProps = {
  params: { id: string };
};

const alfaSlabOne = Alfa_Slab_One({
  subsets: ['latin'],
  weight: "400"
});

export default function PuzzlePage({ params }: PuzzlePageProps) {
  const { id } = params;

  const [popupState, showPopup] = usePopup();
  const {
    gameWords,
    selectedWords,
    clearedCategories,
    mistakesRemaining,
    isWon,
    isLost,
    guessHistoryRef,
    selectWord,
    shuffleWords,
    deselectAllWords,
    getSubmitResult,
    handleWin,
    handleLoss,
  } = useGameLogic(id);

  const [showGameWonModal, setShowGameWonModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { playSound } = useSounds();

  const {
    guessAnimationState,
    wrongGuessAnimationState,
    animateGuess,
    animateWrongGuess,
  } = useAnimation();

  const handleSubmit = async () => {
    setSubmitted(true);
    playSound("click")
    await animateGuess(selectedWords);

    const result: SubmitResult = getSubmitResult();

    switch (result.result) {
      case "same":
        showPopup("You've already guessed that!");
        break;
      case "one-away":
        animateWrongGuess();
        showPopup("One away...");
        break;
      case "loss":
        showPopup("Better luck next time!");
        await handleLoss();
        setShowGameWonModal(true);
        break;
      case "win":
        showPopup(getPerfection(mistakesRemaining));
        await handleWin();
        setShowGameWonModal(true);
        break;
      case "incorrect":
        animateWrongGuess();
        break;
    }
    setSubmitted(false);
  };

  const onClickCell = useCallback(
    (word: Word) => {
      selectWord(word);
    },
    [selectWord]
  );

  const renderControlButtons = () => {
    const showResultsWonButton = (
      <ControlButton
        text="Show Results"
        onClick={() => {
          setShowGameWonModal(true);
          playSound("click")
        }}
      />
    );

    const inProgressButtons = (
      <div className="flex gap-2 mb-12">
        <ControlButton
          text="Shuffle"
          onClick={shuffleWords}
          unclickable={submitted}
        />
        <ControlButton
          text="Deselect All"
          onClick={deselectAllWords}
          unclickable={selectedWords.length === 0 || submitted}
        />
        <ControlButton
          text="Submit"
          unclickable={selectedWords.length !== 4 || submitted}
          onClick={handleSubmit}
        />
      </div>
    );

    if (isWon) {
      return showResultsWonButton;
    } else if (isLost) {
      return showResultsWonButton;
    } else {
      return inProgressButtons;
    }
  };

  // if id > maxid or its an invalid id, route to main page
  if (!validPuzzleList.includes(id)) {
    redirect("/");
  }

  return (
    <>
      <Analytics />
      <div className="flex p-1 flex-col items-center w-full md:w-3/4 lg:w-9/12 xl:w-7/12 2xl:w-6/12 mx-auto mt-1">
        <h1 className={`${alfaSlabOne.className} text-black text-4xl font-bold`} style={{ fontSize: "clamp(1.8rem, 2vw, 2.5rem)" }}>
          Craft Connections<span className="text-slate-800 font-normal text-2xl ml-2 font-sans" style={{ fontSize: "clamp(0.7rem, 2vw, 1.1rem)" }}>Puzzle #{ parseInt(id) }</span>
        </h1>
        <hr className="w-full"></hr>
        <h1 className="text-slate-800 my-1" style={{ fontSize: "clamp(0.7rem, 2vw, 1.0rem)" }}>Group four Minecraft items together that are related!</h1>
        <div className="relative w-full">
          <Popup show={popupState.show} message={popupState.message} />
          <Grid
            words={gameWords}
            id={id}
            selectedWords={selectedWords}
            onClick={onClickCell}
            clearedCategories={clearedCategories}
            guessAnimationState={guessAnimationState}
            wrongGuessAnimationState={wrongGuessAnimationState}
          />
        </div>
        <h2 className=" text-black my-2 md:my-2 mx-4" style={{ fontSize: "clamp(0.7rem, 2vw, 1.0rem)" }}>
          Mistakes Remaining: {" "} 
          <span className="text-red-700 text-xl">{'❤︎ '.repeat(mistakesRemaining)}</span>
        </h2>
        {renderControlButtons()}
        <Link href={`/archive`} className={`w-full text-center`}>
                    <h2 className={`${alfaSlabOne.className} underline text-gray-900 text-center font-bold text-2xl`}>
                Previous Puzzles
            </h2>
        </Link>
      </div>
      
      <GameWonModal
        isOpen={showGameWonModal}
        onClose={() => setShowGameWonModal(false)}
        guessHistory={guessHistoryRef.current}
        perfection={getPerfection(mistakesRemaining)}
        message={getMessage(mistakesRemaining)}
        id={id}
      />
    </>
  );
}
