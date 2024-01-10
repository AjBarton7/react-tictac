import React, { useState } from 'react';
import './App.css';

const INITIAL_STATE = Array(9).fill(null);

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

const Board = ({ squares, onClick }) => {
  const size = 3; 
  const rows = Array(size).fill(null);

  return (
    <div className="board">
      {rows.map((_, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {squares.slice(rowIndex * size, rowIndex * size + size).map((square, colIndex) => (
            <Square
              key={rowIndex * size + colIndex}
              value={square}
              onClick={() => onClick(rowIndex * size + colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};


const Game = () => {
  const [history, setHistory] = useState([INITIAL_STATE]);
  const [stepNumber, setStepNumber] = useState(0);
  const xIsNext = stepNumber % 2 === 0;
  const current = history[stepNumber];
  const winner = calculateWinner(current);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const currentSquares = [...current];

    if (winner || currentSquares[i]) {
      return;
    }

    currentSquares[i] = xIsNext ? 'X' : 'O';

    setHistory([...newHistory, currentSquares]);
    setStepNumber(newHistory.length);
  };

  const restartGame = () => {
    setHistory([INITIAL_STATE]);
    setStepNumber(0);
  };

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={restartGame}>Restart Game</button> 
      </div>
    </div>
  );
};

export default Game;

