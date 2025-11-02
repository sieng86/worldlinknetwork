import express from "express";

import path from "path";

import { fileURLToPath } from "url";



const app = express();

app.use(express.json());



// 🧭 Giúp xác định thư mục hiện tại

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);



// ✅ Cho phép Pi Browser truy cập server

app.use((req, res, next) => {

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();

});



// ✅ File xác minh domain (Validation Key mới)

app.get("/validation-key.txt", (req, res) => {

  res.send(

    "b48014ec743d514ab33e37677098001ac37940103548fa21cb889e6147de69b5d6dcff7b3239cb61b8f1876e85fcebb26bd62150da83b7e1e2335009b984f928"

  );

});



// ✅ Serve giao diện chính

app.use(express.static(__dirname));



app.get("/", (req, res) => {

  res.sendFile(path.join(__dirname, "index.html"));

});



// ✅ Nhận dữ liệu payment test từ client

app.post("/api/complete_payment", async (req, res) => {

  const paymentData = req.body;

  console.log("💰 Received payment:", paymentData);

  try {

    res.json({

      status: "success",

      message: "✅ Payment simulated successfully (Testnet)",

    });

  } catch (err) {

    console.error("❌ Payment error:", err);

    res.status(500).json({ error: "Server error" });

  }

});



const PORT = process.env.PORT || 10000;

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

