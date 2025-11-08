"use client";

import { Analytics } from "@vercel/analytics/next"
import AnotherPage from "@/app/puzzle/[id]/page"; // relative path

export default function Home() {
  
  return (
    <>
    <AnotherPage params={{
        id: "001"
      }}      
    />
    </>
  )

  return (
    <>
      <Analytics />
      <div className="flex flex-col items-center w-11/12 md:w-3/4 lg:w-9/12 xl:w-7/12 2xl:w-5/12 mx-auto mt-1">
        <h1 className="text-black text-4xl font-bold my-2 ml-4" style={{ fontSize: "clamp(1.7rem, 2vw, 2.5rem)" }}>
          Craft Connections
        </h1>
        <h1 className="text-slate-800 my-2" style={{ fontSize: "clamp(0.7rem, 2vw, 1.0rem)" }}>Group four Minecraft blocks together that are related!</h1>

      <div className="relative w-full">
          {/* <Popup show={popupState.show} message={popupState.message} />
          <Grid
            words={gameWords}
            id={id}
            selectedWords={selectedWords}
            onClick={onClickCell}
            clearedCategories={clearedCategories}
            guessAnimationState={guessAnimationState}
            wrongGuessAnimationState={wrongGuessAnimationState}
          /> */}
        </div>

      </div>
    </>
  );
}
