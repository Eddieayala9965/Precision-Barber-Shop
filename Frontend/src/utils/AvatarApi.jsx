import { supabase } from "../utils/Supabase";

export const fetchAvatar = async (userId) => {
  const { data, error } = await supabase.storage.from("avatars").list(userId, {
    limit: 1,
    offset: 0,
    sortBy: { column: "name", order: "desc" },
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
