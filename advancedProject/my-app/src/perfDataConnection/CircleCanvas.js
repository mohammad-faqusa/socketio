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
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Progress Arc
    const endAngle = (Math.PI * 2 * percentage) / 100;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, endAngle - Math.PI / 2);
    ctx.strokeStyle = '#00e676'; // Neon green
    ctx.lineWidth = 10;
    ctx.stroke();

    // Text
    ctx.fillStyle = '#ecf0f1'; // Light text
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${percentage}%`, centerX, centerY);
  }, [percentage]);

  return <canvas ref={canvasRef} width={150} height={150} className="canvas" />;
};

export default CircleCanvas;
