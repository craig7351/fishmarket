import { useState, useRef, MouseEvent } from 'react';
import { fishData } from '../data/fishData';
import type { FishInfo } from '../data/fishData';
import { FishTooltip } from './FishTooltip';
import { motion } from 'framer-motion';

export const FishMap = () => {
  const [hoveredFish, setHoveredFish] = useState<FishInfo | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto bg-slate-200 rounded-lg shadow-xl overflow-hidden select-none"
      ref={containerRef}
    >
      {/* The Image */}
      <div className="relative aspect-[16/9] w-full bg-slate-300">
        <img 
          src="/img/fish.png" 
          alt="Fish Market Board" 
          className="w-full h-full object-contain pointer-events-none"
          onError={(e) => {
            // Fallback if image is missing
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
            const msg = document.createElement('div');
            msg.className = 'text-slate-500 p-10 text-center';
            msg.innerHTML = '<h3 class="text-xl font-bold">請將圖片放入 public/img/fish.png</h3><p>目前顯示為預覽模式</p>';
            e.currentTarget.parentElement?.appendChild(msg);
          }}
        />

        {/* Overlay Grid (The Hotspots) */}
        {fishData.map((fish) => (
          <motion.div
            key={fish.id}
            id={`fish-${fish.id}`}
            className="absolute cursor-pointer group"
            style={{
              top: `${fish.position.top}%`,
              left: `${fish.position.left}%`,
              width: `${fish.position.width}%`,
              height: `${fish.position.height}%`,
            }}
            onMouseEnter={() => setHoveredFish(fish)}
            onMouseLeave={() => setHoveredFish(null)}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* The Glow Effect - Only visible on hover */}
            <div 
              className={`w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              style={{
                boxShadow: '0 0 20px 10px rgba(255, 255, 255, 0.6), inset 0 0 15px rgba(255, 255, 200, 0.4)',
                filter: 'blur(5px)',
                background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)'
              }}
            />
            
            {/* Debug border - helpful for setup, can be removed later */}
            {/* <div className="border border-red-500/30 w-full h-full absolute top-0 left-0" /> */}
          </motion.div>
        ))}
      </div>

      {/* Floating Tooltip */}
      {hoveredFish && (
        <FishTooltip fish={hoveredFish} />
      )}
    </div>
  );
};

