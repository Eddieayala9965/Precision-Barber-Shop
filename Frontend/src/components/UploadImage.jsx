import { useEffect, useState } from "react";
import { supabase } from "../utils/Supabase";
import { v4 as uuidv4 } from "uuid";

const UploadImage = () => {
  const [userId, setUserId] = useState("");
  const [media, setMedia] = useState([]);

  const getUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user !== null) {
        setUserId(user.id);
      } else {
        setUserId("");
      }
    } catch (e) {
      console.log(e);
    }
  };

  async function uploadImage(e) {
    let file = e.target.files[0];

    const { data, error } = await supabase.storage
      .from("gallery")
      .upload(userId + "/" + uuidv4(), file);

    if (data) {
      getMedia();
    } else {
      console.log(error);
    }
  }

  async function getMedia() {
    const { data, error } = await supabase.storage
      .from("gallery")
      .list(userId + "/", {
        limit: 10,
        offset: 0,
        sortBy: {
          column: "name",
          order: "asc",
        },
      });

    if (data) {
      setMedia(data);
    } else {
      console.log("Error fetching media:", error);
    }
  }

  useEffect(() => {
    getUser();
    getMedia();
  }, [userId]);

  return (
    <div className="mt-5">
      <input type="file" onChange={(e) => uploadImage(e)} />
      <div className="mt-5">My Uploads</div>

      {media.map((item) => {
        return (
          <div key={item.id}>
            <img
              src={`https://juowekkvvwyquoqoarfr.supabase.co/storage/v1/object/public/gallery/d3b44b10-8842-4d5d-8064-06b2c6f97a21/Elbee.png/${item.name}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default UploadImage;
