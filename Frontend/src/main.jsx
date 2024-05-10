import React from "react";
import ReactDOM from "react-dom/client";
import LoadingProvider from "./context/LoadingContext";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
