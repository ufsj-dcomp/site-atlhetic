import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./features/auth/pages/Signup";

function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Athletic Site</h1>
      <p>Bem-vindo ao sistema.</p>
      <Link to="/cadastro">Ir para cadastro</Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}