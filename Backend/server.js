import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";
import { Server } from "socket.io";
import http from "http";
import { simulate } from "./controllers/simulationController.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

//-------------- Socket server --------------------
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
// make io accessible globally
app.set("io", io);
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//---------------------------------------------------

// db connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // converts JSON → JavaScript object

// Test routes
app.get("/", (req, res) => {
  res.send("Agro AI System API is running");
});

// Routes
app.use("/api/shipments", shipmentRoutes);

// simulation
app.post("/api/simulate", simulate);
