import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../features/auth/pages/Signup";
import Signin from "../features/auth/pages/Signin";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<Signup />} />
      <Route path="/login" element={<Signin />} />
    </Routes>
  );
}