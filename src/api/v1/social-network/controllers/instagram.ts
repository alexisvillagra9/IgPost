import { Request, Response } from "express";
import { getPostByHashtagHelper, scrap } from "../helpers/instagram";

export const getPostByHashtagController = async (
  req: Request,
  res: Response
) => {
  const {
    params: { hashtag },
  } = req;
  try {
    const response = await getPostByHashtagHelper(hashtag);
    res.json(response);
  } catch (error) {
    console.log(error)
    res.status(400).json(error);
  }
};

export const testController = async (req: Request, res: Response) => {
  try {
    await scrap();
    res.json({ ok: "Ok" });
  } catch (error) {
    res.status(400).json(error);
  }
};
