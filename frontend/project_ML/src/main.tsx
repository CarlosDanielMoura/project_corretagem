import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Header } from "./components/header.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header />
    <App />
  </StrictMode>
);
