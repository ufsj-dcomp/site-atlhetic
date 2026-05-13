import { useState } from "react";
import { signInUser, resetPassword } from "../services/authService";
import "./Signin.css";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

//Adicionei os imports do banco de dados e da autenticação
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase"; 

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
  const [mode, setMode] = useState<"login" | "reset">("login");
  const [resetEmail, setResetEmail] = useState("");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    try {
      setLoading(true);
      await signInUser(email, password);

      //Lógica para levar o usuário ao home certo
      const user = auth.currentUser; 
      
      if (user) {
        // Vai na coleção 'users', pega o documento com o ID do usuário logado
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          
          // Verifica a role e manda pra rota certa
          if (userData.role === "administrador") {
            navigate("/admin");
          } else {
            navigate("/home"); // Se for torcedor, vai pro home normal
          }
        } else {
          // Fallback: se o usuário logou mas não tem documento no banco, vai pro home
          navigate("/home"); 
        }
      }

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

  async function handleReset(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    try {
      setLoading(true);
      await resetPassword(resetEmail);
      setMessage("Email de recuperação enviado! Verifique sua caixa de entrada.");
      setMessageType("success");
    } catch (error: unknown) {
      if (error instanceof FirebaseError && error.code === "auth/user-not-found") {
        setMessage("Email não encontrado.");
      } else {
        setMessage("Erro ao enviar email de recuperação.");
      }
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
          <p>{mode === "login" ? "Entre na sua conta" : "Recuperar senha"}</p>
          <span>{mode === "login" ? "Bem-vindo de volta" : "Enviaremos um email com instruções"}</span>
        </div>

        {mode === "login" ? (
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

            <button
              type="button"
              className="forgot-btn"
              onClick={() => { setMode("reset"); setMessage(""); }}
            >
              Esqueci minha senha
            </button>

            <button className="primary-btn" type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>

            <div className="divider"><span>ou</span></div>

            <button className="google-btn" type="button">
              <span className="google-icon">G</span>
              Continue com Google
            </button>

            {message && <p className={`feedback ${messageType}`}>{message}</p>}

            <p className="bottom-text">
              Não possui conta? <a href="/cadastro">Crie uma conta</a>
            </p>
          </form>
        ) : (
          <form className="signin-form" onSubmit={handleReset}>
            <label>
              Email
              <div className="input-wrap">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  placeholder="Digite seu email cadastrado"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
            </label>

            <button className="primary-btn" type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar email de recuperação"}
            </button>

            {message && <p className={`feedback ${messageType}`}>{message}</p>}

            <button
              type="button"
              className="forgot-btn"
              onClick={() => { setMode("login"); setMessage(""); }}
            >
              ← Voltar para o login
            </button>
          </form>
        )}
      </section>
    </main>
  );
}