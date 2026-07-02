import { useState, useEffect } from "react";
import { useAuth } from "../../auth/context/useAuth";
import { getUserProfile, updateUserProfile, type UserProfile } from "../services/userService";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaCalendarAlt } from "react-icons/fa";

function validateCPF(cpf: string) {
  return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
}

function validatePhone(phone: string) {
  return /^\(\d{2}\) \d{4,5}-\d{4}$/.test(phone);
}

function maskPhone(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function maskCPF(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

type MessageType = "error" | "success" | "";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      const data = await getUserProfile(user.uid);
      if (data) {
        setProfile(data);
        setName(data.name || "");
        setPhone(data.phone || "");
        setCpf(data.cpf || "");
        setBirthDate(data.birthDate || "");
      }
      setFetching(false);
    }
    loadProfile();
  }, [user]);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (phone && !validatePhone(phone)) {
      setMessage("Telefone inválido. Use o formato (99) 99999-9999.");
      setMessageType("error");
      return;
    }

    if (cpf && !validateCPF(cpf)) {
      setMessage("CPF inválido. Use o formato 000.000.000-00.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      await updateUserProfile(user!.uid, { name, phone, cpf, birthDate });
      setMessage("Perfil atualizado com sucesso!");
      setMessageType("success");
    } catch {
      setMessage("Erro ao atualizar perfil.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) return <div className="profile-loading">Carregando...</div>;

  return (
    <main className="profile-page">
      <section className="profile-card">
        <button className="back-btn" onClick={() => navigate("/home")}>
          ← Voltar
        </button>

        <div className="profile-brand">
          <div className="profile-avatar">{name.charAt(0).toUpperCase()}</div>
          <h1>Meu Perfil</h1>
          <span>{profile?.email}</span>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <label>
            Nome
            <div className="input-wrap">
              <span className="input-icon"><FaUser /></span>
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </label>

          <label>
            Email
            <div className="input-wrap input-wrap--disabled">
              <span className="input-icon"><FaEnvelope /></span>
              <input type="email" value={profile?.email || ""} disabled />
            </div>
          </label>

          <label>
            Telefone
            <div className="input-wrap">
              <span className="input-icon"><FaPhone /></span>
              <input
                type="text"
                placeholder="(99) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(maskPhone(e.target.value))}
              />
            </div>
          </label>

          <label>
            CPF
            <div className="input-wrap">
              <span className="input-icon"><FaIdCard /></span>
              <input
                type="text"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(maskCPF(e.target.value))}
              />
            </div>
          </label>

          <label>
            Data de nascimento
            <div className="input-wrap">
              <span className="input-icon"><FaCalendarAlt /></span>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
          </label>

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar alterações"}
          </button>

          {message && <p className={`feedback ${messageType}`}>{message}</p>}
        </form>
      </section>
    </main>
  );
}