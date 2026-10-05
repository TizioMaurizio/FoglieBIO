import { createRoot, hydrateRoot } from 'react-dom/client';
import { LandingPage } from './components/LandingPage';
import './styles/globals.css';
import './styles/experience.css';
import './styles/product-layout.css';
import './styles/branding.css';
import './styles/shop.css';

const root = document.getElementById('root');
if (!root) throw new Error('Contenitore della pagina non disponibile.');

const englishPath = import.meta.env.BASE_URL + 'en/';
const language = location.pathname === englishPath.slice(0, -1) || location.pathname.startsWith(englishPath) ? 'en' : 'it';
document.documentElement.lang = language;
if (root.querySelector('main')) {
  hydrateRoot(root, <LandingPage language={language} />);
} else {
  createRoot(root).render(<LandingPage language={language} />);
}
