import React from 'react';

interface BlueprintGridProps {
  theme: 'light' | 'dark';
  opacity?: number;
}

const BlueprintGrid: React.FC<BlueprintGridProps> = ({ theme, opacity = 0.05 }) => {
  const isDark = theme === 'dark';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
  const accentColor = isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.05)';

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
      style={{ opacity }}
    >
      {/* Primary Grid */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />
      {/* Secondary Grid */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${gridColor} 0.5px, transparent 0.5px),
            linear-gradient(90deg, ${gridColor} 0.5px, transparent 0.5px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      {/* Accent Blueprint Radial */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentColor} 0%, transparent 80%)`
        }}
      />
      
      {/* Engineering Markings */}
      <div className="absolute top-10 left-10 flex flex-col gap-4 font-mono text-[8px] uppercase tracking-widest opacity-40">
        <div>REF_SYSTEM: ISO_80000</div>
        <div>SCALE: 1:1.00</div>
      </div>
      <div className="absolute bottom-10 right-10 flex flex-col gap-4 font-mono text-[8px] uppercase tracking-widest opacity-40 text-right">
        <div>PROJECTION: THIRD_ANGLE</div>
        <div>UNIT: METRIC_MM</div>
      </div>
    </div>
  );
};

export default BlueprintGrid;
