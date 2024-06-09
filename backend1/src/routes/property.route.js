import express from "express";
import {
  getProperty,
  getProperties,
  createProperty,
} from "../controllers/property.controller.js";

const router = express.Router();

router.get("/get/:id", getProperty);
router.get("/get", getProperties);
router.post("/create", createProperty);

export default router;
