import { FishMap } from './components/FishMap';

function App() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center gap-8">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-800 tracking-widest">
          海洋鮮味市集
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          探索各式各樣的海洋珍味。移動滑鼠到魚類上方，查看詳細的博物館級介紹。
        </p>
      </header>

      <main className="w-full flex justify-center">
        <FishMap />
      </main>

      <footer className="text-slate-400 text-sm mt-12">
        © 2024 Fish Market Museum Guide
      </footer>
    </div>
  );
}

export default App;
