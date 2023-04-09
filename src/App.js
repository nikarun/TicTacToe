import React from 'react'
import { useState } from "react"

function Square({value, onSquareClick}){

//   const [value, setValue] = useState(null)

//   function handleClick(){
// // console.log('clicked')
// setValue('X')
//   }
return (
<button className="square" onClick={onSquareClick}>{value}</button>
)
}

function Board({xIsNext, squares, onPlay}) {
  // const [xIsNext, setXIsNext] = useState(true)
  // const [squares, setSquares] = useState(Array(9).fill(null))
  console.log(`squares: ${squares}`)
  function handleClick(i){
    if(squares[i] || calculateWinner(squares)){
      return
    }
    const nextSquares = squares.slice()
    if(xIsNext){
      nextSquares[i] = 'X'
    }
    else{
      nextSquares[i] = 'O'
    }
    onPlay(nextSquares)
    // setXIsNext(!xIsNext)
  }
  const winner = calculateWinner(squares)
  let gameStatus = null
  if (winner){
    gameStatus = 'winner : '+ winner
  }
  else{
    gameStatus = "Next Player: "+ (xIsNext?'X': 'O')
  }
  return(
    <div>
    <div className="status">{gameStatus}</div>
    <div className="board-row">
<Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>
<Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
<Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
</div>
<div className="board-row">
<Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
<Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
<Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
</div>
<div className="board-row">
<Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
<Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
<Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
</div>
    </div>
  ) 
}


export default function Game(){
  // const [xIsNext, setXIsNext] = useState(true)
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currMove, setCurrMove] = useState(0)
  const xIsNext = currMove % 2 === 0;
  console.log(`history: ${history}`)
  const currentSquares = history[currMove]
  function jumpTo(nextMove){
    setCurrMove(nextMove);
    // setXIsNext(nextMove%2===0)
  }
  const moves = history.map((squares, move)=>{
    let description = null
    if(move>0){
      description = `Go to Move #: ${move}`
    }
    else{
      description = 'Go to game start'
    }
    return (
      <li key={move}>
        <button onClick={()=>jumpTo(move)}>{description}</button>
      </li>
    );
  });
  console.log(`moves: ${moves}`)
  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currMove + 1), nextSquares];
  setHistory(nextHistory);
  setCurrMove(nextHistory.length - 1);
  // setXIsNext(!xIsNext);
  }
  console.log(`currentSquares: ${typeof currentSquares}`)
  return (
    <div className='game'>
    <div className='game-board'>
    <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
    </div>
<div className='game-info'>
<ol>{moves}</ol>

</div>
    </div>
  )
}

function calculateWinner(squares){
let lines = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [3,4,5],
  [6,7,8],
  [2,4,6]
]
for(let i=0;i<lines.length;++i){
  const [a,b,c] = lines[i]
  if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
    return squares[a]
  }
}
return null
}
