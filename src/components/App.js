
import React, { useEffect, useRef, useState } from "react";
import './../styles/App.css';

const App = () => {
 let t=3.0988;
 t=t.toFixed(2);
 console.log(t);

  const [time,settime]=useState(0);
  const [lap,setlap]=useState([]);
  let latestTime=useRef(time);
const timer=useRef(null);
  const handlestart=()=>{
    if (timer.current==null) {
      timer.current=setInterval(()=>{
        settime(time=>{
          const newtime=time+1;
          latestTime.current=newtime;
          return newtime;
        });
        },10);
    }
  }
  const handlestop=()=>{
    if (timer.current!=null) {
      clearInterval(timer.current);
      timer.current=null;
    }
  }
  useEffect(()=>{
return ()=>{
  clearInterval(timer.current)
}
  },[]);
  const handlelap=()=>{
    setlap(lap=>[...lap,latestTime.current]);
  }
  const handlereset=()=>{
    // settime(time=>0);
    // setlap(lap=>[]);
    settime(0);
    setlap([]);
    clearInterval(timer.current);
    }
    const formatTime = (totalSecondsCenti) => {
      //totalSecondsCenti=totalSecondsCenti/100;
      const minutes = Math.floor((totalSecondsCenti/60)/100);
      const seconds = Math.floor(totalSecondsCenti/100 % 60);
      const centiseconds = totalSecondsCenti % 100;
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
    };
  return (
    <div>
      <p>{formatTime(time)}</p>
     
      <button onClick={handlestart}>Start</button>
      <button onClick={handlestop}>Stop</button>
      <button onClick={handlelap}>Lap</button>
      <button onClick={handlereset}>Reset</button>
      <ul>
        {lap.map((item,i)=><li key={'a'+i}>{formatTime(item)}</li>)}
      </ul>
        {/* Do not remove the main div */}
    </div>
  )
}

export default App
