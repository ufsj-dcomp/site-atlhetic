import { useState } from "react";
import { signInUser } from "../services/authService";
import "./Signin.css";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

function getErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/invalid-credential":
        return "Email ou senha incorretos.";
      case "auth/user-not-found":
        return "Usuário não encontrado.";
      case "auth/wrong-password":
        return "Senha incorreta.";
      default:
        return "Erro ao fazer login.";
    }
  }
  return "Erro ao fazer login.";
}
type MessageType = "error" | "success" | "";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    try {
      setLoading(true);
      await signInUser(email, password);
      navigate("/home");
      setMessage("Login realizado com sucesso!");
      setMessageType("success");
      setEmail("");
      setPassword("");
    } catch (error: unknown) {
      setMessage(getErrorMessage(error));
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="signin-page">
      <section className="signin-card">
        <div className="signin-brand">
          <div className="signin-logo">AC</div>
          <h1>Athletic Club</h1>
          <p>Entre na sua conta</p>
          <span>Bem-vindo de volta</span>
        </div>

        <form className="signin-form" onSubmit={handleSubmit}>
          <label>
            Email
            <div className="input-wrap">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </label>

          <label>
            Senha
            <div className="input-wrap">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </label>

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <div className="divider">
            <span>ou</span>
          </div>

          <button className="google-btn" type="button">
            <span className="google-icon">G</span>
            Continue com Google
          </button>

          {message && <p className={`feedback ${messageType}`}>{message}</p>}

          <p className="bottom-text">
            Não possui conta? <a href="/cadastro">Crie uma conta</a>
          </p>
        </form>
      </section>
    </main>
  );
}