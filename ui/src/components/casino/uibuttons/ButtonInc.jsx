import React from 'react';
import ArrowRigth from '../img/arrow_right_roulette.png'

const ButtonBid = ({IncreaseChips}) => {
  var time = 0;
  const intervalRef = React.useRef(null);

  React.useEffect(() => {
    return () => stopCounter(); // when App is unmounted we should stop counter
  }, []);

// styles --------------------------------------

  const elementStyle = {
    height: `30px`,
    width: `30px`,
    cursor: `pointer`,
    background: `url(${ArrowRigth})`
  };
// functions -----------------------------------

  const startCounter = () => {
    if (intervalRef.current) return;
        intervalRef.current = setInterval(() => {
        IncreaseChips();
        time++;
        if (time == 30) {
            clearInterval(intervalRef.current);
            time = 0;
            intervalRef.current = setInterval(() => {
                IncreaseChips();
                time++;
                if (time == 300) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = setInterval(() => {
                        IncreaseChips()
                        IncreaseChips()
                        IncreaseChips()
                        IncreaseChips()
                        IncreaseChips()
                        IncreaseChips()
                        IncreaseChips()
                        IncreaseChips()
                        IncreaseChips()
                        IncreaseChips()
                        IncreaseChips()
                        IncreaseChips()
                    }, 1)
                }
            }, 10);
        }
        }, 100); 
  }
  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };


  return (
      <div
        onMouseDown={() => {
                IncreaseChips()
                startCounter()
        }}
        onMouseUp={stopCounter}
        onMouseLeave={stopCounter}
        style={elementStyle}
      />
  );
};

export default ButtonBid;