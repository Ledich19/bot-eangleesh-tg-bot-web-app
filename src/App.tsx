import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Game from "./components/Game/Game";
import Winners from "./components/Winners/Winners";
const tg = window.Telegram.WebApp;

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
      };
    };
  }
}

function App() {
  const [count, setCount] = useState(0);
  console.log(window.Telegram.WebApp);

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <>
    <Header/>
    <Routes>
      <Route index element={<Game/>}/>
      <Route path="/winners" element={<Winners/>}/>
    </Routes>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
