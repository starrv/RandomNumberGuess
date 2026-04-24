'use client';

import { useState, ChangeEvent} from 'react';

let timer: any;

function App() {

  const intervalTime=1000;
  const timerLimit=10;
  const max=100;
  const min=-100;

  const [count,setCount]=useState(timerLimit);
  const [randNum,setRandNum]=useState(0);
  const [userInput,setUserInput]=useState(0);

  const timeOutMsg="Time Is Up!!";
  const wonMsg="You Won!!";
  const tooHighMsg="Too High";
  const tooLowMsg="Too Low";
  const rangeErrorMsg= "An error has occurred.  Please contact support.";

  if(randNum<min || randNum>max){
    throw RangeError(rangeErrorMsg);
  }

  if(count<=0 || userInput===randNum){
    endGame();
  } 
  let feedback;
  if(count<=0){
    feedback=timeOutMsg;
  }
  else{
    if(count!==timerLimit){
      if(userInput>randNum){
        feedback=tooHighMsg;
      }
      else if(userInput<randNum){
        feedback=tooLowMsg;
      }
      else if(userInput===randNum){
        feedback=wonMsg;
      }
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
            Guess the interger from {min} to {max}
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
              <input type="number" id="userInputBox" name="userInputBox" min={min} max={max} onChange={provideFeedback} value={userInput} />
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col">
            <button onClick={initGame}>Start Game</button>
          </div>
          <div className="col">
            <button onClick={endGame}>End Game</button>
          </div>
        </div>
      </main>
    </>
   
  );

  function initGame(){
    console.log("starting game....");
    resetGame();
    timer=setInterval(countdown,intervalTime);
  }

  function countdown(){
    setCount(count=>count-1);
  }

  function setRandomNumber(){
    setRandNum(Math.floor(Math.random() * (max - min) + min));
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
    console.log(e.currentTarget.value);
    setUserInput(Number(e.currentTarget.value));
  }

}

export default App;

