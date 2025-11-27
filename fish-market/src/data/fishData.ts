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

const fishDatabase: Record<string, Omit<FishInfo, 'id' | 'price' | 'position'>> = {
  "日本花鱸": {
    name: "日本花鱸",
    scientificName: "Lateolabrax japonicus",
    size: "60-100 cm",
    weight: "2-5 kg",
    habitat: "岩礁海岸、河口",
    description: "俗稱七星鱸。背部有黑色斑點，肉質鮮美，適合清蒸或煮湯。常見於東亞沿海地區。"
  },
  "尖吻鱸": {
    name: "尖吻鱸",
    scientificName: "Lates calcarifer",
    size: "50-120 cm",
    weight: "3-20 kg",
    habitat: "沿海、河口、紅樹林",
    description: "又稱金目鱸。體型巨大，肉質細嫩且無細刺，是極佳的食用魚，也是重要的養殖魚種。"
  },
  "虱目魚": {
    name: "虱目魚",
    scientificName: "Chanos chanos",
    size: "40-100 cm",
    weight: "1-3 kg",
    habitat: "熱帶及亞熱帶海域",
    description: "台灣重要的養殖魚類，有「牛奶魚」之稱。肉質鮮甜但多刺，適合煮粥或乾煎。"
  },
  "軒鰭類": {
    name: "鮃鰭類",
    scientificName: "Pleuronectiformes",
    size: "30-60 cm",
    weight: "0.5-2 kg",
    habitat: "沙泥底質海域",
    description: "俗稱比目魚或扁魚。身體扁平，兩眼位於同一側，棲息於海底，善於偽裝。"
  },
  "金梭魚": {
    name: "金梭魚",
    scientificName: "Sphyraena",
    size: "40-180 cm",
    weight: "1-10 kg",
    habitat: "珊瑚礁、岩礁區",
    description: "性情兇猛的掠食性魚類，身體呈長圓柱形，牙齒銳利，游泳速度極快。"
  },
  "真鰺": {
    name: "真鰺",
    scientificName: "Trachurus japonicus",
    size: "20-40 cm",
    weight: "0.3-1 kg",
    habitat: "沿岸、大洋表層",
    description: "俗稱竹莢魚。體側有一條明顯的稜鱗，肉質緊實，適合乾煎或製作生魚片。"
  },
  "烏鰺": {
    name: "烏鰺",
    scientificName: "Parastromateus niger",
    size: "30-50 cm",
    weight: "1-3 kg",
    habitat: "沙泥底質海域",
    description: "又稱黑鯧。體型側扁，顏色深灰，肉質細緻鮮甜，是受歡迎的食用魚。"
  },
  "馬鰺科": {
    name: "馬鰺",
    scientificName: "Carangidae",
    size: "30-80 cm",
    weight: "1-5 kg",
    habitat: "沿岸、珊瑚礁",
    description: "俗稱甘仔魚或瓜仔魚。游動迅速，肉質紮實，適合紅燒或煮湯。"
  },
  "真鯛": {
    name: "真鯛",
    scientificName: "Pagrus major",
    size: "30-80 cm",
    weight: "1-4 kg",
    habitat: "岩礁區、沙泥底",
    description: "俗稱嘉鱲。體色紅潤豔麗，被視為吉祥的象徵，肉質緊實鮮美，是高級食用魚。"
  },
  "黃背牙鯛": {
    name: "黃背牙鯛",
    scientificName: "Dentex hypselosomus",
    size: "25-40 cm",
    weight: "0.5-2 kg",
    habitat: "深海、大陸棚",
    description: "俗稱赤鯮。體色粉紅帶黃，背部黃色明顯，肉質細嫩，是高級海鮮食材。"
  },
  "紅魽魚鯛": {
    name: "紅甘鰺",
    scientificName: "Seriola dumerili",
    size: "60-150 cm",
    weight: "5-30 kg",
    habitat: "岩礁區、外洋",
    description: "俗稱紅魽。體型碩大，肉質肥美甘甜，是生魚片與紅燒的上等食材。"
  },
  "黑棘鯛": {
    name: "黑棘鯛",
    scientificName: "Acanthopagrus schlegelii",
    size: "30-50 cm",
    weight: "0.5-3 kg",
    habitat: "河口、岩礁、沙底",
    description: "俗稱黑格。適應力強，常見於河口與海岸，肉質有彈性，適合各種烹調方式。"
  },
  "其他鯛": {
    name: "鯛科魚類",
    scientificName: "Sparidae",
    size: "20-60 cm",
    weight: "0.5-3 kg",
    habitat: "多樣化海洋環境",
    description: "包含多種鯛科魚類。鯛魚通常肉質細緻，是台灣餐桌上常見的美味魚種。"
  },
  "鯖仔": {
    name: "花腹鯖",
    scientificName: "Scomber australasicus",
    size: "20-45 cm",
    weight: "0.3-1 kg",
    habitat: "大洋表層",
    description: "俗稱花飛。背部有蟲蝕狀花紋，油脂豐富，含有豐富的 Omega-3 脂肪酸。"
  },
  "帶魚屬": {
    name: "白帶魚",
    scientificName: "Trichiurus lepturus",
    size: "60-150 cm",
    weight: "0.5-3 kg",
    habitat: "沙泥底質、深海",
    description: "體型細長如帶，銀白色澤。肉質細緻但細刺較多，乾煎或煮湯皆宜。"
  },
  "鬼頭刀": {
    name: "鬼頭刀",
    scientificName: "Coryphaena hippurus",
    size: "80-140 cm",
    weight: "5-15 kg",
    habitat: "大洋表層",
    description: "雄魚頭部有明顯隆起，像斧頭一樣。游泳速度極快，肉質適合做成魚排或魚丸。"
  },
  "平鯛": {
    name: "黃錫鯛",
    scientificName: "Rhabdosargus sarba",
    size: "30-60 cm",
    weight: "1-3 kg",
    habitat: "岩礁、河口",
    description: "俗稱枋頭。體色銀白帶黃，肉質鮮美，是磯釣愛好者的常見目標魚。"
  },
  "黑(魚威)": {
    name: "瓜子鱲",
    scientificName: "Girella punctata",
    size: "30-50 cm",
    weight: "0.5-2 kg",
    habitat: "岩礁海岸",
    description: "俗稱黑毛。棲息於岩礁激浪區，以藻類為食，冬季時肉質最為肥美。"
  },
  "白姑魚": {
    name: "白姑魚",
    scientificName: "Argyrosomus argentatus",
    size: "20-40 cm",
    weight: "0.3-1 kg",
    habitat: "沙泥底質",
    description: "俗稱帕頭。體側銀白，肉質軟嫩，適合乾煎或紅燒。"
  },
  "花身雞": {
    name: "花身鯻",
    scientificName: "Terapon jarbua",
    size: "15-30 cm",
    weight: "0.1-0.5 kg",
    habitat: "河口、沙岸",
    description: "俗稱花身雞魚。體側有三條弧形黑褐色縱帶，發出咕咕叫聲，煮湯鮮美。"
  },
  "圓花鰹": {
    name: "圓花鰹",
    scientificName: "Auxis rochei",
    size: "20-40 cm",
    weight: "0.5-1.5 kg",
    habitat: "大洋表層",
    description: "俗稱煙仔魚。體型似鮪魚但較小，血合肉多，適合製作柴魚或加工。"
  },
  "康氏馬加鰆": {
    name: "康氏馬加鰆",
    scientificName: "Scomberomorus commerson",
    size: "100-240 cm",
    weight: "10-50 kg",
    habitat: "沿岸、大洋",
    description: "俗稱土魠魚。體側有波浪狀橫紋，肉質厚實鮮美，是台灣人最愛的魚種之一。"
  },
  "日本馬加鰆": {
    name: "日本馬加鰆",
    scientificName: "Scomberomorus niphonius",
    size: "60-100 cm",
    weight: "3-10 kg",
    habitat: "溫帶沿岸",
    description: "俗稱正馬加。體側有多列斑點，肉質細緻，常見於春季。"
  },
  "臺灣馬加鰆": {
    name: "臺灣馬加鰆",
    scientificName: "Scomberomorus guttatus",
    size: "50-80 cm",
    weight: "2-6 kg",
    habitat: "沿岸海域",
    description: "俗稱白腹仔。體側斑點較不明顯，肉質細嫩，是製作魚丸的上等原料。"
  },
  "紅牙(魚威)": {
    name: "川紋笛鯛",
    scientificName: "Lutjanus sebae",
    size: "40-80 cm",
    weight: "2-10 kg",
    habitat: "珊瑚礁、深海",
    description: "俗稱紅魚。幼魚有三條寬紅帶，成魚體色通紅，肉質極佳，適合宴席料理。"
  },
  "金線魚": {
    name: "金線魚",
    scientificName: "Nemipterus virgatus",
    size: "20-35 cm",
    weight: "0.2-0.8 kg",
    habitat: "沙泥底質",
    description: "體側有金黃色縱帶，肉質細緻潔白，適合清蒸或乾煎。"
  },
  "馬頭魚": {
    name: "馬頭魚",
    scientificName: "Branchiostegus",
    size: "30-50 cm",
    weight: "0.5-2 kg",
    habitat: "沙泥底質",
    description: "頭部方正，肉質極為軟嫩細緻，日本稱為甘鯛，是高級食用魚。"
  },
  "龍占魚科": {
    name: "龍占魚",
    scientificName: "Lethrinidae",
    size: "30-60 cm",
    weight: "1-5 kg",
    habitat: "珊瑚礁、沙地",
    description: "吻部較長，肉質帶有特殊香氣，適合燒烤或清蒸。"
  },
  "鯧鰺": {
    name: "布氏鯧鰺",
    scientificName: "Trachinotus blochii",
    size: "40-80 cm",
    weight: "2-8 kg",
    habitat: "沿岸、沙地",
    description: "俗稱金鯧。體型側扁寬大，養殖普遍，肉多刺少，適合年節祭祀。"
  },
  "鐮鰺": {
    name: "長吻絲鰺",
    scientificName: "Alectis ciliaris",
    size: "40-90 cm",
    weight: "1-5 kg",
    habitat: "大洋、沿岸",
    description: "幼魚背鰭與臀鰭有極長的絲狀延伸，成魚體呈菱形，肉質紮實。"
  },
  "紅肉旗魚": {
    name: "紅肉旗魚",
    scientificName: "Kajikia audax",
    size: "200-350 cm",
    weight: "50-100 kg",
    habitat: "大洋洄游",
    description: "俗稱條紋馬林魚。肉色紅潤，口感極佳，是生魚片的上等材料。"
  },
  "雨傘旗魚": {
    name: "雨傘旗魚",
    scientificName: "Istiophorus platypterus",
    size: "200-300 cm",
    weight: "30-60 kg",
    habitat: "大洋表層",
    description: "俗稱破雨傘。背鰭巨大如帆，游泳速度極快，肉質適合乾煎或熱炒。"
  },
  "鸚哥魚科": {
    name: "鸚哥魚",
    scientificName: "Scaridae",
    size: "30-70 cm",
    weight: "1-5 kg",
    habitat: "珊瑚礁區",
    description: "牙齒癒合成板狀，體色鮮豔多變，肉質軟嫩，適合清蒸。"
  },
  "大棘大眼鯛": {
    name: "大棘大眼鯛",
    scientificName: "Priacanthus macracanthus",
    size: "20-35 cm",
    weight: "0.3-0.8 kg",
    habitat: "深海、岩礁",
    description: "俗稱紅目鰱。眼睛巨大，體色鮮紅，皮厚需剝除，肉質緊實鮮甜。"
  },
  "真鯊屬": {
    name: "鯊魚",
    scientificName: "Carcharhinus",
    size: "100-300 cm",
    weight: "20-200 kg",
    habitat: "沿岸、大洋",
    description: "常見的小型鯊魚。肉質需經處理去除阿摩尼亞味，適合快炒或煙燻。"
  },
  "魟類": {
    name: "魟魚",
    scientificName: "Batoidea",
    size: "40-100 cm",
    weight: "2-20 kg",
    habitat: "沙泥底質",
    description: "身體扁平如盤，尾部有毒刺。肉質軟骨多，適合紅燒或三杯。"
  },
  "章魚": {
    name: "真蛸",
    scientificName: "Octopus vulgaris",
    size: "30-60 cm",
    weight: "1-3 kg",
    habitat: "岩礁孔隙",
    description: "俗稱章魚。智商極高，肉質Q彈有嚼勁，適合汆燙或做成章魚燒。"
  },
  "其他": {
    name: "綜合海鮮",
    scientificName: "Seafood Mix",
    size: "多樣",
    weight: "多樣",
    habitat: "各式海域",
    description: "市集上的其他各式海洋珍味，包含未能詳細分類的小型魚類或貝類。"
  },
  "其他笛鯛": {
    name: "笛鯛科",
    scientificName: "Lutjanidae",
    size: "30-60 cm",
    weight: "1-5 kg",
    habitat: "岩礁、珊瑚礁",
    description: "笛鯛科種類繁多，大多體色鮮豔，肉質細緻，是高品質的食用魚。"
  },
  "頻鯛科": {
    name: "頻鯛",
    scientificName: "Pinjalo pinjalo",
    size: "30-50 cm",
    weight: "1-3 kg",
    habitat: "岩礁區",
    description: "俗稱斜鱗笛鯛。體色粉紅，背部線條圓潤，肉質鮮美。"
  },
  "龍蝦科": {
    name: "龍蝦",
    scientificName: "Palinuridae",
    size: "20-50 cm",
    weight: "0.5-3 kg",
    habitat: "岩礁孔隙",
    description: "甲殼堅硬，肉質潔白Q彈，滋味鮮甜，是宴席上的頂級食材。"
  },
  "蝦姑": {
    name: "蝦蛄",
    scientificName: "Mantis Shrimp",
    size: "15-30 cm",
    weight: "0.2-0.5 kg",
    habitat: "沙泥底質",
    description: "俗稱瀨尿蝦。前肢強壯有力，肉質鮮甜多汁，適合避風塘料理。"
  },
  "鋸緣青蟹": {
    name: "鋸緣青蟹",
    scientificName: "Scylla serrata",
    size: "15-25 cm (甲寬)",
    weight: "0.5-1.5 kg",
    habitat: "河口、紅樹林",
    description: "俗稱沙公、沙母。體型壯碩，肉質飽滿鮮甜，是螃蟹中的極品。"
  },
  "遠海梭子蟹": {
    name: "遠海梭子蟹",
    scientificName: "Portunus pelagicus",
    size: "10-20 cm (甲寬)",
    weight: "0.2-0.6 kg",
    habitat: "沙泥底質",
    description: "俗稱花蟹。體色有美麗的藍色花紋，肉質細緻鮮甜。"
  },
  "點帶石斑": {
    name: "點帶石斑",
    scientificName: "Epinephelus coioides",
    size: "30-80 cm",
    weight: "1-10 kg",
    habitat: "河口、岩礁",
    description: "俗稱紅斑。體側有橘紅色斑點，適應力強，肉質細嫩有彈性。"
  },
  "合齒魚科": {
    name: "狗母魚",
    scientificName: "Synodontidae",
    size: "20-40 cm",
    weight: "0.2-0.8 kg",
    habitat: "沙泥底質",
    description: "口大牙利，肉質鬆軟但細刺多，通常用來製作魚鬆或魚丸。"
  },
  "鱚科": {
    name: "沙鱚",
    scientificName: "Sillaginidae",
    size: "15-25 cm",
    weight: "0.1-0.3 kg",
    habitat: "沙岸淺海",
    description: "俗稱沙腸仔。體型細長，肉質潔白細緻，適合沾粉油炸（天婦羅）。"
  },
  "現流鮭": {
    name: "鮭魚",
    scientificName: "Salmonidae",
    size: "60-100 cm",
    weight: "5-15 kg",
    habitat: "溫帶冷水",
    description: "富含油脂與Omega-3，肉色橘紅，口感軟嫩，是極受歡迎的食用魚。"
  },
  "棕點石斑": {
    name: "棕點石斑",
    scientificName: "Epinephelus fuscoguttatus",
    size: "40-90 cm",
    weight: "2-15 kg",
    habitat: "珊瑚礁區",
    description: "俗稱老虎斑。體色棕黃有斑點，皮厚肉嫩，膠質豐富。"
  },
  "藍圓鰺": {
    name: "藍圓鰺",
    scientificName: "Decapterus maruadsi",
    size: "20-30 cm",
    weight: "0.2-0.5 kg",
    habitat: "沿岸",
    description: "俗稱硬尾。體型呈圓筒狀，產量大，常製成魚乾或魚餌，新鮮時可乾煎。"
  },
  "鮐魚科": {
    name: "白腹鯖",
    scientificName: "Scomber japonicus",
    size: "20-40 cm",
    weight: "0.3-0.8 kg",
    habitat: "沿岸、大洋",
    description: "俗稱花飛。肉質扎實，油脂豐富，適合鹽烤或味噌煮。"
  },
  "白腹鯖": {
    name: "白腹鯖",
    scientificName: "Scomber japonicus",
    size: "20-40 cm",
    weight: "0.3-0.8 kg",
    habitat: "沿岸、大洋",
    description: "背部花紋清晰，腹部銀白。是常見的食用魚，營養價值高。"
  },
  "雙鬚鰺科": {
    name: "秋姑魚",
    scientificName: "Mullidae",
    size: "15-30 cm",
    weight: "0.2-0.6 kg",
    habitat: "沙泥底、岩礁",
    description: "下巴有一對觸鬚，用來搜尋食物。肉質有蝦蟹香氣，味道獨特。"
  },
  "其他鯊": {
    name: "鯊魚條",
    scientificName: "Selachimorpha",
    size: "80-150 cm",
    weight: "5-30 kg",
    habitat: "近海",
    description: "小型鯊魚處理後的肉條，適合與芹菜、蒜苗一同快炒。"
  },
  "紅星梭子蟹": {
    name: "紅星梭子蟹",
    scientificName: "Portunus sanguinolentus",
    size: "10-20 cm",
    weight: "0.2-0.5 kg",
    habitat: "沙泥底質",
    description: "俗稱三點蟹。背甲有三個明顯紅點，殼薄肉細，價格親民。"
  },
  "銹斑蟳": {
    name: "銹斑蟳",
    scientificName: "Charybdis feriatus",
    size: "10-25 cm",
    weight: "0.3-1 kg",
    habitat: "岩礁、沙泥",
    description: "俗稱花蟹（與遠海梭子蟹混稱）。背甲有十字花紋，肉質鮮甜紮實。"
  },
  "其他蟳螯類": {
    name: "各式蟹類",
    scientificName: "Brachyura",
    size: "多樣",
    weight: "多樣",
    habitat: "多樣",
    description: "包含石蟳、饅頭蟹等其他蟹類。適合煮粥或爆炒。"
  }
};

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
  ["紅牙魚鯛", 366], ["金線魚", 120], ["鸚哥魚科", 221], ["大棘大眼鯛", 223], ["真鯊屬", 44], ["魟類", 72], ["章魚", 109], ["其他", 375],
  // Row 5
  ["其他笛鯛", 400], ["頻鯛科", 165], ["鸚哥魚科", 221], ["大棘大眼鯛", 349], ["龍蝦科", 1407], ["蝦姑", 339], ["鋸緣青蟹", 944], ["遠海梭子蟹", 141],
  // Row 6
  ["點帶石斑", 458], ["合齒魚科", 34], ["鱚科", 241], ["現流鮭", 22], ["棕點石斑", 480], ["藍圓鰺", 49], ["鮐魚科", 300], ["白腹鯖", 40],
  // Row 7
  ["鸚哥魚", 61], ["其他笛鯛", 48], ["雙鬚鰺科", 44], ["其他鯊", 44], ["烏賊", 194], ["紅星梭子蟹", 141], ["銹斑蟳", 141], ["其他蟳螯類", 141]
];

export const fishData: FishInfo[] = rawData.map((item, index) => {
  const row = Math.floor(index / 8);
  const col = index % 8;
  const name = item[0] as string;
  const price = item[1] as number;
  
  // Find details from database or use default
  const details = fishDatabase[name] || {
    name: name,
    scientificName: "N/A",
    size: "資料建置中",
    weight: "資料建置中",
    habitat: "海域",
    description: "這是一種美味的海洋生物，請使用編輯模式補充更多細節。"
  };

  // 網格參數校正 (Final tuned values)
  const START_LEFT = 16.5;     
  const COL_STEP = 8.2;        
  const ROW_TOPS = [15.3, 24.2, 33, 43, 52.8, 62.4, 72, 80.6];
  
  let top = ROW_TOPS[row];
  const left = START_LEFT + (col * COL_STEP);

  return {
    id: (index + 1).toString(),
    name: details.name, 
    price: `${price}元/公斤`,
    scientificName: details.scientificName,
    size: details.size,
    weight: details.weight,
    habitat: details.habitat,
    description: details.description,
    position: {
      top: Number(top.toFixed(1)),
      left: Number(left.toFixed(1)),
      width: 9,
      height: 5
    }
  };
});
