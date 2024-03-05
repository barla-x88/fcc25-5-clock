import { useEffect, useState } from 'react';

const SessionTimer = ({ length }) => {
  //time in seconds
  const [currentTime, setCurrentTime] = useState(length);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setCurrentTime(length);
  }, [length]);

  useEffect(() => {
    let timer;

    if (isActive) {
      timer = setInterval(() => {
        setCurrentTime((prevTime) => {
          const time = prevTime - 1;
          if (time === 0) clearInterval(timer);
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
      <div className="fs-3">
        {String(Math.floor(currentTime / 60))}:{currentTime % 60}
      </div>
      <div className="d-flex gap-2">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setIsActive(true)}
        >
          Start
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setIsActive(false)}
        >
          pause
        </button>
        <button className="btn btn-primary btn-sm">Reset</button>
      </div>
    </div>
  );
};
export default SessionTimer;
