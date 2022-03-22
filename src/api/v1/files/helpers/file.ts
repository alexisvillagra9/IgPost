import axios from "axios";
import fs from "fs";
import { uploadFile } from "./services/file";

export const createCacheImage = async (url: string, imgId: string) => {
  try {
    const cacheFolder = "./cache/";
    if (!fs.existsSync(cacheFolder)) {
      fs.mkdirSync(cacheFolder);
    }

    const path = cacheFolder + imgId + ".jpg";

    if (!fs.existsSync(path)) {
      console.log("no existe");
      const writer = fs.createWriteStream(path);
      const image = await axios.get(url, {
        responseType: "stream",
      });
      await image.data.pipe(writer);
    }
    const imageS3 = await uploadFile(path);
    return imageS3.Location;
    // fs.unlinkSync(path);
  } catch (error) {
    throw error;
  }
};
