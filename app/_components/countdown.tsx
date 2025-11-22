"use client"

import React from 'react'
import Countdown from "react-countdown"
import { useState, useEffect } from "react"

export default function CountdownTimer() {

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => { setHydrated(true) }, [])

  if (!hydrated) {
    return null
  }

  const now = new Date();

  const nowInNY = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));

  const nextMidnightNY = new Date(nowInNY.getFullYear(), nowInNY.getMonth(), nowInNY.getDate() + 1);

  const targetDate = new Date(now.getTime() + (nextMidnightNY.getTime() - nowInNY.getTime()));

  return (
    <Countdown
      date={targetDate}
      daysInHours={true}
    />
  );
}