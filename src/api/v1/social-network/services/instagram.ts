import axios from "axios";

export const getPostByHashtagService = async (hashtag: string) => {
  try {
    const response = await axios.get(
      `https://www.instagram.com/explore/tags/${hashtag}/?__a=1`
    );
    const { data: post } = response;
    return post;
  } catch (error) {
    console.log("Error en axios", error);
    throw error;
  }
};
