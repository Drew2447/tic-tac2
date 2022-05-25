import "./index.css";
import { useState } from "react";

const initBoard = ["", "", "", "", "", "", "", "", ""];

function Board() {
  const [board, setBoard] = useState(initBoard);
  const [aTurn, setATurn] = useState(true);
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
    boardClone[index] = aTurn ? "T" : "A"; 

    setBoard(boardClone);
    if(checkWin(boardClone)){
      let winner = aTurn ? "T":"A"
      setWinner(winner)
    } else{
      setATurn(!aTurn);
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
    setATurn(!aTurn);
  };
  return (
    <div className="App">

      <h1>Tic Tac Toe</h1>
      {winner && <h1>{winner} Party</h1>}
      <div className="game-board">{renderBoard()}</div>
      <h3><button onClick={reset}>reset</button></h3>
      
    </div>
    
  );
 
  
  
}

export default Board;