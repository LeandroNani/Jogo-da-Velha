const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  isCircleTurn = false;
  document.getElementById('game-status').innerText = `Vez do jogador X`;
  document.getElementById('p1p2').innerText = `Reiniciar`;
  for (const cell of cellElements) {
    document.querySelector('.board').style.display ="grid";
    document.querySelector('.status').style.display = "block";
    document.querySelector('#p1cpu').style.display = "none";
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message");
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Empate!";
  } else {
    winningMessageTextElement.innerText = isCircleTurn
      ? "O Venceu!"
      : "X Venceu!";
  }

  winningMessage.classList.add("show-winning-message");
};

const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;
  if(isCircleTurn == true){
  document.getElementById('game-status').innerText = `Vez do jogador O`;
  }
  else{
  document.getElementById('game-status').innerText = `Vez do jogador X`;
  }
  setBoardHoverClass();
};

const handleClick = (e) => {
  // Colocar a marca (X ou Círculo)
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  // Verificar por vitória
  const isWin = checkForWin(classToAdd);

  // Verificar por empate
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // Mudar símbolo
    swapTurns();
  }
};

const computerTurn = () => {
  setTimeout(() => {
      if (isCircleTurn == true) {
          let emptyCells = Array.from(cellElements).filter(cell => !cell.classList.contains("x") && !cell.classList.contains("circle"));
          if (emptyCells.length > 0) {
              let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
              placeMark(randomCell, 'circle');
              const isWin = checkForWin('circle');
              const isDraw = checkForDraw();
              if (isWin) {
                  endGame(false);
              } else if (isDraw) {
                  endGame(true);
              } else {
                  swapTurns();
              }
          }
      }
  }, 100);
};

function setBoardHoverClassComputer(){
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn == true) {
    computerTurn();
  } else {
    board.classList.add("x");
  }
}

function swapTurnsComputer(){
  isCircleTurn = !isCircleTurn;
  if(isCircleTurn == true){
  document.getElementById('game-status').innerText = `Vez do jogador O`;
  }
  else{
  document.getElementById('game-status').innerText = `Vez do jogador X`;
  }
  setBoardHoverClassComputer();
}

const handleClickComputer = (e) => {
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";
  
  // Colocar a marca (X ou Círculo)
  if(isCircleTurn == true){
    computerTurn();
  }
  else{
    placeMark(cell, classToAdd);
  }

  // Verificar por vitória
  const isWin = checkForWin(classToAdd);

  // Verificar por empate
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // Mudar símbolo
    swapTurnsComputer();
  }
};

function startGameComputer(){
  isCircleTurn = false;
  document.getElementById('game-status').innerText = `Vez do jogador X`;
  document.getElementById('p1cpu').innerText = `Reiniciar`;
  for (const cell of cellElements) {
    document.querySelector('.board').style.display ="grid";
    document.querySelector('.status').style.display = "block";
    document.querySelector('#p1p2').style.display = "none";
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClickComputer);
    cell.addEventListener("click", handleClickComputer, { once: true });
  }

  computerTurn();
  winningMessage.classList.remove("show-winning-message");
}
