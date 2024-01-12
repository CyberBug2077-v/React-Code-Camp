import React, { useState } from 'react';
import {Main} from "./views/Main/main";
import './App.css';

function App() {
  const [view, setView] = useState("main");
  return (
  <div style={{width: "100vw"}}>
    <main className="p-4 d-flex w-100 justify-content-center">
      {view === "main" && <Main />}
    </main>
    </div>
  );
}

export default App;
