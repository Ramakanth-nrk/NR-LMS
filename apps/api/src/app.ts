import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authenticationRoutes from "./modules/authentication/routes/authentication.routes";


const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", authenticationRoutes);

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NR LMS API is running 🚀",
  });
});

export default app;