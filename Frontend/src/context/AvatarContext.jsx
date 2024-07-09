import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAvatar } from "../utils/AvatarApi";
import Cookies from "js-cookie";

const AvatarContext = createContext();

export const useAvatar = () => useContext(AvatarContext);

export const AvatarProvider = ({ children }) => {
  const userId = Cookies.get("user_id");
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
