import { useState } from 'react';
import { createGame } from '../services/gameService';
import type { GameData } from '../types/game';
import { FaTrophy, FaCalendarAlt, FaMapMarkerAlt, FaUserShield, FaPlus } from 'react-icons/fa';
import './CreateGame.css'; 

export function CreateGame() {
  const [formData, setFormData] = useState<GameData>({
    title: '',
    dateTime: '',
    location: '',
    opponent: '', 
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    
    try {
      await createGame(formData);
      setStatus({ type: 'success', message: 'Jogo cadastrado com sucesso!' });
      // Limpa os campos
      setFormData({ title: '', dateTime: '', location: '', opponent: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Erro ao cadastrar. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-game-page">
      <div className="create-game-card">
        
        <div className="create-game-brand">
          <div className="create-game-logo">
            <FaPlus />
          </div>
          <h1>Novo Jogo</h1>
          <p>Painel do Administrador</p>
        </div>

        {status.message && (
          <div className={`feedback ${status.type}`}>
            {status.message}
          </div>
        )}

        <form className="create-game-form" onSubmit={handleSubmit}>
          
          <label>
            Título da Partida
            <div className="input-wrap">
              <div className="input-icon">
                <FaTrophy />
              </div>
              <input 
                type="text" 
                name="title" 
                placeholder='Ex: "Athletic x Cruzeiro"'
                value={formData.title} 
                onChange={handleChange} 
                required 
              />
            </div>
          </label>

          <label>
            Adversário
            <div className="input-wrap">
              <div className="input-icon">
                <FaUserShield />
              </div>
              <input 
                type="text" 
                name="opponent" 
                placeholder='Ex: "Cruzeiro"'
                value={formData.opponent} 
                onChange={handleChange} 
                required 
              />
            </div>
          </label>

          <label>
            Data e Hora
            <div className="input-wrap">
              <div className="input-icon">
                <FaCalendarAlt />
              </div>
              <input 
                type="datetime-local" 
                name="dateTime" 
                value={formData.dateTime} 
                onChange={handleChange} 
                required 
              />
            </div>
          </label>

          <label>
            Local da Partida
            <div className="input-wrap">
              <div className="input-icon">
                <FaMapMarkerAlt />
              </div>
              <input 
                type="text" 
                name="location" 
                placeholder='Ex: "Arena Sicred"'
                value={formData.location} 
                onChange={handleChange} 
                required 
              />
            </div>
          </label>

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar Jogo'}
          </button>

        </form>
      </div>
    </div>
  );
}