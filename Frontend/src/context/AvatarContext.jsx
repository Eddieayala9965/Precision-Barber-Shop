import React, { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAvatar } from "../utils/AvatarApi";

const AvatarContext = createContext();

export const useAvatar = () => useContext(AvatarContext);

export const AvatarProvider = ({ children }) => {
  const userId = localStorage.getItem("user_id");
  const {
    data: avatar,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["avatar", userId],
    queryFn: () => fetchAvatar(userId),
  });

  return (
    <AvatarContext.Provider value={{ avatar, refetch, isLoading, error }}>
      {children}
    </AvatarContext.Provider>
  );
};
