import React, { useEffect } from "react";
import { socket } from "./services/socket";

const App = () => {

  useEffect(() => {
    socket.on("shipmentCreated", (data) => {
      console.log("New shipment:", data);
    });
  }, []);

  return <div>App</div>;
};

export default App;
