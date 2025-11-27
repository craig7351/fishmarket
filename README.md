# 🐟 海洋鮮味市集 (Fish Market)

一個互動式的海洋生物圖鑑前端專案，展示了 64 種常見的魚類與海洋生物。透過滑鼠互動，使用者可以探索每種魚類的詳細資訊，包含名稱、價格、學名、尺寸、重量、棲息地與詳細介紹。

![Project Screenshot](public/img/fish.png)

## ✨ 特色功能

- **互動式圖鑑**：滑鼠懸停於魚類圖片上時，會自動顯示詳細資訊卡片。
- **動態定位**：懸浮視窗會根據魚類在畫面中的位置，智慧調整顯示在上方或下方，確保內容不被遮擋。
- **局部放大預覽**：懸浮視窗內會自動裁切並放大顯示該魚類的原始圖片。
- **魚類大小比一比**：提供全螢幕的互動動畫，將魚類按實際最大尺寸由小至大排列展示，讓使用者直觀感受體型差異。
- **除錯與編輯模式 (Debug Mode)**：
  - 可即時在網頁上調整每隻魚的感應區域 (Hotspot) 位置與大小。
  - 支援將調整後的數據導出為 JSON。
- **響應式設計**：基於百分比的定位系統，適應不同螢幕尺寸。

## 🛠️ 技術棧

- **框架**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **語言**: [TypeScript](https://www.typescriptlang.org/)
- **樣式**: [Tailwind CSS v4](https://tailwindcss.com/)
- **動畫**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 啟動開發伺服器

#### 方法一：使用批次檔（Windows）

專案提供了便捷的批次檔來管理開發伺服器：

- **`start.bat`** - 啟動開發伺服器
  - 自動檢查 Node.js 和依賴
  - 檢查端口是否被占用
  - 自動安裝依賴（如果需要的話）

- **`stop.bat`** - 停止開發伺服器
  - 停止使用端口 5173 的進程
  - 可選停止所有 Node.js 進程

- **`server_status.bat`** - 檢查伺服器狀態
  - 顯示端口 5173 的使用情況
  - 顯示相關的 Node.js 進程信息

#### 方法二：使用 npm 命令

```bash
npm run dev
```

啟動後，開啟瀏覽器訪問終端機顯示的 URL (通常是 `http://localhost:5173`)。

### 3. 建置生產版本

```bash
npm run build
```

## 🌐 部署到 Render

本專案已配置好 Render 部署設定，可以輕鬆部署到 Render 平台。

### 使用 render.yaml 自動部署

1. 將專案推送到 GitHub 或 GitLab
2. 登入 [Render](https://render.com/)
3. 點擊「New +」→「Static Site」
4. 連接你的 Git 儲存庫
5. Render 會自動偵測 `render.yaml` 配置：
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
6. 點擊「Create Static Site」完成部署

### 手動配置（不使用 render.yaml）

如果選擇手動配置，請在 Render 控制台設定：

- **Name**: `fish-market`（或自訂名稱）
- **Environment**: `Static Site`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

### 注意事項

- Render 會自動處理 React Router 的路由重寫（已配置在 `render.yaml` 中）
- 部署後，Render 會提供一個免費的 `.onrender.com` 網域
- 可以自訂網域或使用 Render 提供的網域

## 📂 專案結構

```
src/
├── components/
│   ├── FishMap.tsx           # 主地圖組件，處理熱點與互動邏輯
│   ├── FishTooltip.tsx       # 懸浮詳細資訊卡片
│   └── FishSizeComparator.tsx # 魚類大小比較動畫組件
├── data/
│   ├── fishData.ts           # 魚類資料庫與位置定義
│   └── fishSizeRank.json     # 魚類尺寸排名數據 (供比較動畫使用)
└── App.tsx                   # 應用程式入口
```

## 📝 編輯模式使用說明

1. 在網頁右下角切換至「編輯模式 (Debug)」。
2. 點擊畫面上的綠色框框選取魚類。
3. 使用右側出現的面板調整 `Top`, `Left`, `Width`, `Height` 數值。
4. 調整滿意後，點擊「複製 JSON」按鈕。
5. 將複製的內容覆蓋至 `src/data/fishData.ts` 中的數據。

## 📊 資料來源

本專案的魚類價格資料來源於：

- **臺中市各魚種平均價格表** - [政府資料開放平臺](https://data.gov.tw/dataset/168513)
  - 提供機關：臺中市政府農業局
  - 資料來源：臺中區漁會提供之臺中市梧棲漁港魚類平均價格
  - 授權方式：政府資料開放授權條款-第1版

## 📄 授權

MIT License
