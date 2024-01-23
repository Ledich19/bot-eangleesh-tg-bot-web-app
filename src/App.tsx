import { useEffect } from "react";
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
    </>
  );
}

export default App;
