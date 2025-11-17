// config/nodemailer.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
    }
});

const sendMailRP = async (to, subject, html) => {
    try {
        const info = await transporter.sendMailRP({
            from: '"Vibe-U 🎓" <noreply@vibeu.com>',
            to,
            subject,
            html
        });
        console.log("📩 Email enviado:", info.messageId);
    } catch (error) {
        console.error("❌ Error enviando email:", error.message);
    }
};

// ------------------------------------------------------
// 🟣 RECUPERAR CONTRASEÑA
// ------------------------------------------------------
export const sendMailToRecoveryPassword = async (userMail, token) => {
    const urlRecovery = `${process.env.URL_FRONTEND}/recuperarpassword/${token}`;

    const html = `
        <h1>Vibe-U 💜</h1>
        <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>

        <p>Haz clic en el siguiente botón para continuar:</p>

        <a href="${urlRecovery}" style="background:#7c3aed;color:white;
           padding:10px 20px;text-decoration:none;border-radius:8px;font-weight:bold;">
           Restablecer contraseña
        </a>

        <br/><br/>
        <p>Si tú no solicitaste este cambio, simplemente ignora este mensaje.</p>
    `;

    await sendMailRP(userMail, "Restablece tu contraseña 🔒", html);
};

// Exportar la función genérica si quieres reutilizarla
export default sendMailRP;
