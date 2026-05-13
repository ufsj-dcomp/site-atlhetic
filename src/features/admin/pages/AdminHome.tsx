import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaUserShield } from 'react-icons/fa';
import './AdminHome.css';

export function AdminHome() {
  // Array com as funcionalidades
  const adminFeatures = [
    {
      id: 'create-game',
      title: 'Cadastrar Novo Jogo',
      description: 'Adicione uma nova partida, definindo modalidade, data e local.',
      icon: <FaPlus />,
      path: '/admin/cadastrar-jogo',
      colorBg: '#e0f2fe', 
      colorIcon: '#0284c7' 
    },
    {
      id: 'edit-games',
      title: 'Editar Jogos Existentes',
      description: 'Altere informações, atualize placares ou cancele partidas cadastradas.',
      icon: <FaEdit />,
      path: '/admin/gerenciar-jogos', 
      colorBg: '#fef08a', 
      colorIcon: '#ca8a04' 
    },
    {
      id: 'publish-news',
      title: 'Publicar Novas Notícias',
      description: 'Publique novos notícias sobre o Athletic Club',
      icon: <FaPlus />,
      path: '/admin/publicar-noticias',
      colorBg: '#b2b5b6ff', 
      colorIcon: '#1f1e1eff' 
    }
  ];

  return (
    <div className="admin-home-page">
      <div className="admin-container">
        
        <div className="admin-header">
          <div style={{ fontSize: '2.5rem', color: '#111', marginBottom: '10px' }}>
            <FaUserShield />
          </div>
          <h1>Painel Administrativo</h1>
          <p>Gerencie as funcionalidades da atlética</p>
        </div>

        <div className="admin-grid">
          {adminFeatures.map((feature) => (
            <Link to={feature.path} key={feature.id} className="admin-card-link">
              <div className="admin-card">
                <div 
                  className="card-icon-wrapper" 
                  style={{ backgroundColor: feature.colorBg, color: feature.colorIcon }}
                >
                  {feature.icon}
                </div>
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}