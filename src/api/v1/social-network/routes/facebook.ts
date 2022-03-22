import { Router } from "express";

const router = Router();
router.get("/", () => console.log("funciono"));

export = router;
