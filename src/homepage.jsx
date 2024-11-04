import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function HomePage() {
  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate("/localPlay");
  };

  const handleClick2 = () => {
    navigate("/onlinePlay");
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