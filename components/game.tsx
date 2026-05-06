'use client';

import { useState, useRef, RefObject, ChangeEvent} from 'react';

function Game({timer}:{timer:any}) {

  console.log(timer);

  const intervalTime=1000;
  const timerLimit=60;
  const max=500;
  const min=-500;

  const [count,setCount]=useState(timerLimit);
  const [randNum,setRandNum]=useState(0);
  const [userInput,setUserInput]=useState("");

  const tokAudio:any=useRef(null);
  const alarmAudio:any=useRef(null);
  const wonAudio:any=useRef(null);
  const userInteracted:RefObject<boolean>=useRef(false);

  const title="Random Number Guess";
  const timeOutMsg="Time Is Up!!";
  const wonMsg="You Won!!";
  const tooHighMsg="Too High";
  const tooLowMsg="Too Low";
  const rangeErrorMsg= `Random number must be between ${min} and ${max} inclusive`;
  let feedback:string="";
  let feedbackCSSClasses="m-2";

  if(userInteracted.current){
    if(randNum<min || randNum>max){
      throw RangeError(rangeErrorMsg);
    }
    
    if(count<=0 || parseInt(userInput)===randNum){
      endGame();
    } 
    if(count<=0){
      feedback=timeOutMsg;
      feedbackCSSClasses="m2 text-red-500";
    }
    else{
      if(count!==timerLimit){
        if(parseInt(userInput)>randNum){
          feedback=tooHighMsg;
          feedbackCSSClasses="m2 text-red-500";
        }
        else if(parseInt(userInput)<randNum){
          feedback=tooLowMsg;
          feedbackCSSClasses="m2 text-red-500";
        }
        else if(parseInt(userInput)===randNum){
          feedback=wonMsg;
          feedbackCSSClasses="m2 text-green-500";
        }
      }
      else{
        startGame();
      }
    }
  }

  return (
    <div className="text-center">
       <header className="mb-4 bg-orange-500">
        <h1 className="text-6xl mx-auto font-bold text-center mb-4 p-4">
          {title}
        </h1>
      </header>
      <main className="m-4">
        <header className="m-4">
          <h2 className="text-2xl m-2">
            Guess the randomly generated interger from {min} to {max}
          </h2>
        </header>
        <p className={feedbackCSSClasses}>{feedback}</p>
        <p className="m-2">Time Remaining: {count}</p>
        <div className="row m-2">
          <div className="col m-2">
            <label htmlFor='userInputBox'>
              Number Guess:
            </label>
          </div>
          <div className="col m-2">
              <input className="border rounded-sm text-center m-2 p-2" type="number" id="userInputBox" name="userInputBox" min={min} max={max} onChange={provideFeedback} value={userInput} disabled={timer.current ? false : true} />
          </div>
        </div>
        <hr className="m-2" />
        <div className="flex justify-center my-2">
          <div className="m-2">
            <button className="border rounded-sm bg-yellow-500 cursor-pointer m-2 p-2" onClick={resetInput} disabled={timer.current ? false : true}>Reset</button>
          </div>
          <div className="m-2">
            <button className="border rounded-sm bg-green-500 cursor-pointer m-2 p-2" onClick={initGame}>Start</button>
          </div>
          <div className="m-2">
            <button className="border rounded-sm bg-red-500 cursor-pointer m-2 p-2" onClick={userEndGame}>Stop</button>
          </div>
        </div>
        <audio ref={alarmAudio} src="./audio/alarm.wav"></audio>
        <audio ref={wonAudio} src="./audio/won.wav"></audio>
        <audio ref={tokAudio} src="./audio/tok.mp3"></audio>
      </main>
    </div>
   
  );

  function initGame(){
    if(!userInteracted.current) userInteracted.current=true;
    resetGame();
  }

  function countdown(){
    setCount(count=>count-1);
    playAudio(tokAudio.current);
  }

  async function playAudio(audio:HTMLAudioElement){
    audio.load();
    try{
      await audio.play();
    }
    catch(error){
      console.log(error);
    }
  }

  function stopAudio(){
    alarmAudio.current.pause();
    tokAudio.current.pause();
    wonAudio.current.pause();
  }

  function setRandomNumber(){
    setRandNum(Math.floor(Math.random() * (max - min) + min));
  }

  function setCounter(){
    setCount(timerLimit);
  }

  function resetGame(){
    resetInput();
    setCounter();
    setRandomNumber();
    stopAudio();
  }

  function resetInput(){
    setUserInput("");
  }

  function startGame(){
    if(!timer.current) timer.current=setInterval(countdown,intervalTime);
  }

  function endGame(){
    clearInterval(timer.current);
    timer.current=null;
    if(userInteracted.current){
      if(count<=0){
        playAudio(alarmAudio.current);
      }
      else if(parseInt(userInput)===randNum){
        playAudio(wonAudio.current);
      }
    }
    else{
      stopAudio();
    }
  }

  function userEndGame(){
    if(userInteracted.current) userInteracted.current=false;
    endGame();
  }

  function provideFeedback(e:ChangeEvent<HTMLInputElement>){
    setUserInput(e.currentTarget.value);
  }

}

export default Game;