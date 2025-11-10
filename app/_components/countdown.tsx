import React from 'react';
import Countdown from "react-countdown";

export default function CountdownTimer() {
  const now = new Date()
  const midnight = now.setHours(24,0,0,0)

  return (
      <Countdown 
        date={midnight} 
        daysInHours={true}
      />
  );
}