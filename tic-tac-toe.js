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
  