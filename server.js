import express from "express";

import fetch from "node-fetch";



const app = express();

app.use(express.json());



// ✅ Cho phép Pi Browser truy cập server

app.use((req, res, next) => {

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();

});



// ✅ File xác minh domain (bắt buộc)

app.get("/validation-key.txt", (req, res) => {

  res.send(

    "b48014ec743d514ab33e37677098001ac37940103548fa21cb889e6147de69b5d6dcff7b3239cb61b8f1876e85fcebb26bd62150da83b7e1e2335009b984f928"

  );

});



// ✅ Route kiểm tra server

app.get("/", (req, res) => {

  res.send("🚀 WorldLink Network Testnet Server is Running!");

});



// ✅ Route giả lập xử lý thanh toán

app.post("/api/complete_payment", async (req, res) => {

  const paymentData = req.body;

  console.log("💰 Received payment request:", paymentData);

  try {

    res.json({

      status: "success",

      message: "✅ Payment processed successfully (Testnet simulation)",

    });

  } catch (error) {

    console.error("❌ Payment processing failed:", error);

    res.status(500).json({ error: "Internal Server Error" });

  }

});



const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {

  console.log(`✅ Server running on port ${PORT}`);

});

