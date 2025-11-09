import Link from "next/link";
import { Alfa_Slab_One } from 'next/font/google'
import useSound from "use-sound";

const alfaSlabOne = Alfa_Slab_One({
  subsets: ['latin'],
  weight: "400"
});

type ArchiveProps = {
  validPuzzleList: string[];
  currentPuzzle: string;
};

export default function ArchiveList(props: ArchiveProps) {

  const [playClick] = useSound('/sounds/click.mp3', {volume: 0.4,});
  const playSoundClick = () => {
      playClick()
    };

  const [playNo] = useSound('/sounds/villagerno.mp3', {volume: 0.4,});
  const playSoundNo = () => {
      playNo()
    };

  return (
    <div className="grid py-2 grid-cols-1 gap-3 w-4/5 text-wrap">
      {props.validPuzzleList.map((item) => (
       <Link key={item} href={`/puzzle/${item}`} className={`bg-slate-200 py-5 rounded-md text-center`} onClick={playSoundClick}>
            <h2 className={`text-black text-base text-center font-bold`} style={{ fontSize: "clamp(1.3rem, 2vw, 1.3rem)" }}>
                Puzzle #{parseInt(item)}
            </h2>
            <h3 className="text-gray-600">
                Click to play!
            </h3>
        </Link>
      ))}
      <button  className={`bg-zinc-100 py-5 rounded-md text-center`}  onClick={playSoundNo}>
            <h2 className={`text-zinc-400 text-base text-center font-bold`} style={{ fontSize: "clamp(1.3rem, 2vw, 1.3rem)" }}>
                Puzzle #{parseInt(props.currentPuzzle) + 1}
            </h2>
            <h3 className="text-gray-400">
                Coming soon!
            </h3>
        </button>
    </div>
  );
}
