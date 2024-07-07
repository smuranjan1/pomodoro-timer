import { useState } from 'react';
import './App.css';

function App() {
  const [workTime, setWorkTime] = useState(1500);
  const [breakTime, setBreakTime] = useState(300);
  const [currentTime, setCurrentTime] = useState(0);

  function displayTime(time) {
    const minutes = String(time / 60);
    const seconds = String(time % 60);
    return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  }

  const addWorkTime = () => workTime < 3600 ? setWorkTime(workTime + 60) : alert("Max Work Time");
  const removeWorkTime = () => workTime > 0 ? setWorkTime(workTime - 60) : alert("Min Work Time");
  const addBreakTime = () => breakTime < 3600 ? setBreakTime(breakTime + 60) : alert("Max Break Time");
  const removeBreakTime = () => breakTime > 0 ? setBreakTime(breakTime - 60) : alert("Min Break Time");

  return (
    <>
      <p>Work Time: {displayTime(workTime)}</p>
      <p>Break Time: {displayTime(breakTime)}</p>
      <button onClick={addWorkTime}>Increase Work Time</button>
      <button onClick={removeWorkTime}>Decrease Work Time</button><br />
      <button onClick={addBreakTime}>Increase Break Time</button>
      <button onClick={removeBreakTime}>Decrease Break Time</button><br />
      <button>Start</button>
      <button>Reset</button>
    </>
  );
}

export default App;

