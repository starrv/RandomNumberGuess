'use client';

import {useRef} from 'react';
import Game from "./game";

function App() {

  const timer:any=useRef(null);

  return <Game timer={timer} />

}

export default App;