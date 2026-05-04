import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Athletic Site</h1>
        <p style={{ marginBottom: 20 }}>Bem-vindo ao sistema.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link to="/cadastro">Cadastro</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </main>
  );
}