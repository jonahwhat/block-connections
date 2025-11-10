"use client"

import React from 'react';
import Countdown from "react-countdown";
import { useState, useEffect } from "react";







export default function CountdownTimer() {

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {setHydrated(true)}, [])

  if(!hydrated) {
    return null
  }

  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)

  return (
      <Countdown 
        date={midnight} 
        daysInHours={true}
        
      />
  );
}