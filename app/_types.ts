export type Category = {
  category: string;
  items: string[];
  level: 1 | 2 | 3 | 4;
};

type PuzzleStat = {
  puzzle_id: string;
  date_started: number;
  date_solved: number;
  played: boolean;
  solved: boolean;
  mistakes: number;
};

type CurrentPuzzle = {
  puzzle_id: string,
  mistakesRemaining: number,
  gameWords: Word[],
  clearedCategories: Category[],
  guessHistory: Word[][],
}

export type PuzzleStatistics = Record<string, PuzzleStat>;

export type CurrentPuzzleStatus = Record<string, CurrentPuzzle>

export type Word = {
  word: string;
  level: 1 | 2 | 3 | 4;
  selected?: boolean;
};

export type SubmitResultType =
  | "correct"
  | "incorrect"
  | "same"
  | "one-away"
  | "loss"
  | "win";

export type SubmitResult = {
  result: SubmitResultType;
};

export type CellAnimationState = {
  show: boolean;
  index: number;
};

export type PuzzleList = {
  puzzleid: string;
  date: string
};
