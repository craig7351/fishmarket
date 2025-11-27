import { useState, useRef } from 'react';
import { fishData as initialFishData } from '../data/fishData';
import type { FishInfo } from '../data/fishData';
import { FishTooltip } from './FishTooltip';
import { FishSizeComparator } from './FishSizeComparator';
import { motion } from 'framer-motion';

export const FishMap = () => {
  // Use local state for fish data to allow real-time editing
  const [fishList, setFishList] = useState<FishInfo[]>(initialFishData);
  const [hoveredFish, setHoveredFish] = useState<FishInfo | null>(null);
  const [selectedFishId, setSelectedFishId] = useState<string | null>(null);
  
  // Debug mode state
  const [debugMode, setDebugMode] = useState(false);
  const [showComparator, setShowComparator] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedFish = selectedFishId ? fishList.find(f => f.id === selectedFishId) : null;

  const updateFishPosition = (key: keyof FishInfo['position'], value: number) => {
    if (!selectedFishId) return;
    setFishList(prev => prev.map(fish => 
      fish.id === selectedFishId 
        ? { ...fish, position: { ...fish.position, [key]: Number(value) } }
        : fish
    ));
  };

  const handleCopyJson = () => {
    // Clean up the output to match the source code format more closely if needed
    const json = JSON.stringify(fishList, null, 2);
    navigator.clipboard.writeText(json).then(() => {
      alert('JSON 已複製到剪貼簿！請直接覆蓋 fishData.ts 的內容。');
    });
  };

  return (
    <div className="flex flex-col items-end gap-4">
      <div className="w-full flex gap-4 items-start">
        {/* Main Map Area */}
        <div 
          className="relative w-full max-w-6xl bg-slate-200 rounded-lg shadow-xl select-none"
          ref={containerRef}
        >
          {/* The Image */}
          <div className="relative aspect-[16/9] w-full bg-slate-300 overflow-hidden rounded-lg">
            <img 
              src="/img/fish.png" 
              alt="Fish Market Board" 
              className="w-full h-full object-contain pointer-events-none"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                const msg = document.createElement('div');
                msg.className = 'text-slate-500 p-10 text-center';
                msg.innerHTML = '<h3 class="text-xl font-bold">請將圖片放入 public/img/fish.png</h3>';
                e.currentTarget.parentElement?.appendChild(msg);
              }}
            />

            {/* Overlay Grid (The Hotspots) */}
            {fishList.map((fish) => {
              const isSelected = fish.id === selectedFishId;
              return (
                <motion.div
                  key={fish.id}
                  id={`fish-${fish.id}`}
                  onClick={(e) => {
                    if (debugMode) {
                      e.stopPropagation();
                      setSelectedFishId(fish.id);
                    }
                  }}
                  className={`absolute cursor-pointer group 
                    ${debugMode ? 'z-20' : 'z-10'}
                    ${debugMode && isSelected ? 'border-4 border-blue-500 bg-blue-400/30' : ''}
                    ${debugMode && !isSelected ? 'border-2 border-green-400 bg-green-400/20' : ''}
                  `}
                  style={{
                    top: `${fish.position.top}%`,
                    left: `${fish.position.left}%`,
                    width: `${fish.position.width}%`,
                    height: `${fish.position.height}%`,
                  }}
                  onMouseEnter={() => setHoveredFish(fish)}
                  onMouseLeave={() => setHoveredFish(null)}
                  whileHover={!debugMode ? { scale: 1.05 } : {}}
                >
                  {/* The Glow Effect - Only visible when NOT in debug mode or simply on hover */}
                  {!debugMode && (
                    <div 
                      className={`w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      style={{
                        boxShadow: '0 0 20px 10px rgba(255, 255, 255, 0.6), inset 0 0 15px rgba(255, 255, 200, 0.4)',
                        filter: 'blur(5px)',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)'
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Floating Tooltip */}
          {hoveredFish && !debugMode && (
            <FishTooltip fish={hoveredFish} />
          )}
        </div>

        {/* Debug Panel */}
        {debugMode && (
          <div className="w-80 flex-shrink-0 bg-white p-4 rounded-lg shadow-lg border border-slate-200 sticky top-4 max-h-[90vh] overflow-y-auto">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">調整面板</h2>
              <button 
                onClick={handleCopyJson}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                複製 JSON
              </button>
            </div>

            {selectedFish ? (
              <div className="space-y-4">
                <div className="pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-lg text-blue-600">{selectedFish.name}</h3>
                  <p className="text-xs text-slate-400">{selectedFish.scientificName}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Top (%)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={selectedFish.position.top}
                      onChange={(e) => updateFishPosition('top', parseFloat(e.target.value))}
                      className="w-full px-2 py-1 border border-slate-300 rounded focus:border-blue-500 outline-none"
                    />
                    <input 
                      type="range" 
                      min="0" max="100" step="0.1"
                      value={selectedFish.position.top}
                      onChange={(e) => updateFishPosition('top', parseFloat(e.target.value))}
                      className="w-full mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Left (%)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={selectedFish.position.left}
                      onChange={(e) => updateFishPosition('left', parseFloat(e.target.value))}
                      className="w-full px-2 py-1 border border-slate-300 rounded focus:border-blue-500 outline-none"
                    />
                    <input 
                      type="range" 
                      min="0" max="100" step="0.1"
                      value={selectedFish.position.left}
                      onChange={(e) => updateFishPosition('left', parseFloat(e.target.value))}
                      className="w-full mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Width (%)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={selectedFish.position.width}
                      onChange={(e) => updateFishPosition('width', parseFloat(e.target.value))}
                      className="w-full px-2 py-1 border border-slate-300 rounded focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Height (%)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={selectedFish.position.height}
                      onChange={(e) => updateFishPosition('height', parseFloat(e.target.value))}
                      className="w-full px-2 py-1 border border-slate-300 rounded focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 text-xs text-slate-400">
                  提示：點擊圖片上的綠色框框來選擇要編輯的魚。
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-slate-400">
                <p>請點擊圖片上的綠框<br/>開始編輯</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tools Bar */}
      <div className="mt-2 flex items-center gap-4">
        {/* Size Comparator Button */}
        <button
          onClick={() => setShowComparator(true)}
          className="flex items-center gap-2 text-sm text-blue-600 bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-200 hover:bg-blue-50 transition-colors"
        >
          <span className="text-lg">🐟</span>
          <span className="font-bold">魚類大小比一比</span>
        </button>

        {/* Debug Mode Switcher */}
        <label className="flex items-center gap-2 text-sm text-slate-500 bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors">
          <span className={`w-2 h-2 rounded-full ${debugMode ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`}></span>
          <select 
            value={debugMode ? 'debug' : 'preview'} 
            onChange={(e) => setDebugMode(e.target.value === 'debug')}
            className="bg-transparent font-medium text-slate-700 outline-none cursor-pointer pr-1"
          >
            <option value="preview">預覽模式 (Preview)</option>
            <option value="debug">編輯模式 (Debug)</option>
          </select>
        </label>
      </div>

      {/* Size Comparator Overlay */}
      {showComparator && (
        <FishSizeComparator onClose={() => setShowComparator(false)} />
      )}
    </div>
  );
};
