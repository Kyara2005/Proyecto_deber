// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usuarioRouter from "./routers/usuario_routes.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const app = express();

// ================================
// ✅ CORS: Local + Producción
// ================================
const allowedOrigins = [
  "http://localhost:3000",               // frontend local
  process.env.URL_FRONTEND                // frontend producción
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // Postman o scripts sin origin
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error("CORS no permitido"), false);
    }
    return callback(null, true);
  },
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true
}));

// ================================
// Middleware
// ================================
app.use(express.json({ limit: "10mb" })); // límite aumentado por imágenes grandes

// ================================
// Configuración de Cloudinary
// ================================
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ================================
// Rutas
// ================================
app.get("/", (req, res) => res.send("Server on"));
app.use("/api/usuarios", usuarioRouter);

// ================================
// Preflight OPTIONS
// ================================
app.options("*", cors());

// ================================
// Conexión a MongoDB
// ================================
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB conectado"))
.catch((err) => {
  console.error("Error MongoDB:", err.message);
  process.exit(1);
});

// ================================
// Puerto
// ================================
const PORT = process.env.PORT || 8000; // Koyeb asigna process.env.PORT
app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
