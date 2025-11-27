export interface FishInfo {
  id: string;
  name: string;
  price: string;
  scientificName: string;
  size: string;
  weight: string;
  habitat: string;
  description: string;
  position: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

// Helper to generate basic fish data
const createFish = (id: number, name: string, price: number, row: number, col: number): FishInfo => {
  // 網格參數校正
  const START_TOP = 15;      // Row 0 Top
  const START_LEFT = 16.5;   // Col 0 Left
  const ROW_STEP = 9.6;      // Row Gap (approx)
  const COL_STEP = 8.2;      // Col Gap (approx)
  
  // 特殊校正 (根據經驗微調)
  let top = START_TOP + (row * ROW_STEP);
  
  // 第二排之後的稍微往下修正一點，因為文字行距可能不同
  if (row > 0) top += 0.5; 

  return {
    id: id.toString(),
    name: name,
    price: `${price}元/公斤`,
    scientificName: "Scientific Name",
    size: "資料建置中",
    weight: "資料建置中",
    habitat: "資料建置中",
    description: `這是關於${name}的詳細介紹。目前資料正在建置中，您可以透過編輯模式補充更多細節。`,
    position: {
      top: Number(top.toFixed(1)),
      left: Number((START_LEFT + (col * COL_STEP)).toFixed(1)),
      width: 9,
      height: 5
    }
  };
};

// 原始資料列表 (Row-major order)
const rawData = [
  // Row 0
  ["日本花鱸", 406], ["尖吻鱸", 216], ["虱目魚", 157], ["軒鰭類", 377], ["金梭魚", 61], ["真鰺", 49], ["烏鰺", 240], ["馬鰺科", 470],
  // Row 1
  ["真鯛", 416], ["黃背牙鯛", 232], ["紅魽魚鯛", 123], ["黑棘鯛", 257], ["其他鯛", 32], ["鯖仔", 50], ["帶魚屬", 192], ["鬼頭刀", 80],
  // Row 2
  ["平鯛", 299], ["黑(魚威)", 384], ["白姑魚", 163], ["花身雞", 211], ["圓花鰹", 40], ["康氏馬加鰆", 279], ["日本馬加鰆", 242], ["臺灣馬加鰆", 273],
  // Row 3
  ["紅牙(魚威)", 366], ["金線魚", 120], ["馬頭魚", 400], ["龍占魚科", 223], ["鯧鰺", 881], ["鐮鰺", 240], ["紅肉旗魚", 130], ["雨傘旗魚", 122],
  // Row 4
  ["紅牙魚鯛", 366], ["金線魚(2)", 120], ["鸚哥魚科", 221], ["大棘大眼鯛", 223], ["真鯊屬", 44], ["魟類", 72], ["章魚", 109], ["其他", 375],
  // Row 5
  ["其他笛鯛", 400], ["頻鯛科", 165], ["鸚哥魚科(2)", 221], ["大棘大眼鯛(2)", 349], ["龍蝦科", 1407], ["蝦姑", 339], ["鋸緣青蟹", 944], ["遠海梭子蟹", 141],
  // Row 6
  ["點帶石斑", 458], ["合齒魚科", 34], ["鱚科", 241], ["現?鮭", 22], ["棕點石斑", 480], ["藍圓鰺", 49], ["鮐魚科", 300], ["白腹鯖", 40],
  // Row 7
  ["鸚哥魚", 61], ["其他笛鯛(2)", 48], ["雙鬚?科", 44], ["其他鯊", 44], ["烏賊", 194], ["紅星梭子蟹", 141], ["銹斑蟳", 141], ["其他蟳螯類", 141]
];

export const fishData: FishInfo[] = rawData.map((item, index) => {
  const row = Math.floor(index / 8);
  const col = index % 8;
  return createFish(index + 1, item[0] as string, item[1] as number, row, col);
});

// 手動修正前 5 隻已確認的座標，確保它們保持完美
// (ID 1-5 is mapped to index 0-4)
// 日本花鱸
fishData[0].position = { top: 15, left: 16.5, width: 9, height: 5 };
// 尖吻鱸
fishData[1].position = { top: 15.4, left: 25.4, width: 8.2, height: 5 };
// 虱目魚
fishData[2].position = { top: 15.2, left: 33.5, width: 9, height: 5 };
// 真鯛 (Row 1, Col 0 -> Index 8) -- Wait, user id 4 was 真鯛. Let's check ID mapping.
// User said: ID 4 is 真鯛. My array has index 8 as 真鯛.
// So I need to apply user's specific overwrites to the correct array items based on name or logic.

const userCorrections = [
  { name: "日本花鱸", pos: { top: 15, left: 16.5, width: 9, height: 5 } },
  { name: "尖吻鱸", pos: { top: 15.4, left: 25.4, width: 8.2, height: 5 } },
  { name: "虱目魚", pos: { top: 15.2, left: 33.5, width: 9, height: 5 } },
  { name: "真鯛", pos: { top: 25.2, left: 16.5, width: 9, height: 5 } },
  { name: "鬼頭刀", pos: { top: 24.8, left: 73.9, width: 9, height: 5 } }
];

userCorrections.forEach(correction => {
  const target = fishData.find(f => f.name === correction.name);
  if (target) {
    target.position = correction.pos;
  }
});
