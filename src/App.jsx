import { useState } from 'react';
import './App.css';
import SessionTimer from './SessionTimer';

function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);

  const increaseSession = () => {
    const newLength = sessionLength + 1 < 60 ? sessionLength + 1 : 60;
    setSessionLength(newLength);
  };

  const decreaseSession = () => {
    const newLength = sessionLength - 1 > 0 ? sessionLength - 1 : 1;
    setSessionLength(newLength);
  };

  const increaseBreak = () => {
    const newLength = breakLength + 1 < 60 ? breakLength + 1 : 60;
    setBreakLength(newLength);
  };

  const decreaseBreak = () => {
    const newLength = breakLength - 1 > 0 ? breakLength - 1 : 1;
    setBreakLength(newLength);
  };

  return (
    <main className="bg-light">
      <h1 className="text-center bg-primary-subtle">25 + 5 clock</h1>
      <div className="container">
        <div className="row">
          <SessionTimer length={sessionLength * 60} />
        </div>
        <div className="row">
          <div className="col">
            <p id="break-label" className="text-center">
              Break Length
            </p>
            <div className="d-flex gap-2 align-items-center justify-content-center">
              <button
                className="p-2 btn btn-danger"
                id="break-decrement"
                onClick={decreaseBreak}
              >
                -
              </button>
              <p className="mt-3">{breakLength}</p>
              <button
                className="p-2 btn btn-success"
                id="break-increment"
                onClick={increaseBreak}
              >
                +
              </button>
            </div>
          </div>
          <div className="col">
            <p id="session-label" className="text-center">
              Session Length
            </p>
            <div className="d-flex gap-2 align-items-center justify-content-center">
              <button
                id="session-decrement"
                className="p-2 btn btn-danger"
                onClick={decreaseSession}
              >
                -
              </button>
              <p className="mt-3">{sessionLength}</p>
              <button
                id="session-increment"
                className="p-2 btn btn-success"
                onClick={increaseSession}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
