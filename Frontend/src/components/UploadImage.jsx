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
import { supabase } from "../utils/Supabase";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useEffect } from "react";

const UploadImage = () => {
  const [uppy] = useState(() =>
    new Uppy({
      restrictions: {
        maxNumberOfFiles: 9,
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
      bucketName: "img",
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
        <Button
          sx={{ width: 100 }}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:p-4 md:p-8 sm:max-w-screen-sm md:max-w-screen-lg flex flex-col justify-center items-center">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="flex flex-wrap">Gallery Upload</DialogTitle>
          <DialogDescription className="flex flex-wrap">
            Begin uploading your images
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

export default UploadImage;