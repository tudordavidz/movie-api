import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieRoutes from "./routes/movie.routes";
import { connectDB } from "./config/db";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(movieRoutes);

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
