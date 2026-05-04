import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./features/auth/pages/Signup";
import Home from "./Home";
import Jogos from "./Jogos";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/jogos" element={<Jogos />} />
      </Routes>
    </BrowserRouter>
  );
}