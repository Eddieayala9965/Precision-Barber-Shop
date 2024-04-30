import React, { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
