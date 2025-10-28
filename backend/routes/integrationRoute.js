import express from "express";
import { Nango } from "@nangohq/node";
import dotenv from "dotenv";
dotenv.config();

const route = express.Router();
const nango = new Nango({ secretKey: process.env.NANGO_SECRET_KEY });

/**
 * Step 1: Create a Connect session to link a user's Google Calendar account.
 */
route.get("/connect", async (req, res) => {
    try {
        const connection = await nango.createConnectSession({
            end_user: {
                id: "test_dhiren_koshti",
            },
            allowed_integrations: [
                "google-calendar",
                "google-docs",
                "google-drive",
                "google-sheet",
            ],
        });
        console.log(connection.data)
        res.json({ url: connection.data.connect_link });
    } catch (error) {
        console.log(error.response.data.error);
        res.send("Error:", error?.data?.error);
    }
});

/**
 * Step 2: Webhook endpoint (Nango will POST here)
 */
route.post("/webhook", async (req, res) => {
    try {
        console.log("📩 Received webhook from Nango:");
        console.log(JSON.stringify(req.body, null, 2));

        // Handle different event types
        const event = req.body;

        if (event.type === "auth") {
            console.log(`✅ Connection created for user: ${event}`);
        } else if (event.type === "connection_updated") {
            console.log(`🔁 Connection updated: ${event.connection_id}`);
        }

        // Always send 200 response back to Nango
        res.sendStatus(200);
    } catch (error) {
        console.error("❌ Error handling webhook:", error);
        res.sendStatus(500);
    }
});


export default route;
