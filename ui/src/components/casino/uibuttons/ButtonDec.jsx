import React from 'react';
import ArrowLeft from '../img/arrow_left_roulette.png'

const ButtonBid = ({DecreaseChips}) => {
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
    background: `url(${ArrowLeft})`
  };
// functions -----------------------------------

  const startCounter = () => {
    if (intervalRef.current) return;
        intervalRef.current = setInterval(() => {
        DecreaseChips();
        time++;
        if (time == 30) {
            clearInterval(intervalRef.current);
            time = 0;
            intervalRef.current = setInterval(() => {
                DecreaseChips();
                time++;
                if (time == 300) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = setInterval(() => {
                        DecreaseChips()
                        DecreaseChips()
                        DecreaseChips()
                        DecreaseChips()
                        DecreaseChips()
                        DecreaseChips()
                        DecreaseChips()
                        DecreaseChips()
                        DecreaseChips()
                        DecreaseChips()
                        DecreaseChips()
                        DecreaseChips()
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
                DecreaseChips()
                startCounter()
        }}
        onMouseUp={stopCounter}
        onMouseLeave={stopCounter}
        style={elementStyle}
      />
  );
};

export default ButtonBid;