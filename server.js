import express from "express";

import fetch from "node-fetch";



const app = express();

app.use(express.json());



// ✅ Route xác minh domain

app.get("/validation-key.txt", (req, res) => {

  res.send("b48014ec743d514ab33e37677098001ac3794c"); // Đừng đổi giá trị nếu Pi yêu cầu xác minh

});



// ✅ Kiểm tra server

app.get("/", (req, res) => {

  res.send("🚀 WorldLink Network Testnet Server is Running!");

});



// ✅ Approve payment (bắt buộc có)

app.post("/approve_payment", async (req, res) => {

  try {

    const paymentId = req.body.paymentId;

    console.log("🟡 Approving payment:", paymentId);



    // Gửi request lên Pi API Testnet

    const response = await fetch("https://api.minepi.com/v2/payments/" + paymentId + "/approve", {

      method: "POST",

      headers: {

        "Authorization": `Key ${process.env.PI_API_KEY}`, // dùng API key Testnet của bạn

        "Content-Type": "application/json"

      },

    });



    const data = await response.json();

    console.log("✅ Payment approved:", data);

    res.json({ status: "ok", data });

  } catch (err) {

    console.error("❌ Error approving payment:", err);

    res.status(500).json({ error: "Approval failed", details: err.message });

  }

});



// ✅ Complete payment

app.post("/complete_payment", async (req, res) => {

  try {

    const { paymentId, txid } = req.body;

    console.log("🟢 Completing payment:", paymentId, txid);



    const response = await fetch("https://api.minepi.com/v2/payments/" + paymentId + "/complete", {

      method: "POST",

      headers: {

        "Authorization": `Key ${process.env.PI_API_KEY}`,

        "Content-Type": "application/json"

      },

    });



    const data = await response.json();

    console.log("✅ Payment completed:", data);

    res.json({ status: "completed", data });

  } catch (err) {

    console.error("❌ Error completing payment:", err);

    res.status(500).json({ error: "Completion failed", details: err.message });

  }

});



const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {

  console.log(`🚀 Server running on port ${PORT}`);

});

