"use client";

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
}
