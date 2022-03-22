import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import FormData from "form-data";
import fs from "fs";

export const uploadFile = async (path: string) => {
  try {
    let data: any = new FormData();
    data.append("file", fs.createReadStream(path));
    data.append("folder", "/sooftweb");
    data.append("isPublic", "true");

    const config: AxiosRequestConfig = {
      method: "post",
      url: "https://cluster.uxshows.com/api/v2/misc/files/upload",
      headers: {
        "x-auth-token": "BEL_ap1pr0v1d3r2o2i",
        ...data.getHeaders(),
      },
      data: data,
    };

    const response: AxiosResponse = await axios(config);
    const { data: datares } = response;
    return datares;
  } catch (error) {
    throw error;
  }
};
