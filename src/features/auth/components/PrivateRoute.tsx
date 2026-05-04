import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}