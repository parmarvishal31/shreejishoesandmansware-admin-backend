import express from "express";
import {
  createCategory,
  getCategory,
} from "../controllers/categoryController.js";
import upload from "../middlewares/multer.middleware.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", isLoggedIn, getCategory);
router.post("/", upload.single("icon"), createCategory);

export default router;
