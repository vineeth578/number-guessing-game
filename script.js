document.addEventListener("DOMContentLoaded", () => {
    let randomNumber, range, attempts, highScore;
    const guessInput = document.getElementById("guessInput");
    const submitGuess = document.getElementById("submitGuess");
    const restartGame = document.getElementById("restartGame");
    const feedbackMessage = document.getElementById("feedbackMessage");
    const attemptsMessage = document.getElementById("attemptsMessage");
    const hintMessage = document.getElementById("hintMessage");
    const randomNumberDisplay = document.getElementById("randomNumberDisplay");
    const rangeInfo = document.getElementById("rangeInfo");
    const leaderboard = document.getElementById("highScoreMessage");
    const gameSection = document.getElementById("gameSection");
    const difficultyButtons = document.querySelectorAll(".difficulty-btn");
  
    // Load high score from localStorage
    highScore = localStorage.getItem("highScore") || null;
  
    // Display high score
    function updateLeaderboard() {
      if (highScore) {
        leaderboard.textContent = `Best Score: ${highScore} attempts`;
      } else {
        leaderboard.textContent = "No high scores yet!";
      }
    }
  
    updateLeaderboard();
  
    // Start game with selected difficulty
    difficultyButtons.forEach((button) => {
      button.addEventListener("click", () => {
        range = Number(button.dataset.range);
        randomNumber = Math.floor(Math.random() * range) + 1;
        attempts = 0;
        rangeInfo.textContent = `Guess the number between 1 and ${range}`;
        gameSection.style.display = "block";
        console.log(`Random Number: ${randomNumber}`); // For debugging
      });
    });
  
    // Trigger fireworks
    function triggerFireworks() {
      const duration = 2 * 1000; // Fireworks duration
      const end = Date.now() + duration;
  
      const colors = ["#bb0000", "#ffffff", "#008000", "#ff8c00"];
  
      (function frame() {
        canvasConfetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        canvasConfetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });
  
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  
    // Check guess
    function checkGuess() {
      const userGuess = Number(guessInput.value);
      attempts++;
  
      randomNumberDisplay.textContent = `Random Number: ${randomNumber}`;
      randomNumberDisplay.style.display = "block";
  
      if (userGuess === randomNumber) {
        feedbackMessage.textContent = `🎉 Congratulations! You guessed it right in ${attempts} attempts.`;
        feedbackMessage.style.color = "#388e3c";
  
        // Trigger fireworks
        triggerFireworks();
  
        // Update high score if needed
        if (!highScore || attempts < highScore) {
          highScore = attempts;
          localStorage.setItem("highScore", highScore);
          updateLeaderboard();
        }
  
        submitGuess.disabled = true;
      } else if (userGuess < randomNumber) {
        feedbackMessage.textContent = "Too low! Try again.";
        hintMessage.textContent =
          randomNumber - userGuess <= 10
            ? "Hint: You're very close!"
            : "Hint: Still far away.";
      } else {
        feedbackMessage.textContent = "Too high! Try again.";
        hintMessage.textContent =
          userGuess - randomNumber <= 10
            ? "Hint: You're very close!"
            : "Hint: Still far away.";
      }
  
      attemptsMessage.textContent = `Attempts: ${attempts}`;
      guessInput.value = "";
      guessInput.focus();
    }
  
    // Restart game
    function restart() {
      location.reload();
    }
  
    // Event listeners
    submitGuess.addEventListener("click", checkGuess);
    restartGame.addEventListener("click", restart);
  });
  