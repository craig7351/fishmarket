export interface FishInfo {
  id: string;
  name: string;
  price: string;
  scientificName: string; // 學名
  size: string;
  weight: string;
  habitat: string; // 棲息地
  description: string;
  position: {
    top: number;  // % form top
    left: number; // % from left
    width: number; // % of image width
    height: number; // % of image height
  };
}

export const fishData: FishInfo[] = [
  {
    "id": "1",
    "name": "日本花鱸",
    "price": "406元/公斤",
    "scientificName": "Lateolabrax japonicus",
    "size": "60-100 cm",
    "weight": "2-5 kg",
    "habitat": "岩礁海岸、河口",
    "description": "日本花鱸，俗稱七星鱸。背部有黑色斑點，肉質鮮美，適合清蒸或煮湯。常見於東亞沿海地區。",
    "position": {
      "top": 15,
      "left": 16.5,
      "width": 9,
      "height": 5
    }
  },
  {
    "id": "2",
    "name": "尖吻鱸",
    "price": "216元/公斤",
    "scientificName": "Lates calcarifer",
    "size": "50-120 cm",
    "weight": "3-20 kg",
    "habitat": "沿海、河口、紅樹林",
    "description": "尖吻鱸又稱金目鱸。體型巨大，肉質細嫩且無細刺，是極佳的食用魚，也是重要的養殖魚種。",
    "position": {
      "top": 15.4,
      "left": 25.4,
      "width": 8.2,
      "height": 5
    }
  },
  {
    "id": "3",
    "name": "虱目魚",
    "price": "157元/公斤",
    "scientificName": "Chanos chanos",
    "size": "40-100 cm",
    "weight": "1-3 kg",
    "habitat": "熱帶及亞熱帶海域",
    "description": "台灣重要的養殖魚類，有「牛奶魚」之稱。肉質鮮甜但多刺，適合煮粥或乾煎。",
    "position": {
      "top": 15.2,
      "left": 33.5,
      "width": 9,
      "height": 5
    }
  },
  {
    "id": "4",
    "name": "真鯛",
    "price": "416元/公斤",
    "scientificName": "Pagrus major",
    "size": "30-80 cm",
    "weight": "1-4 kg",
    "habitat": "岩礁區、沙泥底",
    "description": "真鯛也就是我們常說的嘉鱲。體色紅潤豔麗，被視為吉祥的象徵，肉質緊實鮮美，是高級食用魚。",
    "position": {
      "top": 25.2,
      "left": 16.5,
      "width": 9,
      "height": 5
    }
  },
  {
    "id": "5",
    "name": "鬼頭刀",
    "price": "80元/公斤",
    "scientificName": "Coryphaena hippurus",
    "size": "80-140 cm",
    "weight": "5-15 kg",
    "habitat": "大洋表層",
    "description": "雄魚頭部有明顯隆起，像斧頭一樣。游泳速度極快，肉質適合做成魚排或魚丸。",
    "position": {
      "top": 24.8,
      "left": 73.9,
      "width": 9,
      "height": 5
    }
  }
];
