document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('#board div');
  const statusDiv = document.getElementById('status');
  const newGameButton = document.querySelector('.btn');

  let currentPlayer = 'X';
  let gameActive = true;

  // Winning combinations
  const winningCombinations = [
    [0, 1, 2],  // Top row
    [3, 4, 5],  // Middle row
    [6, 7, 8],  // Bottom row
    [0, 3, 6],  // Left column
    [1, 4, 7],  // Middle column
    [2, 5, 8],  // Right column
    [0, 4, 8],  // Diagonal from top-left to bottom-right
    [2, 4, 6]   // Diagonal from top-right to bottom-left
  ];

  // Initialize the board by adding the 'square' class to each div
  squares.forEach(square => square.classList.add('square'));

  // Handle click events for each square
  squares.forEach((square, index) => {
    square.addEventListener('click', () => {
      if (gameActive && square.textContent === '') {
        square.textContent = currentPlayer;
        square.classList.add(currentPlayer);

        if (checkWinner(currentPlayer)) {
          statusDiv.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
          statusDiv.classList.add('you-won');
          gameActive = false;  // Stop the game
        } else if (isBoardFull()) {
          statusDiv.textContent = "It's a draw!";
          gameActive = false;  // Stop the game for a draw
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';  // Switch player
        }
      }
    });

    // Add hover effect to each square
    square.addEventListener('mouseover', () => {
      if (gameActive && square.textContent === '') {
        square.classList.add('hover');
      }
    });

    square.addEventListener('mouseout', () => {
      square.classList.remove('hover');
    });
  });

  // Check if the current player has won
  function checkWinner(player) {
    return winningCombinations.some(combination =>
      combination.every(index => squares[index].textContent === player)
    );
  }

  // Check if the board is full (for a draw)
  function isBoardFull() {
    return Array.from(squares).every(square => square.textContent !== '');
  }

  // Reset the game when the "New Game" button is clicked
  newGameButton.addEventListener('click', () => {
    squares.forEach(square => {
      square.textContent = '';
      square.classList.remove('X', 'O');
    });

    statusDiv.textContent = 'Move your mouse over a square and click to play an X or an O.';
    statusDiv.classList.remove('you-won');

    currentPlayer = 'X';
    gameActive = true;
  });
});