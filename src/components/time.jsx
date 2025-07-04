import React, { useEffect, useState } from 'react'
import './time.css'

function Time() {
  const [currentTime, setCurrentTime] = useState(() =>
    new Date().toLocaleString("en-GB", {
      timeZone: "Asia/Kolkata",
      hour12: true
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour12: true
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p>{currentTime}</p>
  );
}

export default Time
