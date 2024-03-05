import { useEffect, useState } from 'react';

const SessionTimer = ({ length }) => {
  //time in seconds
  const [currentTime, setCurrentTime] = useState(length);
  const [isActive, setIsActive] = useState(false);

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
    <div>
      <div>
        {Math.floor(currentTime / 60)}:{currentTime % 60}
      </div>
      <div>
        <button onClick={() => setIsActive(true)}>Start</button>
        <button onClick={() => setIsActive(false)}>pause</button>
        <button>Reset</button>
      </div>
    </div>
  );
};
export default SessionTimer;
