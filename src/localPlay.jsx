import './App.css'
import React, { useState } from 'react';

function Square({value, onSclick}) {

  return (
      <button className='s'
      onClick={onSclick}>
        {value}
      </button>
  );
}

function localPlay() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function hClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext){
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
        <div className="localPlay">
            <Square value={squares[0]} onSclick={() => hClick(0)}/>
            <Square value={squares[1]} onSclick={() => hClick(1)}/>
            <Square value={squares[2]} onSclick={() => hClick(2)}/>
        </div>
        <div className="localPlay">
            <Square value={squares[3]} onSclick={() => hClick(3)}/>
            <Square value={squares[4]} onSclick={() => hClick(4)}/>
            <Square value={squares[5]} onSclick={() => hClick(5)}/>
        </div>
        <div className="localPlay">
            <Square value={squares[6]} onSclick={() => hClick(6)}/>
            <Square value={squares[7]} onSclick={() => hClick(7)}/>
            <Square value={squares[8]} onSclick={() => hClick(8)}/>
        </div>
    </>
  )
}

function calculateWinner(squares) {
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
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default localPlay;