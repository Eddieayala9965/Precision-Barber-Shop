import { supabase } from "../utils/Supabase";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";

const Avatars = () => {
  const [avatar, setAvatar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      const userId = localStorage.getItem("user_id");
      const token = localStorage.getItem("access_token");
      console.log("Fetching avatar for user:", userId);

      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .list(userId, {
            limit: 1,
            offset: 0,
            sortBy: {
              column: "name",
              order: "desc",
            },
          });
        console.log("Fetched data:", data);
        if (error) throw error;
        setAvatar(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching avatar:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const userId = localStorage.getItem("user_id");
  const supbaseUrl =
    "https://juowekkvvwyquoqoarfr.supabase.co/storage/v1/object/public/avatars";
  console.log("Gallery State:", avatar);

  return (
    <>
      {avatar.map((item, index) => (
        <Avatar
          key={index}
          sx={{
            position: "absolute",
            width: 80,
            height: 80,
            bottom: 48,
            left: "50%",
            transform: "translateX(-50%)",
          }}
          src={`${supbaseUrl}/${userId}/${item.name}`}
        />
      ))}
    </>
  );
};

export default Avatars;
