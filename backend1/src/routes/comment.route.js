import express from "express";
import { addComment, getComments } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/", verifyToken, addComment);
router.get("/:propertyId", getComments);

export default router;
