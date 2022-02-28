import { React, useState } from "react";
import Square from "./square";
import Button from "react-bootstrap/Button";
const human = "X";
const ai = "O";
export function Board() {
  const EmptyBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const [board, setBoard] = useState(EmptyBoard);
  const [player, setPlayer] = useState(human);
  let status;
  const handleclick = (row, col) => {
    if (board[row][col] || winner) return;
    board[row][col] = human;
    setBoard(board);
    setPlayer(ai);
    setTimeout(() => {
      bestMove();
    }, 300);
  };
  const bestMove = () => {
    let move;
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++)
        if (board[i][j] === "") {
          board[i][j] = ai;

          let score = minmax(board, 0, true);
          board[i][j] = "";
          if (score < bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
    }
    board[move.i][move.j] = ai;
    setBoard(board);
    setPlayer(human);
  };
  const winner = calculateWinner(board);
  if (winner === "tie") status = "Tie!";
  else if (winner) status = `The winner is ${winner}`;
  else status = player === human ? "Your turn" : "The opponent's turn";
  const RenderSquare = (row, col) => {
    return (
      <Square
        value={board[row][col]}
        turn={player}
        onClick={() => handleclick(row, col)}
      />
    );
  };
  const handleRestart = () => {
    setBoard(EmptyBoard);
    setPlayer("X");
  };
  return (
    <div className="text-center mt-5">
      <div className="border-bottom fs-3 mx-auto my-3 w-25">{status}</div>
      <div>
        {RenderSquare(0, 0)}
        {RenderSquare(0, 1)}
        {RenderSquare(0, 2)}
      </div>
      <div>
        {RenderSquare(1, 0)}
        {RenderSquare(1, 1)}
        {RenderSquare(1, 2)}
      </div>
      <div>
        {RenderSquare(2, 0)}
        {RenderSquare(2, 1)}
        {RenderSquare(2, 2)}
      </div>
      <Button variant="warning" className="mt-3" onClick={handleRestart}>
        Reset
      </Button>
    </div>
  );
}
function calculateWinner(board) {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }
  let isEmpty = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        isEmpty = false;
        break;
      }
    }
  }

  if (winner === null && isEmpty) winner = "tie";
  return winner;
}
function equals3(a, b, c) {
  return a === b && b === c && a !== "";
}
let scores = {
  X: 1,
  O: -1,
  tie: 0,
};
function minmax(board, depth, isMaximizing) {
  let result = calculateWinner(board);
  if (result !== null) {
    return scores[result];
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++)
        if (board[i][j] === "") {
          board[i][j] = human;
          let score = minmax(board, depth + 1, false);
          board[i][j] = "";
          bestScore = Math.max(score, bestScore);
        }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++)
        if (board[i][j] === "") {
          board[i][j] = ai;
          let score = minmax(board, depth + 1, true);
          board[i][j] = "";
          bestScore = Math.min(score, bestScore);
        }
    }
    return bestScore;
  }
}
