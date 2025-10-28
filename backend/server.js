import express from "express";
import cors from "cors";
import integrationRoute from "./routes/integrationRoute.js";

const app = express();

const port = 3002; // Or any other desired port
app.use(express.json());

// ✅ Allow frontend at 5173 to access backend
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use("/integration",integrationRoute)

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
