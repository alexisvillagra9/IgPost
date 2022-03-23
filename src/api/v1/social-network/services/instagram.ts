import axios from "axios";

export const getPostByHashtagService = async (hashtag: string) => {
  try {
    const response = await axios.get(
      `https://www.instagram.com/explore/tags/${hashtag}/?__a=1`,
      {
        headers: {
          Cookie:
            "csrftoken=WCUH1ZuhSe5LRXYSqnIF6Nhf1V6f0ULX; ig_did=85A30C25-36D2-41EA-A1A3-5F69768E9537; ig_nrcb=1; mid=YjpqywAEAAFvn42IvZIMRJD3CQ5G",
        },
        proxy: false,
      }
    );
    const { data: post } = response;
    return post;
  } catch (error) {
    console.log("Error en axios", error);
    throw error;
  }
};
