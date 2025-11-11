export default function savePuzzleStatistics(id: string, dateStarted: number, played: boolean, solved: boolean, mistakes: number) {
  const stats = JSON.parse(localStorage.getItem("puzzleStatistics") ?? "{}");

  if (!stats[id]) {
    stats[id] = {
        puzzle_id: id,
        date_started: dateStarted,
        date_solved: Date.now(),
        played: played,
        solved: solved,
        mistakes: mistakes
    };

    localStorage.setItem("puzzleStatistics", JSON.stringify(stats));
  }
}