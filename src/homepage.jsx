import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate("/localplay");
  };

  const handleClick2 = () => {
    navigate("/onlineplay");
  };

  return (
    <div>
      <h1>Welcome to the game</h1>
      <button onClick={handleClick1}>local play</button>
      <button onClick={handleClick2}>online play</button>
    </div>
  );
}

export default HomePage;