import { useEffect, useRef } from 'react';

const CircleCanvas = ({ percentage }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const radius = canvas.width / 2 - 10;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background Circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#e6e6e6';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Progress Circle
    const endAngle = (percentage / 100) * 2 * Math.PI - 0.5 * Math.PI;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -0.5 * Math.PI, endAngle);
    ctx.strokeStyle = '#4caf50';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Text
    ctx.font = '24px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${percentage}%`, centerX, centerY);
  }, [percentage]);

  return <canvas ref={canvasRef} width={150} height={150}></canvas>;
};

export default CircleCanvas;
