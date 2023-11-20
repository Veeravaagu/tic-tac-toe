// Gameboard factory
const Gameboard = () => {
    let board = ['', '', '', '', '', '', '', '', ''];
    let player1Symbol = 'X';
    let player2Symbol = 'O';
    let currentPlayer = 1;
  
    const getCurrentPlayerSymbol = () => (currentPlayer === 1 ? player1Symbol : player2Symbol);
  
    const getBoard = () => board.slice();
  
    const markSquare = (index) => {
      if (board[index] === '' && !isGameOver()) {
        board[index] = getCurrentPlayerSymbol();
        currentPlayer = 3 - currentPlayer; // Switch between 1 and 2
        updateGameStatus();
        renderBoard();
      }
    };
  
    const isGameOver = () => {
      for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
          return true; // Win
        }
      }
  
      return !board.includes(''); // Tie
    };
  
    const resetBoard = () => {
      board = ['', '', '', '', '', '', '', '', ''];
      currentPlayer = 1;
      updateGameStatus();
      renderBoard();
    };
  
    const updateGameStatus = () => {
      const currentPlayerElement = document.getElementById('current-player');
      currentPlayerElement.textContent = `Current Player: ${getCurrentPlayerSymbol()}`;
  
      if (isGameOver()) {
        const gameResultElement = document.getElementById('game-result');
        const winner = findWinner();
  
        if (winner) {
          gameResultElement.textContent = `Player ${winner} wins!`;
        } else {
          gameResultElement.textContent = "It's a tie!";
        }
      }
    };
  
    const findWinner = () => {
      for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
          return board[a];
        }
      }
      return null;
    };
  
    const renderBoard = () => {
      const gameBoardElement = document.getElementById('game-board');
      gameBoardElement.innerHTML = '';
  
      for (let i = 0; i < board.length; i++) {
        const square = document.createElement('div');
        square.classList.add('square-box');
        square.textContent = board[i];
        square.addEventListener('click', () => markSquare(i));
        gameBoardElement.appendChild(square);
      }
    };
  
    return {
      getCurrentPlayerSymbol,
      getBoard,
      markSquare,
      isGameOver,
      resetBoard,
      renderBoard,
    };
  };
  

  const myGameboard = Gameboard();
  myGameboard.renderBoard(); // Initialize the game board
  
  // Event listener for the reset button
  const resetButton = document.getElementById('reset-button');
  resetButton.addEventListener('click', () => myGameboard.resetBoard());
  
  // Winning patterns for rows, columns, and diagonals
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];
  