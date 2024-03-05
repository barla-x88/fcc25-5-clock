import { useEffect, useState } from 'react';

const Timer = ({
  sessionLength,
  breakLength,
  activeTimerName,
  setTimerRunning,
  // timerRunning,
  reset,
}) => {
  //time in seconds
  const [currentTime, setCurrentTime] = useState(
    activeTimerName === 'Session' ? sessionLength : breakLength
  );

  const [isActive, setIsActive] = useState(false);
  const [activeTimer, setActiveTimer] = useState(activeTimerName);

  useEffect(() => {
    setCurrentTime(activeTimer === 'Session' ? sessionLength : breakLength);
  }, [sessionLength, breakLength, activeTimer]);

  useEffect(() => {
    let timer;

    if (isActive) {
      //disables the increase decrease btns
      setTimerRunning(true);

      timer = setInterval(() => {
        setCurrentTime((prevTime) => {
          const time = prevTime - 1;
          if (time < 0) {
            // Uncomment this when you want to end the timer after it reachers zero
            // clearInterval(timer);

            // Switch timer when the current one reaches zero
            activeTimer === 'Session'
              ? setActiveTimer('Break')
              : setActiveTimer('Session');

            setCurrentTime(
              activeTimer === 'Session' ? sessionLength : breakLength
            );
          }

          return time > 0 ? time : 0;
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
            setCurrentTime(
              activeTimer === 'Session' ? sessionLength : breakLength
            );
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
