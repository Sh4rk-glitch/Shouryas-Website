
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

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
  minFontSize = 36,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const chars = useMemo(() => text.split(""), [text]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef}
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
  char, textColor, stroke, strokeColor, useWeight, useWidth, useItalic, useAlpha, mouseX, mouseY 
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  
  const springConfig = { stiffness: 250, damping: 25, mass: 0.5 };
  
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
      
      const distance = Math.sqrt(
        Math.pow(mouseX.get() - centerX, 2) + 
        Math.pow(mouseY.get() - centerY, 2)
      );

      const radius = window.innerWidth < 768 ? 120 : 280;
      const strength = Math.max(0, 1 - distance / radius);
      
      const easedStrength = Math.pow(strength, 1.5);

      if (useWeight) weightVal.set(400 + easedStrength * 500);
      if (useWidth) stretchVal.set(100 + easedStrength * 35);
      if (useAlpha) opacityVal.set(0.7 + easedStrength * 0.3);
      scaleVal.set(1 + easedStrength * 0.15);
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
