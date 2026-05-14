import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Home from "../pages/Home";
import Loja from "../features/loja/pages/Loja";
import ProdutoDetalhe from "../features/loja/pages/ProdutoDetalhe";
import Jogos from "../pages/Jogos"; 
import DetalheJogo from "../pages/DetalheJogo";
import Signup from "../features/auth/pages/Signup";
import Signin from "../features/auth/pages/Signin";
import PrivateRoute from "../features/auth/components/PrivateRoute";
import Profile from "../features/users/pages/Profile";
import { CreateGame } from '../features/admin/pages/CreateGame';
import { AdminHome } from '../features/admin/pages/AdminHome';
import { ManageGames } from '../features/admin/pages/ManageGames';


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
      <Route path="/loja" element={
        <PrivateRoute>
          <Loja />
        </PrivateRoute>
      } />
      <Route
        path="/produto/:id"
        element={
          <PrivateRoute>
            <ProdutoDetalhe />
          </PrivateRoute>
        }
      />
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
      <Route path="/admin" element={
          <PrivateRoute>
            <AdminHome />
          </PrivateRoute>
      } />
      <Route path="/admin/cadastrar-jogo" element={
            <PrivateRoute>
              <CreateGame />
            </PrivateRoute>
      } />
      <Route path="/admin/gerenciar-jogos" element={
            <PrivateRoute>
                <ManageGames />
            </PrivateRoute>
      } />
    </Routes>
  );
}