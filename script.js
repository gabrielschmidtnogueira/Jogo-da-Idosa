const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const mensagemVitoria = document.querySelector("[data-mensagem-vitoria]");
const textoVitoria = document.querySelector("[data-mensagem-vitoria-texto]");
const botaoVitoria = document.querySelector("[data-botao-vitoria]");

let isCircleTurn;

const combinacoes = [
  // horizontais
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // verticais
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonais
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  isCircleTurn = false;

  for (const cell of cellElements) {
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
    cell.classList.remove("x");
    cell.classList.remove("o");
  }
  isCircleTurn = false;

  setBoardHover();

  mensagemVitoria.classList.remove("show-mensagem-de-vitoria");
};

const endGame = (empate) => {
  console.log("aaa");
  if (empate === true) {
    textoVitoria.innerText = "Empatou!";
  } else {
    console.log("perdeu");
    textoVitoria.innerText = isCircleTurn ? "O Venceu!" : "X Venceu!";
  }
  mensagemVitoria.classList.add("show-mensagem-de-vitoria");
};

const verVitoria = (jogadorAtual) => {
  return combinacoes.some((combinacao) => {
    return combinacao.every((index) => {
      return cellElements[index].classList.contains(jogadorAtual);
    });
  });
};

const verEmpate = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("o");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHover = () => {
  board.classList.remove("o");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("o");
  } else {
    board.classList.add("x");
  }
};

const trocarTurnos = () => {
  isCircleTurn = !isCircleTurn;
  setBoardHover();
};

const handleClick = (e) => {
  // colocar x ou o
  const cell = e.target;
  const classToAdd = isCircleTurn ? "o" : "x";
  placeMark(cell, classToAdd);

  // verificar vitoria
  const venceu = verVitoria(classToAdd);
  const empatou = verEmpate();
  if (empatou) {
    endGame(true);
  } else if (venceu) {
    endGame(false);
  } else {
    trocarTurnos();
  }
};

startGame();
botaoVitoria.addEventListener("click", startGame);
