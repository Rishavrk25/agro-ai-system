import { io } from "socket.io-client";
import { useEffect } from "react";

const socket = io("http://localhost:5000");

useEffect(() => {
  socket.on("shipmentCreated", (data) => {
    console.log("New shipment:", data);
  });
}, []);