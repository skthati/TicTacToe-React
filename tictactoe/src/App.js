import {useState} from 'react'
import './App.css';

export default function tictactoe() {
  
  return (
    <>
      <div class="container mt-5">
        <h1 class="text-center mb-5">Tic Tac Toe</h1>
        <hr class="mb-5"></hr>
        <div class="square-container ">
            <Square />
            <Square />
            <Square />
        </div>
        <div class="square-container">
            <Square />
            <Square />
            <Square />
        </div>
        <div class="square-container">
            <Square />
            <Square />
            <Square />
        </div>
      </div>
    </>
  )
}

function Square() {
  const [value, setValue] = useState(0)
  return (
    <>
      <div className="square-box">
        <button className='my-button' onClick={() => setValue(value+1)}>
          {value}
        </button>
      </div>
    </>
  )
}