import { Router } from "express";
import {
  getPostByHashtagController,
  testController,
} from "../controllers/instagram";

const router = Router();
router.get("/", testController);
router.get("/post/hashtag/:hashtag", getPostByHashtagController);

export = router;
