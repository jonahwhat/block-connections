import { Word } from "@/app/_types";
import { delay, getEmoji } from "@/app/_utils";
import ControlButton from "../button/control-button";
import GuessHistory from "../guess-history";
import GameModal from "./game-modal";
import Popup from "@/app/_components/popup";
import usePopup from "@/app/_hooks/use-popup";
import useSound from "use-sound";
import CountdownTimer from "../countdown";
import { Alfa_Slab_One } from 'next/font/google'

const alfaSlabOne = Alfa_Slab_One({
  subsets: ['latin'],
  weight: "400"
});


type GameWonModalProps = {
  isOpen: boolean;
  onClose: () => void;
  guessHistory: Word[][];
  perfection: string;
  message: string;
  id: string;
};

export default function GameWonModal(props: GameWonModalProps) {
  const [popupState, showPopup] = usePopup();
  const [playClick] = useSound('/sounds/click.mp3', {volume: 0.4,});

  const handleCopyResults = async () => {
    const resultsText = `Craft Connections ⛏️\nPuzzle #${parseInt(props.id)}\n${props.guessHistory
      .map(group => group.map(word => getEmoji(word.level)).join(""))
      .join("\n")}\nhttps://craftconnections.net/`;

    try {
      await navigator.clipboard.writeText(resultsText);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }

    playClick()
    showPopup("Copied results to clipboard!");
    await delay(1250);

    props.onClose();
  };



  return (
    <GameModal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="flex flex-col items-center justify-center">
        <h1 className={`${alfaSlabOne.className} text-center text-black text-4xl font-bold`}>
          {props.perfection}
        </h1>
        <hr className="mb-2 md:mb-4 w-full"></hr>
        <h2 className="text-black mb-2">{props.message}</h2>
        <GuessHistory guessHistory={props.guessHistory} />
        <h2 className="text-black mb-3">New puzzle in {" "}
          <CountdownTimer/>
        </h2>

        <ControlButton text="Copy Results" onClick={handleCopyResults} />
        <Popup show={popupState.show} message={popupState.message} />
      </div>
    </GameModal>
  );
}
