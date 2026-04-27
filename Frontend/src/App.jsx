import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FindMandi from "./pages/FindMandi";
import Results from "./pages/Results";
import Confirm from "./pages/Confirm";
import Prices from "./pages/Prices";
import Weather from "./pages/Weather";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-mandi" element={<FindMandi />} />
        <Route path="/find-mandi/results" element={<Results />} />
        <Route path="/find-mandi/confirm" element={<Confirm />} />
        <Route path="/prices" element={<Prices />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  );
}
