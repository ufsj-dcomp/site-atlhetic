import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Home from "../pages/Home";
import Signup from "../features/auth/pages/Signup";
import Signin from "../features/auth/pages/Signin";
import PrivateRoute from "../features/auth/components/PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />
      <Route path="/cadastro" element={<Signup />} />
      <Route path="/login" element={<Signin />} />
    </Routes>
  );
}