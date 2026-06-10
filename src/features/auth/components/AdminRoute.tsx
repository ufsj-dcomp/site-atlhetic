import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import PrivateRoute from "./PrivateRoute";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "administrador") return <Navigate to="/home" />;

  return <PrivateRoute>{children}</PrivateRoute>;
}