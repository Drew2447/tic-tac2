import "./index.css";
import { useState } from "react";

const initBoard = ["", "", "", "", "", "", "", "", ""];

function Board() {
  const [board, setBoard] = useState(initBoard);
  const [xTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWin = (currentBoard) => {
    let winner = null;
    let winning = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ];
    for (let place = 0; place < winning.length; place++) {
      let [a, b, c] = winning[place];
      if (
        currentBoard[a] !== "" &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        winner = currentBoard[a];
        break;
      }
    }
    return winner;
  };
  const handleClick = (index) => {
    if (board[index] !== "" || winner) {
      return;
    }
  
    let boardClone = [...board];
    boardClone[index] = xTurn ? "X" : "0"; 

    setBoard(boardClone);
    if(checkWin(boardClone)){
      let winner = xTurn ? "X":"O"
      setWinner(winner)
    } else{
      setXTurn(!xTurn);
    }
  };
  const renderBoard = () => {
    return board.map((piece, index) => {
      return (
        <div key={index} onClick={() => handleClick(index)} className="box">
          {piece}
        </div>
      );
    });
  };

  const reset = () => {
    setBoard(initBoard);
    setWinner(null);
    setXTurn(!xTurn);
  };
  return (
    <div className="App">

      <h1>Tic Tac Toe</h1>
      {winner && <h1>{winner} Party</h1>}
      <button onClick={reset}>reset</button>
      <div className="game-board">{renderBoard()}</div>
    </div>
  );
}

export default Board;