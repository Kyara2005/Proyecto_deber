// models/Usuario.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String },
  correoInstitucional: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, default: "estudiante" },
  token: { type: String, default: null },          // token temporal para confirmar cuenta
  confirmEmail: { type: Boolean, default: false }, // correo confirmado
  resetToken: { type: String, default: null },     // token para reset password
  resetTokenExpire: { type: Date, default: null }  // expiración del token de reset
}, { timestamps: true });


// ==============================================
// 🔐 ENCRIPTAR LA CONTRASEÑA
// ==============================================
usuarioSchema.methods.encryptPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};


// ==============================================
// 🔍 COMPARAR CONTRASEÑA PARA LOGIN
// ==============================================
usuarioSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};


// ==============================================
// 🔑 TOKEN PARA LOGIN (JWT NORMAL)
// ==============================================
usuarioSchema.methods.createJWT = function() {
  return jwt.sign(
    {
      id: this._id,
      nombre: this.nombre,
      correo: this.correoInstitucional,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};


// ==============================================
// 🔑 TOKEN TEMPORAL (CONFIRMAR / RECUPERAR)
// ==============================================
usuarioSchema.methods.createToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};


export default mongoose.model("Usuario", usuarioSchema);
