import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Home from "../pages/Home";
import Jogos from "../pages/Jogos"; 
import DetalheJogo from "../pages/DetalheJogo";
import Signup from "../features/auth/pages/Signup";
import Signin from "../features/auth/pages/Signin";
import PrivateRoute from "../features/auth/components/PrivateRoute";
import Profile from "../features/users/pages/Profile";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />
       <Route path="/jogos" element={
        <PrivateRoute>
          <Jogos />
        </PrivateRoute>
      } />
      <Route path="/jogo/:id" element={
       <PrivateRoute>
         <DetalheJogo />
       </PrivateRoute>
      } />
      <Route path="/cadastro" element={<Signup />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/perfil" element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      } />
    </Routes>
  );
}