import test from "node:test";

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

export type PuzzleStatistics = Record<string, PuzzleStat>;

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

export type PuzzleDataStructure = {
  id: string;
  date: string
  author: string;
  puzzle: Category[];
};

export type PuzzleList = Record<string, PuzzleDataStructure>


/*

POTENTIAL PUZZLE LIST DATA STRUCTURE

"015": { 

  date: "11/20/2025"
  author: "craftconnections"
  puzzle: [
      {
        category: "CLIMBABLE BLOCKS",
        items: ["VINES", "LADDER", "TWISTING VINES", "SCAFFOLDING"],
        level: 1,
      },
      {
        ...
      }
    ]

  }
}

*/
