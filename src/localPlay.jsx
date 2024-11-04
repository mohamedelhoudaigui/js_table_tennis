import './App.css';
import React, { useState } from 'react';

function LocalPlay() {
  // State to track selected options for each category
  const [selectedOption, setSelectedOption] = useState({
    playerType: null,
    rounds: null,
    points: null,
  });

  // Update state with selected option
  const handleClick = (category, option) => () => {
    setSelectedOption((prevState) => ({
      ...prevState,
      [category]: option,
    }));
  };

  return (
    <>
      <div className="botorfriend">
        <button
          className={`button ${selectedOption.playerType === 'bot' ? 'selected' : ''}`}
          onClick={handleClick('playerType', 'bot')}
        >
          Play with Bot
        </button>
        <button
          className={`button ${selectedOption.playerType === 'friend' ? 'selected' : ''}`}
          onClick={handleClick('playerType', 'friend')}
        >
          Play with Friend
        </button>
      </div>

      <div className="rounds">
        <button
          className={`button ${selectedOption.rounds === 1 ? 'selected' : ''}`}
          onClick={handleClick('rounds', 1)}
        >
          1 Round
        </button>
        <button
          className={`button ${selectedOption.rounds === 3 ? 'selected' : ''}`}
          onClick={handleClick('rounds', 3)}
        >
          3 Rounds
        </button>
        <button
          className={`button ${selectedOption.rounds === 5 ? 'selected' : ''}`}
          onClick={handleClick('rounds', 5)}
        >
          5 Rounds
        </button>
      </div>

      <div className="points">
        <button
          className={`button ${selectedOption.points === 3 ? 'selected' : ''}`}
          onClick={handleClick('points', 3)}
        >
          3 Points
        </button>
        <button
          className={`button ${selectedOption.points === 5 ? 'selected' : ''}`}
          onClick={handleClick('points', 5)}
        >
          5 Points
        </button>
        <button
          className={`button ${selectedOption.points === 7 ? 'selected' : ''}`}
          onClick={handleClick('points', 7)}
        >
          7 Points
        </button>
      </div>
      <div className='lastdiv'>
        <button className='startbutton'>start</button>
      </div>
    </>
  );
}

export default LocalPlay;
