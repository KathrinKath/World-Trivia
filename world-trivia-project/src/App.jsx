import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti'; // Import the confetti library
import { countriesData } from './Data/countriesData';
import './App.css';
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome
import Navbar from '../src/Components/navbar'; // Import the Navbar component
import useTimer from './Components/useTimer'; // Import the Timer (Test)
function App() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [clicked, setClicked] = useState(false);
  const countries = Object.keys(countriesData);
  // Callback for when the timer runs out
  const handleTimeout = () => {
    setShowResult(true); // End the game and show the final score
  };
  const initialTime = 30; // Initial time for the timer

  // Use the timer
  const { timeLeft, resetTimer } = useTimer(
    initialTime,
    !clicked && selectedCountry && !showResult, // Timer runs if a country is selected, game is not over, and no question is clicked
    handleTimeout // Timer runs out and triggers this function
  );
  // Function to play sound
  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };
  function handleCountryChange(e) {
    setSelectedCountry(e.target.value);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setUserAnswer('');
    setClicked(false);
    resetTimer(); // Reset timer when a new country is selected
  }
  function handleAnswerClick(option) {
    setClicked(true);
    if (
      option ===
      countriesData[selectedCountry].questions[currentQuestionIndex]
        .correctAnswer
    ) {
      setScore(score + 1);
      triggerConfetti(); // Trigger confetti on correct answer
    }
    setUserAnswer(option);
    setTimeout(function () {
      setUserAnswer('');
      setClicked(false);
      if (
        currentQuestionIndex <
        countriesData[selectedCountry].questions.length - 1
      ) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        resetTimer(); // Reset the timer for the next question
      } else {
        setShowResult(true); // End the game and show the final score
      }
    }, 10000); // 10 seconds delay so the user can see the correct answers explanation.
  }
  function triggerConfetti() {
    const canvas = document.createElement('canvas');
    const container = document.getElementById('confetti-container');
    canvas.width = 600;
    canvas.height = 600;
    container.appendChild(canvas);
    const confettiInstance = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });
    confettiInstance({
      spread: 160,
      startVelocity: 30,
      ticks: 60,
      gravity: 0.3,
      colors: [
        '#ff0',
        '#0f0',
        '#00f',
        '#f00',
        '#FF00FF',
        '#00FFFF',
        '#ff0',
        '#0f0',
        '#00f',
        '#f00',
        '#FF00FF',
        '#00FFFF',
      ],
    });
    setTimeout(() => {
      container.removeChild(canvas);
    }, 2000); // Remove canvas after 2 seconds
  }
  function handleRestart() {
    setSelectedCountry('');
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setClicked(false);
    resetTimer(); // Reset the timer when restarting
  }
  // Play sound effect when userAnswer changes
  useEffect(() => {
    if (userAnswer) {
      if (
        userAnswer ===
        countriesData[selectedCountry].questions[currentQuestionIndex]
          .correctAnswer
      ) {
        playSound('/sounds/win.mp3'); // Correct sound file path
      } else {
        playSound('/sounds/error.mp3'); // Wrong sound file path
      }
    }
  }, [userAnswer, selectedCountry, currentQuestionIndex]);
  // Play sound effect when game ends
  useEffect(() => {
    if (showResult) {
      const totalQuestions = countriesData[selectedCountry].questions.length;
      const percentageScore = (score / totalQuestions) * 100; // Calculate percentage

      if (percentageScore > 80) {
        playSound('/sounds/game-win.mp3'); // Play win sound for > 80%
      } else if (percentageScore < 50) {
        playSound('/sounds/lose-sound.mp3');
      } else playSound('/sounds/keep-playing.wav'); // Play lose sound for < 50%
    }
  }, [showResult, score, selectedCountry]);
  return (
    <div className="container">
      {/* Navbar component */}
      <Navbar />
      <label className="selectCountryLabel">Select a Country: </label>
      <select
        onChange={handleCountryChange}
        value={selectedCountry}
        className="selectCountry"
      >
        <option value="" className="selectCountryOptions">
          ***Choose a Country***
        </option>
        {countries.map(function (country) {
          return (
            <option key={country} value={country}>
              {country.replace(/_/g, ' ')}
            </option>
          );
        })}
      </select>
      <div id="confetti-container" style={{ position: 'relative' }}></div>{' '}
      {/* Container for confetti */}
      {selectedCountry && !showResult && (
        <div>
          <h1 className="chosenCountry">
            {selectedCountry.replace(/_/g, ' ')} Trivia
          </h1>
          <h3 className="timer">Time Left: {timeLeft} seconds</h3>
          <h3 className="scoreTitle">Score: {score}</h3>
          <h3 className="questionsBankNumber">
            Question {currentQuestionIndex + 1} of{' '}
            {countriesData[selectedCountry].questions.length}
          </h3>
          <h2 className="fullQuestion">
            Question {currentQuestionIndex + 1}:{' '}
            {
              countriesData[selectedCountry].questions[currentQuestionIndex]
                .question
            }
          </h2>
          <div className="options-grid">
            {countriesData[selectedCountry].questions[
              currentQuestionIndex
            ].options.map(function (option) {
              const isCorrect =
                option ===
                countriesData[selectedCountry].questions[currentQuestionIndex]
                  .correctAnswer;
              const buttonClass =
                clicked && userAnswer
                  ? isCorrect
                    ? 'correct-answer'
                    : 'incorrect-answer'
                  : '';
              return (
                <button
                  key={option}
                  onClick={() => handleAnswerClick(option)}
                  className={buttonClass}
                  disabled={clicked}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {userAnswer && (
            <div>
              <p
                className={
                  userAnswer ===
                  countriesData[selectedCountry].questions[currentQuestionIndex]
                    .correctAnswer
                    ? 'correct-answer-p' // Apply class for correct answer
                    : 'incorrect-answer-p'
                } // Apply class for incorrect answer
              >
                {userAnswer ===
                countriesData[selectedCountry].questions[currentQuestionIndex]
                  .correctAnswer
                  ? 'Correct!' // Text for correct answer
                  : 'Wrong!'}{' '}
              </p>
              <p className="answerExplanation">
                Explanation:{' '}
                {
                  countriesData[selectedCountry].questions[currentQuestionIndex]
                    .explanation
                }
              </p>
            </div>
          )}
        </div>
      )}
      {showResult && (
        <div className="finaleScore">
          <h2 className="finalScoresTitle">
            Your Score: {score} /{' '}
            {countriesData[selectedCountry].questions.length}
          </h2>
          <button onClick={handleRestart}>
            <i className="fa fa-refresh"></i> Play Again
          </button>
        </div>
      )}
    </div>
  );
}
export default App;
