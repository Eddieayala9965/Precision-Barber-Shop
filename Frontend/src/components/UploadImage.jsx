// import { useEffect, useState } from "react";
// import { supabase } from "../utils/Supabase";
// import { v4 as uuidv4 } from "uuid";

// const UploadImage = () => {
//   const [userId, setUserId] = useState("");
//   const [media, setMedia] = useState([]);

//   const getUser = async () => {
//     try {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       if (user !== null) {
//         setUserId(user.id);
//       } else {
//         setUserId("");
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   async function uploadImage(e) {
//     let file = e.target.files[0];

//     const { data, error } = await supabase.storage
//       .from("img")
//       .upload(`${userId}/${uuidv4()}`, file);

//     if (data) {
//       getMedia();
//     } else {
//       console.log(error);
//     }
//   }

//   async function getMedia() {
//     const { data, error } = await supabase.storage
//       .from("img")
//       .list(userId + "/", {
//         limit: 10,
//         offset: 0,
//         sortBy: {
//           column: "name",
//           order: "asc",
//         },
//       });

//     if (data) {
//       setMedia(data);
//     } else {
//       console.log("Error fetching media:", error);
//     }
//   }

//   useEffect(() => {
//     getUser();
//     getMedia();
//   }, [userId]);

//   return (
//     <div className="mt-5">
//       <input type="file" onChange={(e) => uploadImage(e)} />
//       <div className="mt-5">My Uploads</div>

//       {media.map((item) => {
//         return (
//           <div key={item.id}>
//             <img src={`d3b44b10-8842-4d5d-8064-06b2c6f97a21/${item.name}`} />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default UploadImage;

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

import { useState, useEffect } from "react";

const UploadImage = () => {
  const [uppy] = useState(() => new Uppy());
  return (
    <Dialog>
      <DialogTrigger>
        <button id="upload-trigger"></button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        {/*  */}
        <div>
          <Dashboard uppy={uppy} />;
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadImage;
