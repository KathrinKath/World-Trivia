# 🌎 World Trivia Game 🌏

Welcome to the World Trivia Game, where you can test your knowledge of different countries around the globe. This fun and interactive trivia game challenges you with at least 10 questions per country and includes timer, sound effects, and confetti for correct answers!

## A Little Bit About The Game...

👉 The goal of the World Trivia Game is to test your knowledge of various countries by answering a series of multiple-choice questions.  
👉 Each correct answer increases your scores by 1, and the game provides feedback on whether the answer is correct or not, along with a short explanation about the correct answer of each one of the questions.  
👉 The explanation will appear for 10 seconds, meanwhile the timer will pause itself and will restart again when you move on to the next question.

👉 For each country, you will face at least 10 questions, and you need to answer within the time limit of 30 seconds for each questions.  
👉 If the time runs out, the game will be ended and you will have to restart the game.  
👉 Try to keep up and answer the questiond within the time limits, you can't lose the game as long as you keep trying and click one of the options 😉.

👉 At the end of the game, your final score will be displayed, and you'll have the option to restart the game and select a different country.  
👉 If you answered correctly on more than 80% of the questions, you will hear a sound of a winner, but if you answered correctly on less than 50% of the questions, you will hear a sound effect of a loser.  
☝️ Remember that there is always place for improvement ⭐ 😃

## Features

- ✈️ Country-specific trivia: Choose a country and answer trivia questions tailored to that country.
- ❓ Multiple-choice questions: Each question comes with 4 possible answers.
- ⏳ Real-time timer: You have 30 seconds to answer each question.
- 📑 Score tracking: Your score is updated in real time after each question.
- 🔉 Sound effects: Audio cues for correct, incorrect answers, and game completion.
- 🎊 Confetti effects: Correct answers trigger confetti to celebrate your success.
- 📊 Final score display: The game shows your score out of the total questions.
- 🔁 Play again feature: Restart the game anytime by clicking the "Play Again" button.

## 🔨 Setup

💡 Follow these steps to set up and run the World Trivia Game locally on your machine:

- Clone the repository:
  git clone <repository-url>

- Install dependencies:
  npm install

- Start the development server:
  npm run dev

- Play the game:
  Open your browser and go to http://localhost:3000.

# External Packages

💡 The game will function properly only with the installation of the following external packages:

- **React:** Core library for building user interfaces.
  - npm install react react-dom
- **Font Awesome:** To use icons from the Font Awesome library.
  - npm install font-awesome
- **Canvas Confetti:** For the confetti effect after correct answers.
  - npm install canvas-confetti

## 🎮 How to Play

![Open Screen](./world-trivia-project/src/images/Trivia-OpenScreen.png)

### Select a country:

- Use the dropdown menu to choose a country.
  ![Open Screen](./world-trivia-project/src/images/Trivia-SelectingCountry.png)

### Answer questions:

- For each trivia question, click on one of the four answer options.
  ![Open Screen](./world-trivia-project/src/images/Trivia-MultipleChoiceQuestions.png)

### Check your result:

- After each question, the game will show you if you were right or wrong and display a brief explanation.

### Correct Answer

![Open Screen](./world-trivia-project/src/images/Trivia-CorrectAnswer.png)

### Incorrect Answer

![Open Screen](./world-trivia-project/src/images/Trivia-WrongAnswer.png)

### Keep track of time:

- You have 30 seconds to answer each question, so make sure to choose your answer before time runs out.

### Celebrate success:

- If you answer correctly, a confetti effect will appear on your screen to celebrate!
  ![Open Screen](./world-trivia-project/src/images/Trivia-Confetti.png)

### End of game:

- After all the questions, the game will display your score. You can either play again or select a different country to test your knowledge further.
  ![Open Screen](./world-trivia-project/src/images/Trivia-EndGame.png)

## 💻 Technical Details

- **React:** The app is built using the React framework.
- **State Management:** useState is used to manage the country selection, current question, score, and game state.
- **Timer:** A custom useTimer hook tracks the time left to answer each question, and the game moves forward automatically when time runs out.
- **Sound Effects:** Audio cues for correct/incorrect answers and game completion are handled using mp3 files insode the "sounds" folder.
- **Confetti Effect:** Correct answers trigger confetti, which is implemented using the canvas-confetti library.
- **CSS:** Styling is applied through App.css and custom classes for different game elements like questions, options, and result displays.
- **Font Awesome:** Icons from Font Awesome are used for visual elements such as the "Play Again" button.

## 🎓 Creators And Contributing

The Game was programmed and designed by **Gerardo Michele Mussuto**, **Fardin Azimi** and **Kathrin Peled**.

- [Kathrin Peled](https://draculady.de/)
- [Gerardo Michele Mussuto](https://onid89.github.io/Web-Dev-Portfolio/)
- [Fardin Azimi](https://fardinazimi.github.io/FardinsPortfolio/)
