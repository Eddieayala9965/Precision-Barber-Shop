import React from "react";
import ReactDOM from "react-dom/client";
import LoadingProvider from "./context/LoadingContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </React.StrictMode>
);
