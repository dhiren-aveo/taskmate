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

/**
 * Step 3: Calandars List
 */
route.get("/calendar/list", async (req, res) => {
  try {
    const userId = req.query.userId; // Or from JWT
    const providerConfigKey = "google-calendar";

    // ✅ Fetch all calendars from Google API
    const response = await nango.get({
       connectionId: "8cb241a0-2b14-49e8-92c6-8420cd229023",
      providerConfigKey: "google-calendar",
      endpoint: "/calendar/v3/users/me/calendarList",
    });

    res.json(response.data.items);
  } catch (error) {
    console.error("❌ Error fetching calendars:", error.response?.data || error);
    res.status(500).json({ error: "Failed to fetch calendars" });
  }
});

/**
 * Step 4: Get calandar events
 */
route.get("/calendar/events", async (req, res) => {
  try {
    const response = await nango.get({
      connectionId: "8cb241a0-2b14-49e8-92c6-8420cd229023",
      providerConfigKey: "google-calendar",
      endpoint: "/calendar/v3/calendars/primary/events"
    });

    res.json(response.data);
  } catch (error) {
    console.error("❌ Error fetching events:", error.response?.data || error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

/**
 * Step 5: Add calandar events
 */
route.post("/calendar/event", async (req, res) => {
  try {
    const eventBody = {
      summary: "Team Sync",
      description: "Weekly check-in meeting",
      start: { dateTime: "2025-10-29T10:00:00+05:30" },
      end: { dateTime: "2025-10-29T11:00:00+05:30" },
    };

    const response = await nango.post({
      connectionId: "8cb241a0-2b14-49e8-92c6-8420cd229023",
      providerConfigKey: "google-calendar",
      endpoint: "/calendar/v3/calendars/primary/events",
      data: eventBody
    });

    res.json(response.data);
  } catch (error) {
    console.error("❌ Error creating event:", error.response?.data || error);
    res.status(500).json({ error: "Failed to create event" });
  }
});

export default route;
