import { motion } from 'framer-motion';
import type { FishInfo } from '../data/fishData';

interface FishTooltipProps {
  fish: FishInfo;
}

export const FishTooltip = ({ fish }: FishTooltipProps) => {
  // 計算魚的中心點位置
  const centerX = fish.position.left + fish.position.width / 2;
  
  // 判斷是否在下半部 (大於 50%)，如果是，則將 Tooltip 顯示在上方
  const isLowerHalf = fish.position.top > 50;

  return (
    <motion.div
      // 根據位置調整動畫方向
      initial={{ opacity: 0, scale: 0.8, y: isLowerHalf ? -10 : 10, x: "-50%" }}
      animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, scale: 0.8, y: isLowerHalf ? -10 : 10, x: "-50%" }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
      className="absolute z-50 w-72 bg-white/95 backdrop-blur-md rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-white/50 overflow-hidden pointer-events-none"
      style={{
        left: `${centerX}%`,
        // 如果在下半部，定位 bottom 在魚的頂部；否則定位 top 在魚的底部
        ...(isLowerHalf 
          ? { bottom: `${100 - fish.position.top + 2}%`, top: 'auto' } 
          : { top: `${fish.position.top + fish.position.height + 2}%`, bottom: 'auto' }
        ),
      }}
    >
      {/* 連接線 (箭頭)，根據位置調整方向 */}
      <div 
        className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 rotate-45 ${
          isLowerHalf ? '-bottom-2' : '-top-2'
        }`} 
      />

      {/* Fish Image (Cropped from main board) */}
      <div 
        className="w-full bg-slate-200 border-b border-slate-900"
        style={{
          // Maintain aspect ratio based on fish dimensions (Assuming board is 16:9)
          aspectRatio: `${(fish.position.width * 16) / (fish.position.height * 9)}`,
          backgroundImage: 'url(/img/fish.png)',
          backgroundRepeat: 'no-repeat',
          // Zoom to match fish width
          backgroundSize: `${(100 / fish.position.width) * 100}% auto`,
          // Position to show the specific fish
          backgroundPosition: `${(fish.position.left / (100 - fish.position.width)) * 100}% ${(fish.position.top / (100 - fish.position.height)) * 100}%`
        }}
      />

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
