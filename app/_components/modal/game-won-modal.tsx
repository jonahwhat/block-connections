import { Word } from "@/app/_types";
import { delay, getEmoji } from "@/app/_utils";
import ControlButton from "../button/control-button";
import GuessHistory from "../guess-history";
import GameModal from "./game-modal";
import Popup from "@/app/_components/popup";
import usePopup from "@/app/_hooks/use-popup";
import { useSounds } from "@/app/_hooks/useSounds";


type GameWonModalProps = {
  isOpen: boolean;
  onClose: () => void;
  guessHistory: Word[][];
  perfection: string;
  message: string;
};

export default function GameWonModal(props: GameWonModalProps) {
  const [popupState, showPopup] = usePopup();
  const { playSound } = useSounds();
  

  const handleCopyResults = async () => {
    const resultsText = `Block Connections\nPuzzle #1\n${props.guessHistory
      .map(group => group.map(word => getEmoji(word.level)).join(""))
      .join("\n")}`;

    try {
      await navigator.clipboard.writeText(resultsText);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }

    playSound("click")
    showPopup("Copied results!");
    await delay(1000);

    props.onClose();
  };



  return (
    <GameModal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="flex flex-col items-center justify-center px-12">
        <h1 className="text-black text-4xl font-black my-4 ml-4">
          {props.perfection}
        </h1>
        <hr className="mb-2 md:mb-4 w-full"></hr>
        <h2 className="text-black mb-8">{props.message}</h2>
        <GuessHistory guessHistory={props.guessHistory} />
        <ControlButton text="Copy Results" onClick={handleCopyResults} />
        <Popup show={popupState.show} message={popupState.message} />
      </div>
    </GameModal>
  );
}
