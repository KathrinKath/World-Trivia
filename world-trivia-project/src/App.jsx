import { useState, useEffect } from "react";
import confetti from "canvas-confetti"; // Import the confetti library
import { countriesData } from "./Data/countriesData";
import "./App.css";
import "font-awesome/css/font-awesome.min.css"; // Import Font Awesome
import Navbar from "../src/Components/navbar"; // Import the Navbar component
import useTimer from "./Components/useTimer"; // Import the Timer (Test)
//Import all sounds
import errorSound from "/public/error.mp3";
import gameWinSound from "/public/game-win.mp3";
import keepPlayingSound from "/public/keep-playing.mp3";
import loseSound from "/public/lose-sound.mp3";
import winSound from "/public/win.mp3";

function App() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [clicked, setClicked] = useState(false);
  const countries = Object.keys(countriesData);

  // ! Gerardo
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
    setUserAnswer("");
    setClicked(false);
    resetTimer(); // Reset timer when a new country is selected
  }
  // ~ Kathrin
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
      setUserAnswer("");
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
    }, 10000); // 10 seconds delay so the user can see the correct answer explanation.
  }
  // ? Fardin
  // Confetti effect
  function triggerConfetti() {
    const canvas = document.createElement("canvas");
    const container = document.getElementById("confetti-container");
    canvas.width = 600;
    canvas.height = 600;
    container.appendChild(canvas);
    const confettiInstance = confetti.create(canvas, {
      resize: true,
      useWorker: true
    });
    // Confetti colors
    confettiInstance({
      spread: 160,
      startVelocity: 30,
      ticks: 60,
      gravity: 0.3,
      colors: [
        "#ff0",
        "#0f0",
        "#00f",
        "#f00",
        "#ff00ff",
        "#00ffff",
        "#ff0",
        "#0f0",
        "#00f",
        "#f00",
        "#ff00ff",
        "#00ffff"
      ]
    });
    // Timer for confetti
    setTimeout(() => {
      container.removeChild(canvas);
    }, 2000); // Remove canvas after 2 seconds
  }

  // ! Gerardo
  // Restart timer for every new question
  function handleRestart() {
    setSelectedCountry("");
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
        playSound(winSound); // when user answers correct
      } else {
        playSound(errorSound); // When user answers wrong
      }
    }
  }, [userAnswer, selectedCountry, currentQuestionIndex]);

  // Play sound effect when game ends
  useEffect(() => {
    if (showResult) {
      const totalQuestions = countriesData[selectedCountry].questions.length;
      const percentageScore = (score / totalQuestions) * 100; // Calculate percentage

      if (percentageScore > 80) {
        playSound(gameWinSound); // Play win sound for > 80% of the points
      } else if (percentageScore < 50) {
        playSound(loseSound); // Play sound with less than 50% of the points
      } else playSound(keepPlayingSound); // Play lose sound for > 50% and < 80% of the points
    }
  }, [showResult, score, selectedCountry]);

  // ~ Kathrin and Gerardo
  // Function to handle skipping the question
  function handleSkipQuestion() {
    setClicked(false); // Reset the clicked state
    setUserAnswer(""); // Clear the user's answer

    // Next questions function
    if (
      currentQuestionIndex <
      countriesData[selectedCountry].questions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
      resetTimer(); // Reset the timer for the next question
    } else {
      setShowResult(true); // End the game and show the final score
    }
  }

  // ~ Kathrin
  return (
    <div className="container">
      {/* Navbar component */}
      <Navbar />
      {/* Selecting a country */}
      <label className="selectCountryLabel">Select a Country: </label>
      <select
        onChange={handleCountryChange}
        value={selectedCountry}
        className="selectCountry"
      >
        <option value="" className="selectCountryOptions">
          ***Choose a Country***
        </option>
        {/* loops through each country in the countries array */}
        {countries.map(function (country) {
          {
            /* A unique key is given for each option*/
          }
          return (
            /*The value of each <option> is set to the country name */
            <option key={country} value={country}>
              {" "}
              {/* If the country name contains underscores, replace with space */}
              {country.replace(/_/g, " ")}
            </option>
          );
        })}
      </select>
      {/* Container for confetti */}
      <div id="confetti-container" style={{ position: "relative" }}></div>{" "}
      {/* Condition for displaying the trivia main game, if a country is selected and results of end game are not shown */}
      {selectedCountry && !showResult && (
        <div>
          {/* Displaying name of chosen countries with gaps instead of underline*/}
          <h1 className="chosenCountry">
            {selectedCountry.replace(/_/g, " ")} Trivia
          </h1>
          {/* Display how much time has left for each question */}
          <h3 className="timer">Time Left: {timeLeft} seconds</h3>
          {/* Display the scores the user has gained during the current game */}
          <h3 className="scoreTitle">Score: {score}</h3>
          {/* Display how many questions the user has to answer in total and how many of them are answered */}
          <h3 className="questionsBankNumber">
            Question {currentQuestionIndex + 1} of{" "}
            {countriesData[selectedCountry].questions.length}
          </h3>
          {/* Display the current question the user has to answer */}
          <h2 className="fullQuestion">
            {/*Getting the question from the data.js file according to their order */}
            Question {currentQuestionIndex + 1}:{" "}
            {
              countriesData[selectedCountry].questions[currentQuestionIndex]
                .question
            }
          </h2>
          {/* The multiple-choice options for the current question  */}
          <div className="options-grid">
            {countriesData[selectedCountry].questions[
              currentQuestionIndex
            ].options.map(function (option) {
              // The variable isCorrect is set to true if the option being rendered matches the correct answer for the current question
              const isCorrect =
                option ===
                countriesData[selectedCountry].questions[currentQuestionIndex]
                  .correctAnswer;
              // The buttonClass is determined based on whether the user has clicked on an answer (clicked) and whether the current userAnswer is correct or incorrect
              const buttonClass =
                clicked && userAnswer
                  ? isCorrect
                    ? "correct-answer"
                    : "incorrect-answer"
                  : // If the user hasn’t clicked yet, the button class will be empty
                    "";
              return (
                // Each option in the answers grid returns a button. This button represents one of the possible answers for the current trivia question. A new <button> is created for each option
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

          {/* If user answers the question, he will see the next elements in the div */}
          {userAnswer && (
            <div>
              {/* Create new classes for styling (app.css) */}
              <p
                className={
                  userAnswer ===
                  countriesData[selectedCountry].questions[currentQuestionIndex]
                    .correctAnswer
                    ? "correct-answer-p" // Apply class for correct answer
                    : "incorrect-answer-p"
                } // Apply class for incorrect answer
              >
                {userAnswer ===
                countriesData[selectedCountry].questions[currentQuestionIndex]
                  .correctAnswer
                  ? "Correct!" // Text for correct answer
                  : "Wrong!"}{" "}
              </p>
              {/* Shows to the user the explanation of the answer of each question, taken from data file */}
              <p className="answerExplanation">
                Explanation:{" "}
                {
                  countriesData[selectedCountry].questions[currentQuestionIndex]
                    .explanation
                }
              </p>
            </div>
          )}
          {/* Add the Skip Question button */}
          <button onClick={handleSkipQuestion} className="skipQuestionButton">
            Skip Question <i className="fa-solid fa-right-long"></i>
          </button>
        </div>
      )}
      {/* End of the game. The user can see the results of his game, and has the option to start a new game */}
      {showResult && (
        <div className="finaleScore">
          <h2 className="finalScoresTitle">
            Your Score: {score} /{" "}
            {countriesData[selectedCountry].questions.length}
          </h2>
          <button onClick={handleRestart} className="playAgainButton">
            <i className="fa fa-refresh"></i> Play Again
          </button>
        </div>
      )}
    </div>
  );
}
export default App;
