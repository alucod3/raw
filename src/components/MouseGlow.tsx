'use client';

import { useEffect, useState } from 'react';

export default function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="mouse-glow"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    />
  );
}
