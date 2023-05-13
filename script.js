// ---Declare variables to store the game state---
let gameBoard = [];  
let gameOver = false;  
let gameWin = false;  
let numRows = 9;
let numCols = 9;
let numBombs = 10;
let gameInProgress = false; 
let timerInterval;

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
    clickedSquare.classList.add("disable-click");
    clickedRow.classList.add("disable-click");
    playCircuit();
    setTimeout(showLossScreen, 4000);
    return;
  } else {
    clickedSquare.classList.add("revealed");
    clickedSquare.classList.add("disable-click");
    playPing();
    if (value === 0) {
      revealCells(row, col);
    }
  }
    checkWin();
}


// ---Define function to check if the player has won the game---

function checkWin() {
  let revealedCells = 0;
  const totalClearCells = numRows * numCols - numBombs;

  const tableRows = document.querySelectorAll("tr");
  for (let row = 0; row < numRows; row++) {
    const tableCells = tableRows[row].querySelectorAll('td');
    for (let col = 0; col < numCols; col++) {
      if (gameBoard[row][col] >= 0 && tableCells[col].classList.contains("revealed")) {
        revealedCells++;
      }
    }
  }

  if (revealedCells === totalClearCells) {
    gameOver = true;
    gameWin = true;
    revealAllBombs();
    setTimeout(showWinScreen, 3000);
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
              imgEl.src = "https://i.ibb.co/B24yxXr/cyberpunk.png";
              imgEl.alt = "Mine";
              tdEl.appendChild(imgEl);
          } else {
              tdEl.textContent = gameBoard[row][col];

              if (gameBoard[row][col] === 0) {
                tdEl.style.color = "#c4544d";
              } else if (gameBoard[row][col] === 1) {
                tdEl.style.color = "#fad44f";
              } else if (gameBoard[row][col] === 2) {
                  tdEl.style.color = "#1ad0e6";
              } else if (gameBoard[row][col] === 3) {
                  tdEl.style.color = "#0fb48e";
                } else if (gameBoard[row][col] === 4) {
                  tdEl.style.color = "#711c91";
              }
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


// -- Call the initBoard function to start the game --
boardStart();



const startBtn = document.querySelector(".btn");
startBtn.addEventListener("click", function() {
  if (!gameInProgress) {
    gameInProgress = true;
    resetBoard();
    renderBoard();
    updateTimer();
    startBtn.textContent = "Reset"
  } else {
    resetBoard();
  }
});


const timerText = document.getElementById("timer");
let time = 0;

function updateTimer() {
  startTime = Date.now();

  timerInterval = setInterval(function() {
    const currentTime = Date.now();
    const elapsedSeconds = Math.floor ((currentTime - startTime) / 1000);
  
    timerText.textContent = elapsedSeconds;
    if (elapsedSeconds === 180) {
      clearInterval(timerInterval);
      gameInProgress = false;
      gameOver = true;
      gameWin = false;
      setTimeout(showLossScreen, 1000);
    }
  }, 1000);
}

// --Function ro reset board --

function resetBoard() {
  gameBoard = [];
  gameOver = false;
  gameWin = false;
  time = 0;
  clearInterval(timerInterval);

  const boardEl = document.querySelector(".game-board");
  boardEl.innerHTML = '';

  boardStart();
  renderBoard();
  updateTimer();

  const winScreen = document.getElementById("winScreen");
  winScreen.style.display = "none";
  const lossScreen = document.getElementById("lossScreen");
  lossScreen.style.display = "none";
  const gameContent = document.getElementById("gameContent");
  gameContent.style.display = "block";
  const timer = document.getElementById("timer");
  timer.style.display = "block";
  startBtn.textContent = "Reset";
}

function playCircuit() {
  const circuitSound = document.getElementById("circuitSound");
  circuitSound.play();
}

function playPing() {
  const pingSound = document.getElementById("pingSound");
  pingSound.play();
}

function showWinScreen() {
  const gameContent = document.getElementById("gameContent");
  const winScreen = document.getElementById("winScreen");
  gameContent.style.display = "none";
  winScreen.style.display = "block";
  hideTimer();
}

function showLossScreen() {
  const gameContent = document.getElementById("gameContent");
  const lossScreen = document.getElementById("lossScreen");
  gameContent.style.display = "none";
  lossScreen.style.display = "block";
  hideTimer();
}

function hideTimer() {
  const timer = document.getElementById("timer");
  timer.style.display = "none";
}

// ---Define fuction to reveal empty cells around selected cell---
function revealCells(row, col) {
  for (let r = Math.max(0, row - 1); r <= Math.min(numRows - 1, row + 1); r++) {
    for (let c = Math.max(0, col - 1); c <= Math.min(numCols - 1, col + 1); c++) {
      const cell = gameBoard[r][c];
      const tableRows = document.querySelectorAll("tr");
      const clickedRow = tableRows[r];
      const clickedSquare = clickedRow.querySelectorAll("td")[c];

      if (!clickedSquare.classList.contains("revealed")) {
        clickedSquare.classList.add("revealed");
        clickedSquare.classList.add("disable-click");
        playPing();
        if (cell === 0) {
          revealCells(r, c);
        }
      }
    }
  }
}

function revealAllBombs() {
  const tableRows = document.querySelectorAll("tr");
  for (let row = 0; row < numRows; row++) {
    const tableCells = tableRows[row].querySelectorAll("td");
    for (let col = 0; col < numCols; col++) {
      if (gameBoard[row][col] === -1) {
        const cell = tableCells[col];
        cell.classList.add("revealed");
      }
    }
  }
}
