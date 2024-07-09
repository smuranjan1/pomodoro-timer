import { useEffect, useState } from 'react';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown, faPlay, faPause, faRotate } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [workTime, setWorkTime] = useState(1500);
  const [breakTime, setBreakTime] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [isFirstRun, setIsFirstRun] = useState(true);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [currentTime, setCurrentTime] = useState(1500);

  const displaySetTime = (time) => {
    return Math.floor(time / 60);
  }

  const displayTime = (time) => {
    const minutes = String(Math.floor(time / 60));
    const seconds = String(time % 60);
    return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  }

  const displayCurrentTime = () =>{
    if (isFirstRun) {
      return displayTime(workTime);
    } else {
      return displayTime(currentTime);
    }
  }

  useEffect(() => {
    let myInterval = setInterval(() => {
      document.getElementById('time-left').style.color = currentTime < 60 ? 'red' : 'black';
      if (isRunning === false) return;
      if (currentTime === 0) {
        const audio = document.getElementById('beep');
        audio.play();
        setTimeout(() => {
          audio.pause();
          audio.currentTime = 0;
        }, 3000);
        if (isWorkTime) {
          setIsWorkTime(false);
          setCurrentTime(breakTime);
        } else {
          setIsWorkTime(true);
          setCurrentTime(workTime);
        }
      } else {
        setCurrentTime(currentTime - 1)
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    }
  });

  const timerDisplay = () => isWorkTime ? 'Work: ' : 'Break: ';
  const addWorkTime = () => workTime < 3600 ? setWorkTime(workTime + 60) : null;
  const removeWorkTime = () => workTime > 60 ? setWorkTime(workTime - 60) : null;
  const addBreakTime = () => breakTime < 3600 ? setBreakTime(breakTime + 60) : null;
  const removeBreakTime = () => breakTime > 60 ? setBreakTime(breakTime - 60) : null;
  
  const toggleIsRunning = () => {
    if (isFirstRun) {
      setCurrentTime(workTime);
      setIsFirstRun(false);
    }
    setIsRunning(!isRunning)
  }

  const reset = () => {
    setIsWorkTime(true);
    setIsFirstRun(true);
    setIsRunning(false);
    setWorkTime(1500);
    setBreakTime(300);
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  }

  return (
    <div id="timer">
      <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
      <h1>Pomodoro Timer</h1>
      <div className="control-container">
        <span id="session-label">Work Time: </span>
        <FontAwesomeIcon className="time-btn" icon={faCaretDown} id="session-decrement" onClick={removeWorkTime} />
        <span id="session-length">{displaySetTime(workTime)}</span>
        <FontAwesomeIcon className="time-btn" icon={faCaretUp} id="session-increment" onClick={addWorkTime} />
      </div>
      <div className="control-container">
        <span id="break-label">Break Time: </span>
        <FontAwesomeIcon className="time-btn" icon={faCaretDown} id="break-decrement" onClick={removeBreakTime} />
        <span id="break-length">{displaySetTime(breakTime)}</span>
        <FontAwesomeIcon className="time-btn" icon={faCaretUp} id="break-increment" onClick={addBreakTime} />

      </div>
      <div>
        <span id="timer-label">{timerDisplay()}</span>
        <span id="time-left">{displayCurrentTime()}</span>
      </div>
      <div>
        <FontAwesomeIcon className="bottom-btn" id="start_stop" onClick={toggleIsRunning} icon={isRunning ? faPause : faPlay} />
        <FontAwesomeIcon className="bottom-btn" icon={faRotate} id="reset" onClick={reset} />
      </div>
    </div>
  );
}

export default App;

