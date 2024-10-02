let o_turn = true;

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
  }
};

const AddComputerInput = () => {
  const availableBoxes = Array.from(boxes).filter(
    (box, index) => playerInput[index] === ""
  );
  if (availableBoxes.length > 0) {
    const randomBox =
      availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
    const index = Array.from(boxes).indexOf(randomBox);

    randomBox.innerHTML = "X";
    playerInput[index] = "X";

    const winner = CheckForWinner();
    if (winner) {
      setTimeout(() => {
        alert(`${winner} wins!`);
        ResetGame();
      }, 500);
    }
    o_turn = true;
  }
};

const ResetGame = () => {
  playerInput.fill("");
  boxes.forEach((box) => (box.innerHTML = ""));
  o_turn = true;
};

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (box.innerHTML === "" && o_turn) {
      box.innerHTML = "O";
      AddPlayerInput(box, index);
      o_turn = false;
      setTimeout(() => {
        if (!CheckForWinner()) {
          AddComputerInput();
        }
      }, 500);
    }
  });
});
