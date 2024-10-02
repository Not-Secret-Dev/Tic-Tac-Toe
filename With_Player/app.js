let currentPlayer = "O"; // Start with Player O

const playerInput = Array(9).fill("");
const boxes = document.querySelectorAll(".box");
const patterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

const CheckForWinner = () => {
  for (const pattern of patterns) {
    const [a, b, c] = pattern;
    if (
      playerInput[a] &&
      playerInput[a] === playerInput[b] &&
      playerInput[a] === playerInput[c]
    ) {
      return playerInput[a];
    }
  }
  return null;
};

const AddPlayerInput = (box, index) => {
  playerInput[index] = box.innerHTML;
  const winner = CheckForWinner();
  if (winner) {
    setTimeout(() => {
      alert(`${winner} wins!`);
      ResetGame();
    }, 500);
  } else if (!playerInput.includes("")) {
    setTimeout(() => {
      alert("It's a draw!");
      ResetGame();
    }, 500);
  } else {
    // Switch players
    currentPlayer = currentPlayer === "O" ? "X" : "O";
  }
};

const ResetGame = () => {
  playerInput.fill("");
  boxes.forEach((box) => (box.innerHTML = ""));
  currentPlayer = "O"; // Reset to Player O's turn
};

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (box.innerHTML === "") {
      box.innerHTML = currentPlayer; // Place the current player's symbol
      AddPlayerInput(box, index);
    }
  });
});
