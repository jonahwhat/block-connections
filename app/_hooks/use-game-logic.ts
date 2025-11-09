import { useEffect, useMemo, useRef, useState } from "react";
import { puzzleList } from "../../public/puzzles/puzzle-list";
import { Category, SubmitResult, Word } from "../_types";
import { delay, shuffleArray } from "../_utils";
import useSound from 'use-sound';

export default function useGameLogic(id: string) {

  const [playPageFlip] = useSound('/sounds/page.mp3', {
    volume: 0.2,
  });

  const [playPop] = useSound('/sounds/pop.mp3', {
    volume: 0.15,
  });

  const [playEquip] = useSound('/sounds/equip.mp3', {
    volume: 0.2,
  });

  const [playLevelup] = useSound('/sounds/levelup.mp3', {
    volume: 0.1,
  });

  const [playHurt] = useSound('/sounds/hurt.mp3', {
    volume: 0.25,
  });
  
  const [playShatter] = useSound('/sounds/shatter.mp3', {
    volume: 0.1,
  });

  const [playPing] = useSound('/sounds/ping.mp3', {
    volume: 0.2,
  });

  const [gameWords, setGameWords] = useState<Word[]>([]);
  const selectedWords = useMemo(
    () => gameWords.filter((item) => item.selected),
    [gameWords]
  );
  
  const categories: Category[] = puzzleList[id]

  const [clearedCategories, setClearedCategories] = useState<Category[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [isLost, setIsLost] = useState(false);
  const [mistakesRemaining, setMistakesRemaning] = useState(4);
  const guessHistoryRef = useRef<Word[][]>([]);

  useEffect(() => {
    const words: Word[] = categories
      .map((category) =>
        category.items.map((word) => ({ word: word, level: category.level }))
      )
      .flat();
    setGameWords(shuffleArray(words));
  }, []);

  const selectWord = (word: Word): void => {
    const newGameWords = gameWords.map((item) => {
      playPop()
      if (word.word === item.word) {
        return {
          ...item,
          selected: selectedWords.length < 4 ? !item.selected : false,
        };
      } else {
        return item;
      }
    });

    setGameWords(newGameWords);
  };

  const shuffleWords = () => {
    setGameWords([...shuffleArray(gameWords)]);
    playPageFlip()
  };

  const deselectAllWords = () => {
    setGameWords(
      gameWords.map((item) => {
        playEquip()
        return { ...item, selected: false };
      })
    );
  };

  const getSubmitResult = (): SubmitResult => {
    const sameGuess = guessHistoryRef.current.some((guess) =>
      guess.every((word) => selectedWords.includes(word))
    );

    if (sameGuess) {
      console.log("Same!");
      return { result: "same" };
    }

    guessHistoryRef.current.push(selectedWords);

    const likenessCounts = categories.map((category) => {
      return selectedWords.filter((item) => category.items.includes(item.word))
        .length;
    });

    const maxLikeness = Math.max(...likenessCounts);
    const maxIndex = likenessCounts.indexOf(maxLikeness);

    if (maxLikeness === 4) {
      return getCorrectResult(categories[maxIndex]);
    } else {
      return getIncorrectResult(maxLikeness);
    }
  };

  const getCorrectResult = (category: Category): SubmitResult => {
    setClearedCategories([...clearedCategories, category]);
    setGameWords(
      gameWords.filter((item) => !category.items.includes(item.word))
    );

    if (clearedCategories.length === 3) {
      playLevelup()
      return { result: "win" };
    } else {
      playPing()
      return { result: "correct" };
    }
  };

  const getIncorrectResult = (maxLikeness: number): SubmitResult => {
    setMistakesRemaning(mistakesRemaining - 1);
    playHurt()
    if (mistakesRemaining === 1) {
      playShatter()
      return { result: "loss" };
    } else if (maxLikeness === 3) {
      return { result: "one-away" };
    } else {
      return { result: "incorrect" };
    }
  };

  const handleLoss = async () => {
    const remainingCategories = categories.filter(
      (category) => !clearedCategories.includes(category)
    );

    deselectAllWords();

    for (const category of remainingCategories) {
      await delay(1000);
      setClearedCategories((prevClearedCategories) => [
        ...prevClearedCategories,
        category,
      ]);
      setGameWords((prevGameWords) =>
        prevGameWords.filter((item) => !category.items.includes(item.word))
      );
    }

    await delay(1000);
    setIsLost(true);
  };

  const handleWin = async () => {
    await delay(1000);
    setIsWon(true);
  };

  return {
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
    handleLoss,
    handleWin,
  };
}
