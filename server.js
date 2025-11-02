import express from "express";

import fetch from "node-fetch";



const app = express();

app.use(express.json());



// ✅ Route xác minh domain

app.get("/validation-key.txt", (req, res) => {

  res.send("b48014ec743d514ab33e37677098001ac37940103548fa21cb889e6147de69b5d6dcff7b3239cb61b8f1876e85fcebb26bd62150da83b7e1e2335009b984f928");

});



// ✅ Route kiểm tra server

app.get("/", (req, res) => {

  res.send(`

    <html>

      <head>

        <title>WorldLink Network Testnet</title>

        <script src="https://sdk.minepi.com/pi-sdk.js"></script>

      </head>

      <body style="background-color:black;color:aqua;text-align:center;font-family:sans-serif;">

        <h2>🚀 WorldLink Network Testnet is Live!</h2>

        <p>Connected to Pi Testnet via Express Server</p>

        <button id="payBtn" style="background-color:gold;padding:10px 20px;border:none;border-radius:8px;font-weight:bold;">Pay with Pi</button>

        <p id="status"></p>



        <script>

          document.getElementById("payBtn").addEventListener("click", async () => {

            document.getElementById('status').innerText = '⏳ Initializing Pi SDK...';

            try {

              if (typeof Pi === "undefined") {

                throw new Error("Pi SDK not found. Please open in Pi Browser.");

              }



              Pi.init({ version: "2.0", sandbox: true });

              console.log("✅ Pi SDK initialized successfully.");

              console.log("Pi SDK loaded:", Pi);



              const payment = await Pi.createPayment({

                amount: 0.01,

                memo: "WorldLink Network Test Payment",

                metadata: { type: "test" },

                onReadyForServerApproval: (paymentId) => {

                  console.log("✅ Ready for server approval:", paymentId);

                },

                onReadyForServerCompletion: (paymentId, txid) => {

                  console.log("✅ Ready for server completion:", paymentId, txid);

                },

                onCancel: () => {

                  console.warn("❌ Payment cancelled by user.");

                  document.getElementById('status').innerText = '❌ Payment cancelled by user.';

                },

                onError: (error) => {

                  console.error("❌ Payment failed:", error);

                  document.getElementById('status').innerText = '❌ Payment failed: ' + error.message;

                },

              });



              document.getElementById('status').innerText = '✅ Payment created successfully!';

              console.log("✅ Payment object:", payment);



            } catch (err) {

              document.getElementById('status').innerText = '❌ Payment failed or cancelled';

              console.error("❌ Payment error:", err);

            }

          });

        </script>

      </body>

    </html>

  `);

});



// ✅ Khởi động server

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {

  console.log(`🚀 Server running on port ${PORT}`);

});

