import Tus from "@uppy/tus";
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
import Button from "@mui/material/Button";
import Avatars from "../components/Avatars";
import { supabase } from "../utils/Supabase";
import { useState, useEffect } from "react";
const UploadAvatar = () => {
  const [uppy] = useState(() =>
    new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ["image/*"],
        maxFileSize: 5 * 1000 * 1000,
      },
    }).use(Tus, {
      endpoint:
        import.meta.env.VITE_SUPABASE_URL + "/storage/v1/upload/resumable",

      allowedMetaFields: [
        "bucketName",
        "objectName",
        "contentType",
        "cacheControl",
      ],
      onBeforeRequest: async (req) => {
        const token = localStorage.getItem("access_token");
        req.setHeader("Authorization", `Bearer ${token}`);
      },
    })
  );
  uppy.on("file-added", (file) => {
    uppy.setFileMeta(file.id, {
      bucketName: "avatars",
      contentType: file.type,
    });
  });

  const handleUpload = () => {
    uppy.setFileMeta(uppy.getFiles()[0].id, {
      objectName:
        `${localStorage.getItem("user_id")}` + "/" + uppy.getFiles()[0].name,
    });
    uppy.upload();
  };

  return (
    <Dialog className="sm:p-4 md:p-8">
      <DialogTrigger className="flex align-start">
        <button>
          <Avatars />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:p-4 md:p-8 sm:max-w-screen-sm md:max-w-screen-lg flex flex-col justify-center items-center">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="flex flex-wrap">Avatar Upload</DialogTitle>
          <DialogDescription className="flex flex-wrap">
            Begin uploading your avatar
          </DialogDescription>
          <Dashboard className="custom-width" uppy={uppy} hideUploadButton />
        </DialogHeader>
        <Button onClick={handleUpload} variant="contained" className=" w-2/5">
          Upload
        </Button>
      </DialogContent>
    </Dialog>
  );
};
export default UploadAvatar;