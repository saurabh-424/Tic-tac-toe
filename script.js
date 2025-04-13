document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.box');
  const infoDisplay = document.querySelector('.info');
  const playAgainButton = document.getElementById('play-again');
  const resetScoresButton = document.getElementById('reset-scores');
  const imgBoxImages = document.querySelectorAll('.imgbox img');
  const xScoreDisplay = document.getElementById('x-score');
  const oScoreDisplay = document.getElementById('o-score');

  let currentPlayer = 'X';
  let gameActive = true;
  let xScore = 0;
  let oScore = 0;

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  function handleClick(e) {
    const box = e.target;
    const index = parseInt(box.getAttribute('data-index'));

    if (box.textContent !== '' || !gameActive) return;

    box.textContent = currentPlayer;
    if (checkWin()) {
      infoDisplay.textContent = `${currentPlayer} wins!`;
      gameActive = false;
      updateScore();
      highlightWinningBoxes();
      showCelebration();
    } else if (isDraw()) {
      infoDisplay.textContent = `It's a draw!`;
      gameActive = false;
      showCelebration();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      infoDisplay.textContent = `Turn for ${currentPlayer}`;
    }
  }

  function checkWin() {
    return winningCombinations.some(combination => {
      const [a, b, c] = combination;
      if (
        boxes[a].textContent === currentPlayer &&
        boxes[b].textContent === currentPlayer &&
        boxes[c].textContent === currentPlayer
      ) {
        boxes[a].classList.add('winning');
        boxes[b].classList.add('winning');
        boxes[c].classList.add('winning');
        return true;
      }
      return false;
    });
  }

  function isDraw() {
    return [...boxes].every(box => box.textContent !== '');
  }

  function updateScore() {
    if (currentPlayer === 'X') {
      xScore++;
      xScoreDisplay.textContent = xScore;
    } else {
      oScore++;
      oScoreDisplay.textContent = oScore;
    }
  }

  function highlightWinningBoxes() {
    // Already handled in checkWin by adding 'winning' class
  }

  function showCelebration() {
    imgBoxImages.forEach(img => {
      img.style.width = '100px';
    });
  }

  function resetBoard() {
    boxes.forEach(box => {
      box.textContent = '';
      box.classList.remove('winning');
    });
    currentPlayer = 'X';
    gameActive = true;
    infoDisplay.textContent = `Turn for ${currentPlayer}`;
    imgBoxImages.forEach(img => {
      img.style.width = '0';
    });
  }

  function resetScores() {
    xScore = 0;
    oScore = 0;
    xScoreDisplay.textContent = xScore;
    oScoreDisplay.textContent = oScore;
    resetBoard();
  }

  boxes.forEach(box => box.addEventListener('click', handleClick));
  playAgainButton.addEventListener('click', resetBoard);
  resetScoresButton.addEventListener('click', resetScores);
});

