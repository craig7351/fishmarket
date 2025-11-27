import { motion } from 'framer-motion';
import type { FishInfo } from '../data/fishData';

interface FishTooltipProps {
  fish: FishInfo;
}

export const FishTooltip = ({ fish }: FishTooltipProps) => {
  // 計算魚的中心點位置
  const centerX = fish.position.left + fish.position.width / 2;
  const centerY = fish.position.top + fish.position.height / 2;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10, x: "-50%" }}
      animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, scale: 0.8, y: 10, x: "-50%" }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
      className="absolute z-50 w-72 bg-white/95 backdrop-blur-md rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-white/50 overflow-hidden pointer-events-none"
      style={{
        left: `${centerX}%`,
        // 讓視窗顯示在魚的下方 (top + height)，並加上一點間距
        top: `${fish.position.top + fish.position.height + 2}%`,
      }}
    >
      {/* 連接線 (Optional: 增加一個指向魚的小箭頭) */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 rotate-45" />

      {/* Header */}
      <div className="relative bg-slate-900 text-white p-4 pt-5">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-bold tracking-wider">{fish.name}</h2>
          <span className="text-yellow-400 font-mono font-bold">{fish.price}</span>
        </div>
        <p className="text-slate-400 italic text-sm mt-1">{fish.scientificName}</p>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3 text-slate-700">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-blue-50 p-2 rounded">
            <span className="text-blue-500 font-bold block text-xs uppercase">尺寸</span>
            {fish.size}
          </div>
          <div className="bg-blue-50 p-2 rounded">
            <span className="text-blue-500 font-bold block text-xs uppercase">重量</span>
            {fish.weight}
          </div>
        </div>
        
        <div className="bg-emerald-50 p-2 rounded text-sm">
          <span className="text-emerald-600 font-bold block text-xs uppercase mb-1">棲息地</span>
          {fish.habitat}
        </div>

        <div className="pt-2 border-t border-slate-100 text-sm leading-relaxed text-slate-600">
          {fish.description}
        </div>
      </div>
    </motion.div>
  );
};

