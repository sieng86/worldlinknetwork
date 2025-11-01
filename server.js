import express from "express";

import fetch from "node-fetch";

import cors from "cors";

import http from "http";



const app = express();

app.use(cors());

app.use(express.json());



// ✅ Route xác minh domain

app.get("/validation-key.txt", (req, res) => {

  res.send("b48014ec743d514ab33e37677098001ac37940103548fa21cb889e6147de69b5d6dcff7b3239cb61b8f1876e85fcebb26bd62150da83b7e1e2335009b984f928");

});



// ✅ Route kiểm tra server hoạt động

app.get("/", (req, res) => {

  res.send(`

    <h2>🚀 WorldLink Network Testnet is Live!</h2>

    <p>Connected to Pi Testnet via Express Server</p>

    <button onclick="pay()">Pay with Pi</button>

    <p id="status"></p>



    <script src="https://sdk.minepi.com/pi-sdk.js"></script>

    <script>

      console.log("✅ Pi SDK script loaded."); // log khi SDK tải

      setTimeout(() => {

        if (typeof Pi === "undefined") {

          console.error("❌ Pi SDK not loaded. Make sure you are in Pi Browser.");

          document.getElementById('status').innerText = '❌ Pi SDK not loaded. Please open in Pi Browser.';

        } else {

          console.log("Pi SDK loaded:", Pi);

        }

      }, 2000);



      async function pay() {

        document.getElementById('status').innerText = '⏳ Initializing Pi SDK...';

        try {

          if (typeof Pi === "undefined") {

            throw new Error("Pi SDK not found. Please open in Pi Browser.");

          }



          Pi.init({ version: "2.0", sandbox: true });

          console.log("✅ Pi SDK initialized successfully.");



          const payment = await Pi.createPayment({

            amount: 0.01,

            memo: "WorldLink Network Test Payment",

            metadata: { type: "test" },

          });



          document.getElementById('status').innerText = '✅ Payment created successfully!';

          console.log("✅ Payment object:", payment);

        } catch (err) {

          document.getElementById('status').innerText = '❌ Payment failed or cancelled';

          console.error("❌ Payment error:", err);

        }

      }

    </script>

  `);

});



// ✅ Route xử lý payment qua backend

app.post("/create_payment", async (req, res) => {

  try {

    const paymentData = {

      amount: 0.01,

      memo: "WorldLink Network Test Payment",

      metadata: { type: "test" },

    };



    const response = await fetch("https://api.minepi.com/v2/payments", {

      method: "POST",

      headers: {

        "Authorization": \`Key \${process.env.PI_API_KEY}\`,

        "Content-Type": "application/json",

      },

      body: JSON.stringify(paymentData),

    });



    const data = await response.json();

    console.log("✅ Payment backend response:", data);

    res.json(data);

  } catch (error) {

    console.error("❌ Payment backend error:", error);

    res.status(500).json({ error: "Payment failed" });

  }

});



const PORT = process.env.PORT || 10000;

const server = http.createServer(app);

server.listen(PORT, () => console.log(\`✅ Server running on port \${PORT}\`));

