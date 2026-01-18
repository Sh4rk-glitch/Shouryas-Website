import React, { useEffect, useRef, useMemo } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface TextPressureProps {
  text: string;
  flex?: boolean;
  alpha?: boolean;
  stroke?: boolean;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  textColor?: string;
  strokeColor?: string;
  minFontSize?: number;
  className?: string;
}

const TextPressure: React.FC<TextPressureProps> = ({
  text,
  flex = true,
  alpha = false,
  stroke = false,
  width = true,
  weight = true,
  italic = true,
  textColor = "#ffffff",
  strokeColor = "#ff0000",
  className = ""
}) => {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const chars = useMemo(() => text.split(""), [text]);

  useEffect(() => {
    let frameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [mouseX, mouseY]);

  return (
    <div 
      className={`relative flex flex-wrap justify-center items-center w-full select-none will-change-transform ${className}`}
      style={{ gap: flex ? '0' : '0.1em' }}
    >
      {chars.map((char, i) => (
        <CharItem 
          key={`${char}-${i}`} 
          char={char} 
          textColor={textColor}
          stroke={stroke}
          strokeColor={strokeColor}
          useWeight={weight}
          useWidth={width}
          useItalic={italic}
          useAlpha={alpha}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      ))}
    </div>
  );
};

interface CharItemProps {
  char: string;
  textColor: string;
  stroke: boolean;
  strokeColor: string;
  useWeight: boolean;
  useWidth: boolean;
  useItalic: boolean;
  useAlpha: boolean;
  mouseX: any;
  mouseY: any;
}

const CharItem: React.FC<CharItemProps> = ({ 
  char, textColor, stroke, strokeColor, useWeight, useWidth, useAlpha, mouseX, mouseY 
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  
  const springConfig = { stiffness: 300, damping: 35, mass: 0.5 };
  
  const weightVal = useSpring(400, springConfig);
  const stretchVal = useSpring(100, springConfig);
  const opacityVal = useSpring(1, springConfig);
  const scaleVal = useSpring(1, springConfig);

  useEffect(() => {
    const updatePressure = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mX = mouseX.get();
      const mY = mouseY.get();
      
      const dx = mX - centerX;
      const dy = mY - centerY;
      const distSq = dx * dx + dy * dy;
      const radius = window.innerWidth < 768 ? 100 : 200;
      const radiusSq = radius * radius;

      if (distSq > radiusSq) {
        if (weightVal.get() !== 400) weightVal.set(400);
        if (stretchVal.get() !== 100) stretchVal.set(100);
        if (opacityVal.get() !== 1) opacityVal.set(1);
        if (scaleVal.get() !== 1) scaleVal.set(1);
        return;
      }

      const strength = 1 - Math.sqrt(distSq) / radius;
      const easedStrength = strength * strength; 

      if (useWeight) weightVal.set(400 + easedStrength * 500);
      if (useWidth) stretchVal.set(100 + easedStrength * 35);
      if (useAlpha) opacityVal.set(0.7 + easedStrength * 0.3);
      scaleVal.set(1 + easedStrength * 0.12);
    };

    const unsubscribeX = mouseX.on("change", updatePressure);
    return () => unsubscribeX();
  }, [useWeight, useWidth, useAlpha, mouseX, mouseY, weightVal, stretchVal, opacityVal, scaleVal]);

  return (
    <motion.span
      ref={ref}
      style={{
        display: 'inline-block',
        color: textColor,
        fontWeight: weightVal as any,
        scale: scaleVal,
        opacity: opacityVal,
        fontVariationSettings: useWidth ? `"wdth" ${stretchVal.get()}` : undefined,
        WebkitTextStroke: stroke ? `1px ${strokeColor}` : 'none',
        transformOrigin: 'center center',
        whiteSpace: char === ' ' ? 'pre' : 'normal',
        willChange: 'transform, font-weight, opacity'
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};

export default TextPressure;
