import Link from "next/link";
import { Alfa_Slab_One } from 'next/font/google'

const alfaSlabOne = Alfa_Slab_One({
  subsets: ['latin'],
  weight: "400"
});

type ArchiveProps = {
  validPuzzleList: string[];
  currentPuzzle: string;
};

export default function ArchiveList(props: ArchiveProps) {
  return (
    <div className="grid py-2 grid-cols-1 gap-3 w-4/5 text-wrap">
      {props.validPuzzleList.map((item) => (
       <Link key={item} href={`/puzzle/${item}`} className={`bg-slate-200 py-5 rounded-md text-center`}>
            <h2 className={`text-black text-base text-center font-bold`} style={{ fontSize: "clamp(1.3rem, 2vw, 1.3rem)" }}>
                Puzzle #{parseInt(item)}
            </h2>
            <h3 className="text-gray-500">
                Unsolved
            </h3>
        </Link>
      ))}
      <button  className={`bg-zinc-100 py-5 rounded-md text-center`}>
            <h2 className={`text-zinc-600 text-base text-center font-bold`} style={{ fontSize: "clamp(1.3rem, 2vw, 1.3rem)" }}>
                Puzzle #{parseInt(props.currentPuzzle) + 1}
            </h2>
            <h3 className="text-gray-500">
                Coming soon!
            </h3>
        </button>
        <Link href={`/`} className={`w-full text-center`}>
            <h2 className={`${alfaSlabOne.className} p-10 underline text-gray-900 text-center font-bold text-2xl`}>
                Back to Today's Puzzle
            </h2>
        </Link>
    </div>
  );
}
