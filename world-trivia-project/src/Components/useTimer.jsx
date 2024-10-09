import { useState, useEffect } from 'react';

// ! Gerardo
const useTimer = (initialTime, isRunning, onTimeout) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      onTimeout(); // Callback when the timer reaches 0
    }

    return () => clearInterval(timer); // Clear the interval on unmount
  }, [timeLeft, isRunning, onTimeout]);

  const resetTimer = () => {
    setTimeLeft(initialTime);
  };

  return { timeLeft, resetTimer };
};

export default useTimer;
