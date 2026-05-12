import { useState } from 'react';
import { createGame } from '../services/gameService';
import type { GameData } from '../types/game';
import { FaTrophy, FaCalendarAlt, FaMapMarkerAlt, FaRunning, FaPlus } from 'react-icons/fa';
import './CreateGame.css'; // Importando o visual

export function CreateGame() {
  const [formData, setFormData] = useState<GameData>({
    title: '',
    date: '',
    location: '',
    category: 'futebol',
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    
    try {
      await createGame(formData);
      setStatus({ type: 'success', message: 'Jogo cadastrado com sucesso!' });
      setFormData({ title: '', date: '', location: '', category: 'futebol' });
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
            Título do Confronto
            <div className="input-wrap">
              <div className="input-icon">
                <FaTrophy />
              </div>
              <input 
                type="text" 
                name="title" 
                placeholder="Ex: Athletic X vs Time b"
                value={formData.title} 
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
                name="date" 
                value={formData.date} 
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
                placeholder="Ex: Quadra Principal"
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