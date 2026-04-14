const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// 📩 EMAIL ROUTE
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // ✅ transporter INSIDE route (correct)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    let mailOptions = {
      from: process.env.EMAIL_USER, // safer than user email
      to: process.env.EMAIL_USER,
      subject: `Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send("Message sent successfully");

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).send("Error sending message");
  }
});

// ✅ SERVER START
app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});