import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usuarioRouter from "./routers/usuario_routes.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const app = express();

// ================================
// ✅ CORS (LOCAL + PRODUCCIÓN)
// ================================
const allowedOrigins = [
  // 🔥 producción
  "https://vibe-y91z.onrender.com",
  "https://vibe-eight-delta.vercel.app",
  process.env.URL_FRONTEND,

  // 🔥 local
  "http://localhost:5173",
  "http://127.0.0.1:5173"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Postman / server-to-server
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS bloqueado: " + origin));
  },
  credentials: true
}));

// ✅ IMPORTANTE: preflight OPTIONS
app.options("*", cors());

// ================================
// ✅ Middlewares
// ================================
app.use(express.json({ limit: "10mb" }));

// ================================
// ✅ Cloudinary
// ================================
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ================================
// ✅ MongoDB
// ================================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.error("❌ Error en MongoDB:", err));

// ================================
// ✅ Rutas
// ================================
app.get("/", (req, res) => res.send("🚀 Backend funcionando"));
app.use("/api/usuarios", usuarioRouter);

// ================================
// ✅ 404
// ================================
app.use((req, res) => {
  res.status(404).json({ msg: "404 | Endpoint no encontrado" });
});

// ================================
// ✅ Manejo de errores CORS (opcional para debug)
// ================================
app.use((err, req, res, next) => {
  if (err.message.startsWith("CORS bloqueado")) {
    console.warn(err.message); // Log en consola
    return res.status(403).json({ msg: err.message }); // Mensaje claro al frontend
  }
  next(err);
});

// ================================
// ✅ Servidor
// ================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
