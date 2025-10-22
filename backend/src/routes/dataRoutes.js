// backend/src/routes/dataRoutes.js
import express from "express";
import { getLocations, getImages } from "../controllers/dataController.js";

const router = express.Router();

// Rutas GET
router.get("/locations", getLocations);
router.get("/images", getImages);

export default router;
