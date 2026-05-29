import '../styles/ManageGames.css';
import { useState, useEffect } from 'react';
import { getGames, deleteGame, updateGame } from '../services/gameService';
import {
  FaTrophy,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserShield,
  FaEdit,
  FaTrash,
  FaList,
} from 'react-icons/fa';
import type { GameData } from '../types/game';

interface GameWithId extends GameData {
  id: string;
}

export function ManageGames() {
  const [games, setGames] = useState<GameWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingGame, setEditingGame] = useState<GameWithId | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadGames = async () => {
      try {
        setLoading(true);
        const data = await getGames();

        if (!isMounted) return;

        setGames(data as GameWithId[]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadGames();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (id: string) => {
    const shouldDelete = window.confirm('Tem certeza que deseja excluir este jogo?');

    if (shouldDelete) {
      await deleteGame(id);
      setGames((prevGames) => prevGames.filter((game) => game.id !== id));
    }
  };

  const handleUpdate = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingGame) return;

    await updateGame(editingGame.id, {
      title: editingGame.title,
      opponent: editingGame.opponent,
      dateTime: editingGame.dateTime,
      location: editingGame.location,
    });

    setEditingGame(null);

    const updatedGames = await getGames();
    setGames(updatedGames as GameWithId[]);
  };

  if (loading) {
    return (
      <div className="manage-games-page">
        <p style={{ color: 'white' }}>Carregando jogos...</p>
      </div>
    );
  }

  return (
    <div className="manage-games-page">
      <div className="manage-games-card">
        <div className="manage-games-brand">
          <div className="manage-games-logo">
            <FaList />
          </div>
          <h1>Gerenciar Jogos</h1>
          <p>Painel do Administrador</p>
        </div>

        {editingGame ? (
          <form className="edit-game-form" onSubmit={handleUpdate}>
            <h3>Editando Partida</h3>

            <label>
              Título da Partida
              <div className="input-wrap">
                <div className="input-icon"><FaTrophy /></div>
                <input
                  type="text"
                  value={editingGame.title}
                  onChange={(e) =>
                    setEditingGame({ ...editingGame, title: e.target.value })
                  }
                  required
                />
              </div>
            </label>

            <label>
              Adversário
              <div className="input-wrap">
                <div className="input-icon"><FaUserShield /></div>
                <input
                  type="text"
                  value={editingGame.opponent}
                  onChange={(e) =>
                    setEditingGame({ ...editingGame, opponent: e.target.value })
                  }
                  required
                />
              </div>
            </label>

            <label>
              Data e Hora
              <div className="input-wrap">
                <div className="input-icon"><FaCalendarAlt /></div>
                <input
                  type="datetime-local"
                  value={editingGame.dateTime}
                  onChange={(e) =>
                    setEditingGame({ ...editingGame, dateTime: e.target.value })
                  }
                  required
                />
              </div>
            </label>

            <label>
              Local da Partida
              <div className="input-wrap">
                <div className="input-icon"><FaMapMarkerAlt /></div>
                <input
                  type="text"
                  value={editingGame.location}
                  onChange={(e) =>
                    setEditingGame({ ...editingGame, location: e.target.value })
                  }
                  required
                />
              </div>
            </label>

            <div className="edit-actions">
              <button className="primary-btn" type="submit">
                Salvar Alterações
              </button>
              <button
                className="cancel-btn"
                type="button"
                onClick={() => setEditingGame(null)}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="games-list">
            {games.length === 0 ? (
              <p className="empty-message">Nenhum jogo cadastrado.</p>
            ) : (
              games.map((game) => (
                <div className="game-item" key={game.id}>
                  <div className="game-info">
                    <h4>{game.title}</h4>
                    <span className="game-detail">
                      <FaUserShield /> {game.opponent}
                    </span>
                    <span className="game-detail">
                      <FaCalendarAlt /> {new Date(game.dateTime).toLocaleString('pt-BR')}
                    </span>
                    <span className="game-detail">
                      <FaMapMarkerAlt /> {game.location}
                    </span>
                  </div>

                  <div className="game-actions">
                    <button
                      className="icon-btn edit"
                      onClick={() => setEditingGame(game)}
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="icon-btn delete"
                      onClick={() => handleDelete(game.id)}
                      title="Excluir"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}