import express from "express";
import { createCategory } from "../controllers/categoryController.js";
import upload from "../middlewares/multer.middleware.js";
const router = express.Router();

router.post("/", upload.single('icon') ,createCategory);

export default router;
