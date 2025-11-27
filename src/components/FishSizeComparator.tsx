import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fishData } from '../data/fishData';
import sizeRankData from '../data/fishSizeRank.json';

interface FishSizeComparatorProps {
  onClose: () => void;
}

export const FishSizeComparator = ({ onClose }: FishSizeComparatorProps) => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // 1. 資料處理與分組
  const { fishGroups, maxFishSize, totalGroups } = useMemo(() => {
    // 原始排序數據
    const sorted = sizeRankData
      .filter(item => item.maxSize > 0)
      .sort((a, b) => a.maxSize - b.maxSize)
      .map(rankItem => {
        const originalData = fishData.find(f => f.name === rankItem.name);
        return {
          ...rankItem,
          position: originalData?.position
        };
      })
      .filter(item => item.position);

    const max = sorted[sorted.length - 1]?.maxSize || 350;

    // 分組邏輯
    const groups: (typeof sorted)[] = [];
    let i = 0;
    while (i < sorted.length) {
      const currentSize = sorted[i].maxSize;
      let chunkSize = 1;

      if (currentSize <= 40) chunkSize = 6;      // 小魚群游
      else if (currentSize <= 80) chunkSize = 3; // 中魚結伴
      else if (currentSize <= 150) chunkSize = 2;// 大魚雙行
      
      // 取出這一組的魚
      const chunk = sorted.slice(i, i + chunkSize);
      groups.push(chunk);
      i += chunkSize;
    }

    return { 
      fishGroups: groups, 
      maxFishSize: max,
      totalGroups: groups.length 
    };
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying) {
      // 根據當前組別的魚數量決定停留時間
      const currentGroupSize = fishGroups[currentGroupIndex]?.length || 1;
      let delay = 2500; // 預設 (1隻): 2.5 秒
      
      if (currentGroupSize >= 6) delay = 5000;      // 6隻: 5秒
      else if (currentGroupSize >= 3) delay = 3500; // 3隻: 3.5秒
      else if (currentGroupSize >= 2) delay = 3000; // 2隻: 3秒

      timer = setTimeout(() => {
        setCurrentGroupIndex(prev => {
          if (prev >= totalGroups - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, delay);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, totalGroups, currentGroupIndex, fishGroups]);

  const currentGroup = fishGroups[currentGroupIndex] || [];

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
        className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Title & Controls */}
      <div className="absolute top-10 text-center space-y-2 z-40">
        <h2 className="text-3xl font-bold tracking-wider text-blue-300">魚類大小比一比</h2>
        <div className="flex items-center gap-4 justify-center">
            <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-1 bg-blue-600 rounded-full text-sm hover:bg-blue-500"
            >
                {isPlaying ? "暫停" : "繼續播放"}
            </button>
            <span className="text-slate-400 font-mono">
                第 {currentGroupIndex + 1} 組 / 共 {totalGroups} 組
            </span>
        </div>
      </div>

      {/* Main Display Area */}
      <div className="w-full max-w-[95vw] h-[65vh] flex flex-col items-center justify-end relative pb-10 border-b border-slate-600">
        
        {/* Ruler Background Lines */}
        <div className="absolute inset-0 flex justify-between items-end pointer-events-none opacity-30 z-0">
            {[0, 1, 2, 3].map(m => (
                <div key={m} className="h-full border-l border-dashed border-white flex flex-col justify-end pb-1">
                    <span className="ml-2 text-xl">{m} 公尺</span>
                </div>
            ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentGroupIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="flex flex-wrap items-end justify-center gap-8 w-full z-10 px-10"
          >
            {/* 人類比例尺 (170cm) - 橫向顯示 */}
            {(() => {
              const humanHeight = 170; // 人類身高 170cm
              const humanWidthPercentage = (humanHeight / maxFishSize) * 100;
              
              return (
                <div className="flex flex-col items-center group relative">
                  {/* 人類圖示 - 橫向躺著 */}
                  <div 
                    className="relative transition-all duration-500 origin-bottom"
                    style={{
                      width: `calc(${humanWidthPercentage}vw * 0.9)`,
                      minWidth: '60px',
                      height: `calc(${humanWidthPercentage}vw * 0.9 * 0.25)`, // 橫向人類的高度（厚度）
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}
                  >
                    {/* 橫向的人類輪廓 SVG */}
                    <svg 
                      width="100%" 
                      height="100%" 
                      viewBox="0 0 250 100" 
                      preserveAspectRatio="xMidYMid meet"
                      className="drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                    >
                      {/* 頭部（左側） */}
                      <circle cx="30" cy="50" r="20" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/>
                      {/* 身體（橫向） */}
                      <rect x="50" y="35" width="80" height="30" rx="5" fill="#3b82f6" stroke="#2563eb" strokeWidth="2"/>
                      {/* 手臂（上方和下方） */}
                      <rect x="60" y="15" width="60" height="20" rx="10" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" transform="rotate(-20 90 25)"/>
                      <rect x="60" y="65" width="60" height="20" rx="10" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" transform="rotate(20 90 75)"/>
                      {/* 腿部（右側） */}
                      <rect x="130" y="38" width="120" height="12" rx="6" fill="#1e40af" stroke="#1e3a8a" strokeWidth="2"/>
                      <rect x="130" y="50" width="120" height="12" rx="6" fill="#1e40af" stroke="#1e3a8a" strokeWidth="2"/>
                    </svg>
                    
                    {/* Hover Tooltip */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      人類 ({humanHeight}cm)
                    </div>
                  </div>

                  {/* 標籤 */}
                  <div className="mt-2 text-center">
                    <h3 className="text-sm md:text-xl font-bold text-amber-300">人類</h3>
                    <p className="text-xs md:text-sm text-yellow-400 font-mono">{humanHeight} cm</p>
                  </div>
                </div>
              );
            })()}
            
            {currentGroup.map((fish) => {
                // 計算每隻魚的寬度比例
                const widthPercentage = (fish.maxSize / maxFishSize) * 100;
                
                return (
                    <div key={fish.name} className="flex flex-col items-center group relative">
                        {/* The Fish Image */}
                        <div 
                            className="relative transition-all duration-500 hover:scale-110 origin-bottom cursor-pointer"
                            style={{
                                // 限制最大寬度，避免小魚在並排時佔太寬
                                width: `calc(${widthPercentage}vw * 0.9)`, 
                                minWidth: '60px', // 最小顯示寬度
                                // Dynamic Aspect Ratio
                                aspectRatio: fish.position 
                                    ? `${(fish.position.width * 16) / (fish.position.height * 9)}`
                                    : '2/1',
                            }}
                        >
                            {fish.position && (
                                <div 
                                    className="w-full h-full filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                                    style={{
                                        backgroundImage: 'url(/img/fish.png)',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: `${(100 / fish.position.width) * 100}% auto`,
                                        backgroundPosition: `${(fish.position.left / (100 - fish.position.width)) * 100}% ${(fish.position.top / (100 - fish.position.height)) * 100}%`
                                    }}
                                />
                            )}
                            
                            {/* Hover Tooltip for Name/Size */}
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {fish.name} ({fish.maxSize}cm)
                            </div>
                        </div>

                        {/* Always visible label below */}
                        <div className="mt-2 text-center">
                            <h3 className="text-sm md:text-xl font-bold text-slate-300">{fish.name}</h3>
                            <p className="text-xs md:text-sm text-yellow-400 font-mono">{fish.maxSize} cm</p>
                        </div>
                    </div>
                );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Timeline / Progress Bar */}
      <div className="w-full max-w-[90vw] mt-8 h-2 bg-slate-700 rounded-full overflow-hidden">
        <motion.div 
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentGroupIndex + 1) / totalGroups) * 100}%` }}
        />
      </div>
      
      <p className="mt-4 text-slate-400 text-sm">
        以最大魚種「{fishGroups[fishGroups.length-1]?.[0]?.name}」({maxFishSize}cm) 為比例尺基準
      </p>

    </motion.div>
  );
};
