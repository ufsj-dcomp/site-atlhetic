import { useState } from 'react';
import { createNews } from '../services/newsService';
import { FaNewspaper, FaImage, FaCalendarAlt} from 'react-icons/fa';
import './CreateNews.css';

export interface NewsData {
  title: string;
  content: string;
  image: string;
  publishedAt: string;
}

export function CreateNews() {
  const [formData, setFormData] = useState<NewsData>({
    title: '',
    content: '',
    image: '',
    publishedAt: '', 
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    
    try {
      await createNews(formData);
      setStatus({ type: 'success', message: 'Notícia publicada com sucesso!' });
      setFormData({ title: '', content: '', image: '', publishedAt: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Erro ao publicar notícia. Verifique as permissões.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-news-page">
      <div className="create-news-card">
        
        <div className="create-news-brand">
          <div className="create-news-logo">
            <FaNewspaper />
          </div>
          <h1>Publicar Notícia</h1>
          <p>Painel do Administrador</p>
        </div>

        {status.message && (
          <div className={`feedback ${status.type}`}>
            {status.message}
          </div>
        )}

        <form className="create-news-form" onSubmit={handleSubmit}>
          
          <label>
            Título da Notícia
            <div className="input-wrap">
              <div className="input-icon"><FaNewspaper /></div>
              <input 
                type="text" 
                name="title" 
                placeholder='Ex: "Comissão técnica prepara equipe..."'
                value={formData.title} 
                onChange={handleChange} 
                required 
              />
            </div>
          </label>

          <label>
            URL da Imagem de Capa
            <div className="input-wrap">
              <div className="input-icon"><FaImage /></div>
              <input 
                type="url" 
                name="image" 
                placeholder='https://site.com/imagem.jpg'
                value={formData.image} 
                onChange={handleChange} 
                required 
              />
            </div>
          </label>

          <label>
            Data de Publicação
            <div className="input-wrap">
              <div className="input-icon"><FaCalendarAlt /></div>
              <input 
                type="datetime-local" 
                name="publishedAt" 
                value={formData.publishedAt} 
                onChange={handleChange} 
                required 
              />
            </div>
          </label>

          <label>
            Conteúdo da Notícia
            <div className="input-wrap textarea-wrap">
              <textarea 
                name="content" 
                placeholder="Escreva o conteúdo da notícia aqui..."
                value={formData.content} 
                onChange={handleChange} 
                rows={6}
                required 
              />
            </div>
          </label>

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? 'Publicando...' : 'Publicar Notícia'}
          </button>

        </form>
      </div>
    </div>
  );
}