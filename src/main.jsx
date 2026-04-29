import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import bg from "./assets/vet.png";

document.body.style.background = `
  linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)),
  url(${bg}) no-repeat center right/cover
`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);