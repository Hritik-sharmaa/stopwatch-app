import React, { useEffect, useRef, useState } from "react";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elpasedTime, setElpasedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElpasedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elpasedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setElpasedTime(0);
  }

  function formatTime() {
    let hours = Math.floor(elpasedTime / (1000 * 60 * 60));
    hours = String(hours).padStart(2, "0");
    let minutes = Math.floor((elpasedTime / (1000 * 60)) % 60);
    minutes = String(minutes).padStart(2, "0");
    let seconds = Math.floor((elpasedTime / 1000) % 60);
    seconds = String(seconds).padStart(2, "0");
    let milliSeconds = Math.floor((elpasedTime % 1000) / 10);
    milliSeconds = String(milliSeconds).padStart(2, "0");
    return `${minutes}:${seconds}:${milliSeconds}`;
  }

  return (
    <div className="stopwatch">
      <div className="display">
        {formatTime()}
        <br></br>
        <button className="stop-btn" onClick={stop}>
          Stop
        </button>
        <button className="start-btn" onClick={start}>
          Start
        </button>
        <button className="reset-btn" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
