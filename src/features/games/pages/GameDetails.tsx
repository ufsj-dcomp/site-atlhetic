import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../../components/Sidebar";

import "../styles/GameDetails.css";

import { getGames } from "../services/gameService";

import type { GameData } from "../types/game";

type Game = GameData & {
  id: string;
};

export default function GameDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [game, setGame] = useState<Game | null>(
    null
  );

  useEffect(() => {
    async function loadGame() {
      try {
        const data = await getGames();

        const selectedGame = (
          data as Game[]
        ).find((item) => item.id === id);

        if (selectedGame) {
          setGame(selectedGame);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadGame();
  }, [id]);

  if (!game) {
    return (
      <div className="game-loading">
        Carregando...
      </div>
    );
  }

  const gameDate = new Date(game.dateTime);

  return (
    <div className="game-details-layout">
      <Sidebar />

      <div className="game-details-content">

        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Voltar
        </button>

        <h1 className="details-title">
          Detalhe do jogo
        </h1>

        <div className="game-details-card">

          <div className="top-section">

            <div className="game-team">

              <div className="game-logo">
                AC
              </div>

              <h2>
                Athletic Clube
              </h2>

              <p className="stadium-text">
                {game.location}
              </p>

            </div>

            <div className="vs">
              VS
            </div>

            <div className="game-team">

              <div className="game-logo opponent">
                {game.opponent
                  .substring(0, 2)
                  .toUpperCase()}
              </div>

              <h2>
                {game.opponent}
              </h2>

              <p className="stadium-text">
                Time adversário
              </p>

            </div>

          </div>

          <div className="info-section">

            <div className="info-card">

              <div className="icon-box">
                📅
              </div>

              <div>
                <p className="info-label">
                  Data
                </p>

                <h3 className="info-value">
                  {gameDate.toLocaleDateString(
                    "pt-BR"
                  )}
                </h3>
              </div>

            </div>

            <div className="info-card">

              <div className="icon-box">
                ⏰
              </div>

              <div>
                <p className="info-label">
                  Horário
                </p>

                <h3 className="info-value">
                  {gameDate.toLocaleTimeString(
                    "pt-BR",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </h3>
              </div>

            </div>

            <div className="info-card">

              <div className="icon-box">
                📍
              </div>

              <div>
                <p className="info-label">
                  Local
                </p>

                <h3 className="info-value">
                  {game.location}
                </h3>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}