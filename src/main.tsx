import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { TempoDevtools } from "tempo-devtools";
import { useThemeStore } from "./lib/store/themeStore";

// Initialize theme
document.documentElement.classList.add("dark");
document.documentElement.style.setProperty(
  "--accent-color",
  useThemeStore.getState().accentColor,
);

TempoDevtools.init();

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
