import { createRoot, hydrateRoot } from 'react-dom/client';
import { LandingPage } from './components/LandingPage';
import './styles/globals.css';
import './styles/experience.css';
import './styles/product-layout.css';
import './styles/story-photography.css';
import './styles/organic.css';

const root = document.getElementById('root');
if (!root) throw new Error('Contenitore della pagina non disponibile.');

if (root.querySelector('main')) {
  hydrateRoot(root, <LandingPage />);
} else {
  createRoot(root).render(<LandingPage />);
}
