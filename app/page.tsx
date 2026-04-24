'use client';

import { useState, ChangeEvent} from 'react';
import { InputType } from 'zlib';

let timer: any;

function App() {

  const intervalTime=1000;
  const timerLimit=60;
  const max=10;

  const [count,setCount]=useState(timerLimit);
  const [randNum,setRandNum]=useState(0);
  const [userInput,setUserInput]=useState(0);
  const [gameOver, setGameOver]=useState(true);

  const timeOutFlag="Time Is Up!!";
  const wonFlag="You Won!!";

  if(count<=0 || userInput===randNum){
    endGame();
  } 
  let feedback;
  if(count<=0){
    feedback=timeOutFlag;
  }
  else if(!gameOver){
    if(userInput>randNum){
      feedback="Too High";
    }
    else if(userInput<randNum){
      feedback="Too Low";
    }
    else if(userInput===randNum){
      feedback=wonFlag;
    }
  }
  return (
    <>
       <header>
        <h1>
          Random Guess
        </h1>
      </header>
      <main>
        <header>
          <h2>
            Main Game
          </h2>
        </header>
        <p>{feedback}</p>
        <p>{count}</p>
        <div className="row">
          <div className="col">
            <label htmlFor='userInputBox'>
              Number Guess:
            </label>
          </div>
          <div className="col">
              <input type="number" id="userInputBox" name="userInputBox" onChange={provideFeedback} value={userInput} />
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col">
            <button onClick={initGame}>Start Game</button>
          </div>
          <div className="col">
            <button>End Game</button>
          </div>
        </div>
      </main>
    </>
   
  );

  function initGame(){
    console.log("starting game....");
    resetGame();
    setGameOver(false);
    timer=setInterval(countdown,intervalTime);
  }

  function countdown(){
    setCount(count=>count-1);
  }

  function setRandomNumber(){
    setRandNum(Math.floor(max*Math.random()));
  }

  function setCounter(){
    setCount(timerLimit);
  }

  function resetGame(){
    setCounter();
    setRandomNumber();
  }

  function endGame(){
    clearInterval(timer);
  }

  function provideFeedback(e:ChangeEvent<HTMLInputElement>){
    setUserInput(parseInt(e.currentTarget.value));
  }

}

export default App;

