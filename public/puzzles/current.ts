import { puzzleList } from "./puzzle-list";

export const currentPuzzleString: string = Object.keys(puzzleList).sort().pop() ?? "001"