import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fishData } from '../data/fishData';
import sizeRankData from '../data/fishSizeRank.json';

interface FishSizeComparatorProps {
  onClose: () => void;
}

export const FishSizeComparator = ({ onClose }: FishSizeComparatorProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // 1. 資料前處理：
  //    - 過濾掉 maxSize 為 0 的項目
  //    - 由小到大排序 (reverse the rank data which is desc)
  //    - 結合 fishData 取得裁切座標
  const sortedFish = sizeRankData
    .filter(item => item.maxSize > 0)
    .sort((a, b) => a.maxSize - b.maxSize) // 小到大
    .map(rankItem => {
      const originalData = fishData.find(f => f.name === rankItem.name);
      return {
        ...rankItem,
        position: originalData?.position
      };
    })
    .filter(item => item.position); // 確保有找到對應的座標資料

  // 最大的一隻魚 (最後一個) 的尺寸，作為 100% 寬度的基準
  const maxFishSize = sortedFish[sortedFish.length - 1].maxSize;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev >= sortedFish.length - 1) {
            setIsPlaying(false); // 播完停止
            return prev;
          }
          return prev + 1;
        });
      }, 2000); // 每 2 秒換下一隻
    }
    return () => clearInterval(timer);
  }, [isPlaying, sortedFish.length]);

  const currentFish = sortedFish[currentIndex];
  
  // 計算當前魚類佔畫面寬度的百分比
  // 假設最大的魚 (350cm) 佔滿螢幕寬度 (90vw)
  // 則當前魚的寬度 = (currentSize / maxSize) * 90vw
  const widthPercentage = (currentFish.maxSize / maxFishSize) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-slate-900/95 flex flex-col items-center justify-center text-white"
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Title & Controls */}
      <div className="absolute top-10 text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-wider text-blue-300">魚類大小比一比</h2>
        <div className="flex items-center gap-4 justify-center">
            <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-1 bg-blue-600 rounded-full text-sm hover:bg-blue-500"
            >
                {isPlaying ? "暫停" : "繼續播放"}
            </button>
            <span className="text-slate-400 font-mono">
                {currentIndex + 1} / {sortedFish.length}
            </span>
        </div>
      </div>

      {/* Main Display Area */}
      <div className="w-full max-w-[95vw] h-[60vh] flex flex-col items-center justify-end relative pb-10 border-b border-slate-600">
        
        {/* Ruler Background Lines */}
        <div className="absolute inset-0 flex justify-between items-end pointer-events-none opacity-30">
            {[0, 1, 2, 3].map(m => (
                <div key={m} className="h-full border-l border-dashed border-white flex flex-col justify-end pb-1">
                    <span className="ml-2 text-xl">{m} 公尺</span>
                </div>
            ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentFish.name}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex flex-col items-center"
            style={{ width: '100%' }}
          >
            {/* The Fish Image */}
            <div 
                className="relative mx-auto transition-all duration-500"
                style={{
                    width: `${widthPercentage}%`,
                    // Dynamic Aspect Ratio
                    aspectRatio: currentFish.position 
                        ? `${(currentFish.position.width * 16) / (currentFish.position.height * 9)}`
                        : '2/1',
                }}
            >
                 {currentFish.position && (
                    <div 
                        className="w-full h-full"
                        style={{
                            backgroundImage: 'url(/img/fish.png)',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: `${(100 / currentFish.position.width) * 100}% auto`,
                            backgroundPosition: `${(currentFish.position.left / (100 - currentFish.position.width)) * 100}% ${(currentFish.position.top / (100 - currentFish.position.height)) * 100}%`
                        }}
                    />
                 )}
            </div>

            {/* Fish Info Label */}
            <div className="mt-4 text-center">
                <h3 className="text-4xl font-bold mb-1">{currentFish.name}</h3>
                <p className="text-2xl text-yellow-400 font-mono">{currentFish.maxSize} cm</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Timeline / Progress Bar */}
      <div className="w-full max-w-[90vw] mt-8 h-2 bg-slate-700 rounded-full overflow-hidden">
        <motion.div 
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / sortedFish.length) * 100}%` }}
        />
      </div>
      
      <p className="mt-4 text-slate-400 text-sm">
        以最大魚種「{sortedFish[sortedFish.length-1].name}」({maxFishSize}cm) 為比例尺基準
      </p>

    </motion.div>
  );
};

