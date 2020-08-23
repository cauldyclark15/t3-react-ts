import React, { MouseEventHandler, useState } from "react";

import "./App.css";

function calculateWinner(squares: string[]): string | null {
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
}

interface SquareProps {
  value: string;
  handleClick: MouseEventHandler;
}

function Square(props: SquareProps) {
  const { value, handleClick } = props;
  return (
    <button onClick={handleClick} className="item" type="button">
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i: number) => {
    if (calculateWinner(squares) || squares[i]) {
      return null;
    }

    const copy = [...squares];
    copy[i] = xIsNext ? "X" : "O";
    setXIsNext(!xIsNext);
    setSquares(copy);
  };

  const renderSquare = (i: number) => {
    return (
      <Square
        value={squares[i]}
        handleClick={(e) => {
          e.preventDefault();
          return handleClick(i);
        }}
      />
    );
  };

  const winner = calculateWinner(squares);
  let status = "";

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <header className="App-header">
      <h3>{status}</h3>
      <div className="parent">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}

        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}

        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button
        type="button"
        style={{ marginTop: 10, padding: 10, fontSize: 16 }}
        onClick={(e) => {
          e.preventDefault();
          setSquares(Array(9).fill(""));
          setXIsNext(true);
        }}
      >
        RESET
      </button>
    </header>
  );
}

function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
