import express from "express";
import {
  sendRequest,
  getRequest,
  updateRequest,
  deleteRequest,
  getRequestsByUser,
} from "../controllers/request.controller.js";

import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Route to send a new request
router.post("/", verifyToken, sendRequest);

// Route to get a specific request by ID
router.get("/:id", verifyToken, getRequest);

// Route to update a specific request by ID
router.put("/:id", verifyToken, updateRequest);

// Route to delete a specific request by ID
router.delete("/:id", verifyToken, deleteRequest);
router.get("/user/:userId", verifyToken, getRequestsByUser);

export default router;
