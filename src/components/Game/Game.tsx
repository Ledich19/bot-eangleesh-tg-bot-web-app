import React, { useEffect, useState, useRef } from "react";

function Game() {
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height:
      window.innerHeight > window.innerWidth
        ? window.innerWidth
        : window.innerHeight,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;

        canvas.height =
          window.innerHeight > window.innerWidth
            ? window.innerWidth
            : window.innerHeight;

        drawCanvas();
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const drawPoint = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number
  ) => {
    context.beginPath();
    context.fillStyle = "white";
    context.fillRect(x, y, 1, 1);
    context.closePath();
  };

  const generateChaosFractal = (
    context: CanvasRenderingContext2D,
    startX: number,
    startY: number
  ) => {
    const attractors = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0.5, y: Math.sqrt(3) / 2 },
    ];

    let currentPoint = { x: startX, y: startY };

    let iterations = 0;
    const maxIterations = 50000;

    const drawFrame = () => {
      const activeAttractor = attractors[Math.floor(Math.random() * 3)];
      const newX = (currentPoint.x + activeAttractor.x) / 2;
      const newY = (currentPoint.y + activeAttractor.y) / 2;
      currentPoint = { x: newX, y: newY };
      drawPoint(
        context,
        currentPoint.x * canvasSize.width,
        currentPoint.y * canvasSize.height
      );

      iterations++;

      if (iterations < maxIterations) {
        requestAnimationFrame(drawFrame);
      }
    };

    drawFrame();
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
   // generateChaosFractal(context, 0.5, 0.5);
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

   canvasSize.width = window.innerWidth;
    canvasSize.height =
      window.innerHeight > window.innerWidth
        ? window.innerWidth
        : window.innerHeight;



    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top;

    context.clearRect(0, 0, canvas.width, canvas.height);
    generateChaosFractal(context, x / canvas.width, y / canvas.height);
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      width={canvasSize.width}
      height={canvasSize.height}
      style={{ width: "100%" }}
    ></canvas>
  );
}

export default Game;
