import React, { useState, useEffect, useCallback } from 'react';
import Canvas from './Canvas';
import Ball from './Ball';
import Racket from './Racket';

const Game = () => {
  const [ball, setBall] = useState({
    x: 500, y: 250, velocityX: 3, velocityY: 3, radius: 10, color: '#cd202c'
  });

  const [leftRacket, setLeftRacket] = useState({
    x: 40, y: 200, width: 10, height: 100, color: '#aaaaaa'
  });

  const [rightRacket, setRightRacket] = useState({
    x: 950, y: 200, width: 10, height: 100, color: '#aaaaaa'
  });

  const updateBallPosition = useCallback(() => {
    setBall((prevBall) => {
      let { x, y, velocityX, velocityY } = prevBall;
      x += velocityX;
      y += velocityY;

      // Check collision with walls
      if (y <= 0 || y >= 500) velocityY = -velocityY;
      
      // Collision with paddles
      if (x <= leftRacket.x + leftRacket.width && y >= leftRacket.y && y <= leftRacket.y + leftRacket.height) {
        velocityX = -velocityX;
      }
      if (x >= rightRacket.x - rightRacket.width && y >= rightRacket.y && y <= rightRacket.y + rightRacket.height) {
        velocityX = -velocityX;
      }

      return { ...prevBall, x, y, velocityX, velocityY };
    });
  }, [leftRacket, rightRacket]);

  const moveLeftRacket = (direction) => {
    setLeftRacket((prev) => {
      let newY = prev.y + direction * 4;
      newY = Math.max(0, Math.min(newY, 500 - prev.height)); // keep within canvas bounds
      return { ...prev, y: newY };
    });
  };

  const moveRightRacket = (direction) => {
    setRightRacket((prev) => {
      let newY = prev.y + direction * 4;
      newY = Math.max(0, Math.min(newY, 500 - prev.height));
      return { ...prev, y: newY };
    });
  };

  const draw = useCallback((context) => {
    context.clearRect(0, 0, 1000, 500);
    context.fillStyle = "#f1e1e9";
    context.fillRect(0, 0, 1000, 500);

    // Draw ball
    context.beginPath();
    context.fillStyle = ball.color;
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fill();

    // Draw left racket
    context.fillStyle = leftRacket.color;
    context.fillRect(leftRacket.x, leftRacket.y, leftRacket.width, leftRacket.height);

    // Draw right racket
    context.fillStyle = rightRacket.color;
    context.fillRect(rightRacket.x, rightRacket.y, rightRacket.width, rightRacket.height);
  }, [ball, leftRacket, rightRacket]);

  return (
    <div>
      <Canvas draw={draw} width={1000} height={500} />
      <Ball x={ball.x} y={ball.y} radius={ball.radius} color={ball.color} updatePosition={updateBallPosition} />
      <Racket x={leftRacket.x} y={leftRacket.y} width={leftRacket.width} height={leftRacket.height} color={leftRacket.color} upKey="w" downKey="s" onMove={moveLeftRacket} />
      <Racket x={rightRacket.x} y={rightRacket.y} width={rightRacket.width} height={rightRacket.height} color={rightRacket.color} upKey="o" downKey="l" onMove={moveRightRacket} />
    </div>
  );
};

export default Game;

