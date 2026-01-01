import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import stationRoutes from './routes/stationRoutes.js';
import mixingGroupRoutes from './routes/mixingGroupRoutes.js';
import mixingRoutes from './routes/mixingRoutes.js';
import varietyRoutes from './routes/varietyRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/mixing-groups", mixingGroupRoutes);
app.use("/api/mixings", mixingRoutes);
app.use("/api/varieties", varietyRoutes);

export default app;
