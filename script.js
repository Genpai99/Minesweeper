// ---Declare variables to store the game state---
let gameBoard = [];  // array to store the game board
let gameOver = false;  // true when the game is over
let gameWin = false;  // true when the player wins the game
let numRows = 9;
let numCols = 9;
let numBombs = 10;

// ---Define function to start the game board---
function boardStart() {
  gameBoard = Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => 0)
  );

  let bombsPlaced = 0;
  while (bombsPlaced < numBombs) {
    const row = Math.floor(Math.random() * numRows);
    const col = Math.floor(Math.random() * numCols);
    if (gameBoard[row][col] !== -1) {
        gameBoard[row][col] = -1;
        bombsPlaced++;
    }
  }

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
        if (gameBoard[row][col] !== -1) {
            let count = 0;
            for (let r = Math.max(0, row - 1); r <= Math.min(numRows - 1, row +1); r++) {
                for (let c = Math.max(0, col - 1); c <= Math.min(numCols - 1, col + 1); c++) {
                    if (gameBoard[r][c] === -1) {
                        count++
                    }
                }
            }
            gameBoard[row][col] = count;
        }
    }
  }

  // ---Add event listeners to each cell---
  const tableCells = document.querySelectorAll("td");
  tableCells.forEach((cell, index) => {
    const row = Math.floor(index / numCols);
    const col = index % numCols;
    cell.addEventListener("click", () => handleClick(row, col));
  });
}


// ---Define function to handle a click on a box---
function handleClick(row, col) {
  const tableRows = document.querySelectorAll("tr"); 
  const clickedRow = tableRows[row];
  const clickedSquare = clickedRow.querySelectorAll('td')[col];
  const value = gameBoard[row][col];
  
  if (clickedSquare.classList.contains("revealed")) {
    return;
  } else if (value === -1) {
    clickedSquare.classList.add("revealed", "mine");
    gameOver = true;
    gameWin = false;
    alert("game over");
    return;
  } else {
    clickedSquare.classList.add("revealed");
    if (value === 0) {
      for (let r = Math.max(0, row - 1); r <= Math.min(numRows - 1, row + 1); r++) {
        for (let c = Math.max(0, col - 1); c <= Math.min(numCols - 1, col + 1); c++) {
          handleClick(r, c);
    }
   }
 }
}
}


// ---Define function to check if the player has won the game---
function checkWin() {
  let revealedCells = 0;
  const totalClearCells = numRows * numCols - numBombs;

  for (let row = 0; row <  numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (gameBoard[row][col] !== -1 && gameBoard[row][col].classList.contains("revealed")) {
        revealedCells++;
      }
    }
  }

  if (revealedCell === totalClearCells) {
    gameOver = true;
    gameWin = true;
    alert("You Win");
  }
}


// Define function to render the board on the screen
function renderBoard() {
  const boardEl = document.querySelector('.game-board');

  boardEl.innerHTML = '';

  const tableEl = document.createElement('table');
  for (let row = 0; row < numRows; row++) {
      const trEl = document.createElement('tr');

      for (let col = 0; col < numCols; col++) {
          const tdEl = document.createElement('td');

          if (gameBoard[row][col] === -1) {
              const imgEl = document.createElement("img");
              imgEl.src = "/Users/darious/Downloads/cyberpunk.png";
              imgEl.alt = "Mine";
              tdEl.appendChild(imgEl);
          } else {
              tdEl.textContent = gameBoard[row][col];
          }

          tdEl.addEventListener('click', function() {
            handleClick(row, col);
          });

          trEl.appendChild(tdEl);
      }

      tableEl.appendChild(trEl);
  }

  boardEl.appendChild(tableEl);
}


// Call the initBoard function to start the game
boardStart();





const startBtn = document.querySelector(".btn");
startBtn.addEventListener("click", function() {
    boardStart();
    renderBoard();
});



