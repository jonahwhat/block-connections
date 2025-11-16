import { getWordColor } from "@/app/_utils";
import { Category } from "@/app/_types";

export default function ClearedCategory(props: { category: Category }) {
  const level = props.category.level;
  const bgColor = getWordColor(level);

  const concatItems = props.category.items.join(", ");

  return (
    <div
      className={`flex flex-col items-center col-span-4 py-6 lg:py-8 rounded-md lg:rounded-xl animate-fade ${bgColor}`}
    >
      <h1 className="text-black font-bold text-md md:text-xl text-center">
        {props.category.category}
      </h1>
      <h2 className="text-black text-sm md:text-md text-center mx-2" style={{ fontSize: "clamp(0.7rem, 2vw, 1.0rem)" }}>{concatItems}</h2>
    </div>
  );
}
