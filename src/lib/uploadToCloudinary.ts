import { cloudinary } from "./cloudinary"; // your config path
import { NextRequest } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";

const uploadToCloudinary = (
  fileUri: string,
  fileName: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        resource_type: "auto",
        folder: "/msbtequizproimages/", // any sub-folder name in your cloud
      })
      .then((result) => {
        resolve({ success: true, result });
      })
      .catch((error) => {
        reject({ success: false, error });
      });
  });
};

export default uploadToCloudinary;
