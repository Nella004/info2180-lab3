document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('#board div');
    squares.forEach(square => square.classList.add('square'));
  });
  
let currentPlayer = 'X';

document.querySelectorAll('.square').forEach(square => {
    square.addEventListener('click', function() {
      if (!this.textContent) {
        this.textContent = currentPlayer;
        this.classList.add(currentPlayer);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    });
});

document.querySelectorAll('.square').forEach(square => {
    square.addEventListener('mouseover', function() {
      this.classList.add('hover');
    });
    square.addEventListener('mouseout', function() {
      this.classList.remove('hover');
    });
  });

  function checkWinner() {
    const squares = Array.from(document.querySelectorAll('.square'));
    const patterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
  
    for (let pattern of patterns) {
      const [a, b, c] = pattern;
      if (squares[a].textContent && 
          squares[a].textContent === squares[b].textContent && 
          squares[a].textContent === squares[c].textContent) {
        document.getElementById('status').textContent = 
          `Congratulations! ${squares[a].textContent} is the Winner!`;
        document.getElementById('status').classList.add('you-won');
      }
    }
  }
  
  document.querySelectorAll('.square').forEach(square => {
    square.addEventListener('click', checkWinner);
  });

  document.querySelector('.btn').addEventListener('click', () => {
    document.querySelectorAll('.square').forEach(square => {
      square.textContent = '';
      square.classList.remove('X', 'O');
    });
    document.getElementById('status').textContent = 'Move your mouse over a square and click to play an X or an O.';
    document.getElementById('status').classList.remove('you-won');
    currentPlayer = 'X';
  });
  