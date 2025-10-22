import express from "express";
import cors from "cors";
import { trackDevice } from './middlewares/deviceTracker.js';
import analyticsRoutes from './routes/analytics.js';
import authRoutes from "./routes/authRoutes.js";
import dataRoutes from "./routes/dataRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(trackDevice);
// Prefijo para rutas de autenticación
app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);
app.use('/api/analytics', analyticsRoutes);

export default app;
