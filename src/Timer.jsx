import { useEffect, useState } from 'react';

const Timer = ({ sessionLength, breakLength, setTimerRunning, reset }) => {
  //time in seconds
  const [currentTime, setCurrentTime] = useState(sessionLength);

  const [isActive, setIsActive] = useState(false);
  const [activeTimer, setActiveTimer] = useState('Session');

  useEffect(() => {
    setCurrentTime(activeTimer === 'Session' ? sessionLength : breakLength);
  }, [sessionLength, breakLength]);

  useEffect(() => {
    if (currentTime === 0) {
      setActiveTimer((prev) => (prev === 'Break' ? 'Session' : 'Break'));
    }
  }, [currentTime]);

  useEffect(() => {
    let timer;

    if (isActive) {
      //disables the increase decrease btns
      setTimerRunning(true);

      timer = setInterval(() => {
        setCurrentTime((prevTime) => {
          const time = prevTime - 1;
          if (time < 0) {
            //need to get the latest value of activeTimer, necessary for passing the tests
            setActiveTimer((prev) => {
              setCurrentTime(prev === 'Session' ? sessionLength : breakLength);
              return prev;
            });

            // On proudction
            // setCurrentTime(
            //   activeTimer === 'Session' ? sessionLength : breakLength
            // );
          }

          return time;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isActive]);

  return (
    <div className="d-flex flex-column align-items-center bg-dark text-white p-2 mb-3">
      <p id="timer-label">{activeTimer}</p>
      <div className="fs-3" id="time-left">
        {String(Math.floor(currentTime / 60)).padStart(2, '0')}:
        {String(currentTime % 60).padStart(2, '0')}
      </div>
      <div className="d-flex gap-2">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setIsActive(!isActive)}
          id="start_stop"
        >
          {isActive ? 'STOP' : 'START'}
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            setIsActive(false);
            setActiveTimer('Session');

            // It was necessary to reset the timer in case the default session + default break is started;
            setCurrentTime(sessionLength);
            reset();
          }}
          id="reset"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
export default Timer;
