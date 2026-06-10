import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../../components/Sidebar";

import "../styles/Games.css";

import { getGames } from "../services/gameService";
import type { GameData } from "../types/game";

type Game = GameData & {
  id: string;
};

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function loadGames() {
      try {
        const data = await getGames();

        setGames(data as Game[]);
      } catch (error) {
        console.error(error);
      }
    }

    loadGames();
  }, []);

  const filteredGames = games.filter((game) =>
    game.opponent.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h1 className="page-title">
          Próximos Jogos
        </h1>

        <input
          className="search"
          type="text"
          placeholder="Buscar jogos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="games-list">
          {filteredGames.map((game) => {
            const gameDate = new Date(game.dateTime);

            return (
              <div
                className="game-card"
                key={game.id}
                onClick={() =>
                  navigate(`/jogos/${game.id}`)
                }
              >
                <div className="game-left">
                  <div className="team-logo">
                    AC
                  </div>

                  <div>
                    <h3>
                      Athletic Clube
                    </h3>

                    <p className="stadium">
                      {game.location}
                    </p>
                  </div>
                </div>

                <div className="vs">
                  VS
                </div>

                <div className="game-right">
                  <h3>
                    {game.opponent}
                  </h3>

                  <p>
                    {gameDate.toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>

                  <p className="hour">
                    {gameDate.toLocaleTimeString(
                      "pt-BR",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>

                  <button className="details-btn">
                    Ver detalhes
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}