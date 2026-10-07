import { createRoot, hydrateRoot } from 'react-dom/client';
import { LandingPage } from './components/LandingPage';
import { PAGE_BASE } from './config/site';
import './styles/globals.css';
import './styles/experience.css';
import './styles/product-layout.css';
import './styles/story-photography.css';
import './styles/organic.css';
import './styles/branding.css';
import './styles/shop.css';

const root = document.getElementById('root');
if (!root) throw new Error('Contenitore della pagina non disponibile.');

const englishPath = PAGE_BASE + 'en/';
const language = location.pathname === englishPath.slice(0, -1) || location.pathname.startsWith(englishPath) ? 'en' : 'it';
document.documentElement.lang = language;
if (root.querySelector('main')) {
  hydrateRoot(root, <LandingPage language={language} />);
} else {
  createRoot(root).render(<LandingPage language={language} />);
}
