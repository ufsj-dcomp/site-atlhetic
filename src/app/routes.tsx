import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "../pages/Landing";
import Home from "../features/home/pages/Home";

import Games from "../features/games/pages/Games";
import GameDetails from "../features/games/pages/GameDetails";

import News from "../features/news/pages/News";

import Loja from "../features/loja/pages/Loja";
import ProdutoDetalhe from "../features/loja/pages/ProdutoDetalhe";

import Ingressos from "../features/ingressos/pages/ingressos";
import IngressosDetalhe from "../features/ingressos/pages/IngressosDetalhe";

import Signup from "../features/auth/pages/Signup";
import Signin from "../features/auth/pages/Signin";
import PrivateRoute from "../features/auth/components/PrivateRoute";

import Profile from "../features/users/pages/Profile";

import { CreateGame } from "../features/games/pages/CreateGame";
import { AdminHome } from "../features/home/pages/AdminHome";
import { ManageGames } from "../features/games/components/ManageGames";
import { CreateNews } from "../features/news/pages/CreateNews";
import { AdminProducts } from "../features/loja/pages/admin/AdminProducts";
import { CreateProduct } from "../features/loja/pages/admin/CreateProduct";
import { EditProduct } from "../features/loja/pages/admin/EditProduct";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/jogos"
        element={
          <PrivateRoute>
            <Games />
          </PrivateRoute>
        }
      />

      <Route
        path="/jogos/:id"
        element={
          <PrivateRoute>
            <GameDetails />
          </PrivateRoute>
        }
      />

      <Route
        path="/jogo/:id"
        element={
          <PrivateRoute>
            <GameDetails />
          </PrivateRoute>
        }
      />

      <Route
        path="/noticias"
        element={
          <PrivateRoute>
            <News />
          </PrivateRoute>
        }
      />

      <Route
        path="/ingressos"
        element={
          <PrivateRoute>
            <Ingressos />
          </PrivateRoute>
        }
      />

      <Route
        path="/ingressos/:id"
        element={
          <PrivateRoute>
            <IngressosDetalhe />
          </PrivateRoute>
        }
      />


      <Route
        path="/loja"
        element={
          <PrivateRoute>
            <Loja />
          </PrivateRoute>
        }
      />

      <Route
        path="/produto/:id"
        element={
          <PrivateRoute>
            <ProdutoDetalhe />
          </PrivateRoute>
        }
      />

      <Route path="/cadastro" element={<Signup />} />
      <Route path="/login" element={<Signin />} />

      <Route
        path="/perfil"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminHome />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/cadastrar-jogo"
        element={
          <PrivateRoute>
            <CreateGame />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/gerenciar-jogos"
        element={
          <PrivateRoute>
            <ManageGames />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/cadastrar-noticias"
        element={
          <PrivateRoute>
            <CreateNews />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/produtos"
        element={
          <PrivateRoute>
            <AdminProducts />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/produtos/criar"
        element={
          <PrivateRoute>
            <CreateProduct />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/produtos/:id/editar"
        element={
          <PrivateRoute>
            <EditProduct />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}