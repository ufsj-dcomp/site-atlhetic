import { useState } from "react";
import { registerUser } from "../services/authService";
import "./Signup.css";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";


function getErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "Este email já está cadastrado.";
      case "auth/invalid-email":
        return "Email inválido.";
      case "auth/weak-password":
        return "A senha deve ter no mínimo 6 caracteres.";
      default:
        return "Erro ao cadastrar usuário.";
    }
  }
  return "Erro ao cadastrar usuário.";
}

type MessageType = "error" | "success" | "";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (!acceptedTerms) {
      setMessage("Você precisa aceitar os termos.");
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("As senhas estão diferentes.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      await registerUser(name, email, password);
      navigate("/login");
      setMessage("Cadastro realizado com sucesso!");
      setMessageType("success");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAcceptedTerms(false);
    } catch (error: unknown) {
      setMessage(getErrorMessage(error));
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="signup-page">
      <section className="signup-card">
        <div className="signup-brand">
          <div className="signup-logo">AC</div>
          <h1>Athletic Club</h1>
          <p>Crie sua conta</p>
          <span>Faça parte do Esquadrão de Aço</span>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label>
            Nome
            <div className="input-wrap">
              <span className="input-icon">👤</span>
              <input
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </label>

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

          <label>
            Confirmar senha
            <div className="input-wrap">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="terms">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <span>Li e aceito os termos</span>
          </label>

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? "Criando conta..." : "Criar Conta"}
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
            Já possui uma conta? <a href="/login">Faça o login</a>
          </p>
        </form>
      </section>
    </main>
  );
}