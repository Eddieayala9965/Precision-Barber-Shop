import { useAvatar } from "../context/AvatarContext";
import Avatar from "@mui/material/Avatar";

const Avatars = () => {
  const { avatar, isLoading, error } = useAvatar();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const userId = localStorage.getItem("user_id");
  const supbaseUrl = import.meta.env.VITE_SUPERBASE_BUCKET_AVATARS;

  return (
    <>
      {avatar.length > 0 ? (
        avatar.map((item, index) => (
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
            alt={"Avatar"}
          />
        ))
      ) : (
        <Avatar
          sx={{
            position: "absolute",
            width: 80,
            height: 80,
            bottom: 48,
            left: "50%",
            transform: "translateX(-50%)",
          }}
          alt={"Avatar"}
        />
      )}
    </>
  );
};

export default Avatars;
