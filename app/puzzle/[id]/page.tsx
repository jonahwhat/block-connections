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
import { Analytics } from "@vercel/analytics/next"
import { redirect } from "next/navigation";
import { validPuzzleList } from "../../../public/puzzles/valid-puzzles";
import { Alfa_Slab_One } from 'next/font/google'
import Link from "next/link";
import useSound from "use-sound";
import { useRouter } from "next/navigation";
import CountdownTimer from "@/app/_components/countdown";

type PuzzlePageProps = {
  params: { id: string };
};

const alfaSlabOne = Alfa_Slab_One({
  subsets: ['latin'],
  weight: "400"
});

export default function PuzzlePage({ params }: PuzzlePageProps) {
  const { id } = params;
  const [playClick] = useSound('/sounds/click.mp3', {volume: 0.4,});
  const [playYes] = useSound('/sounds/villageryes.mp3', {volume: 0.5,});
  const playSoundYes = () => {
    playYes()
  };
  const router = useRouter();

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

  const {
    guessAnimationState,
    wrongGuessAnimationState,
    animateGuess,
    animateWrongGuess,
  } = useAnimation();

  const handleSubmit = async () => {
    setSubmitted(true);
    playClick()
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
      <div className="flex gap-2 mb-12">
      <ControlButton
        text="Show Results"
        onClick={() => {
          setShowGameWonModal(true);
          playClick()
        }}
      />
      <ControlButton
        text="Previous Puzzles"
        onClick={() => {
          router.push('/archive')
          playClick()
        }}
      />
      </div>
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

  const renderMistakes = () => {
    const showMistakes = (
        <div className="flex justify-between my-2 lg:my-5">
        <h1 className=" text-slate-800 my-0.5 lg:my-1 mx-2 text-center" style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}>
          Mistakes Remaining:
        </h1>
        <span className="text-gray-600 text-center" style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}>{'❤︎ '.repeat(mistakesRemaining)}</span>
        </div>
    );

    const showCountdown = (
      <div className="flex justify-between my-2 lg:my-5">
        <h1 className="text-slate-800 my-0.5 lg:my-1 mx-2 text-center" style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}>New puzzle in {" "}
          <b><CountdownTimer/></b>
        </h1>
        </div>
    );

    if (isWon) {
      return showCountdown;
    } else if (isLost) {
      return showCountdown;
    } else {
      return showMistakes;
    }
  };

  // if id > maxid or its an invalid id, route to main page
  if (!validPuzzleList.includes(id)) {
    redirect("/");
  }

  return (
    <>
    {/* <div className="flex h-screen justify-center items-center"> */}
      <Analytics />
      <div className="flex p-1 lg:p-6 flex-col items-center w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-6/12 mx-auto mt-1">
      <div className="w-full" onClick={playSoundYes}>
        <h1 className={`${alfaSlabOne.className} text-center text-black text-4xl font-bold`} style={{ fontSize: "clamp(1.9rem, 3vw, 3rem)" }}>
          CraftConnections<span className="text-slate-800 font-normal text-2xl ml-2 font-sans" style={{ fontSize: "clamp(0.8rem, 2vw, 1.3rem)" }}>Puzzle #{ parseInt(id) }</span>
        </h1>
        <hr className="w-full lg:my-1"></hr>
        <h1 className="text-slate-800 my-1 lg:my-2 text-center" style={{ fontSize: "clamp(0.85rem, 2vw, 1.15rem)" }}>Group four Minecraft items that are related!</h1>
        </div>
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
        {renderMistakes()}
        {renderControlButtons()}
      </div>
      
      <GameWonModal
        isOpen={showGameWonModal}
        onClose={() => setShowGameWonModal(false)}
        guessHistory={guessHistoryRef.current}
        perfection={getPerfection(mistakesRemaining)}
        message={getMessage(mistakesRemaining)}
        id={id}
      />
      {/* </div> */}
    </>
  );
}
