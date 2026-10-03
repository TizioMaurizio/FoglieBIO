import { brandAssets } from '../data/brandAssets';

export function BrandLogo({ className = '', decorative = false }: { className?: string; decorative?: boolean }) {
  return <img className={`brand-logo ${className}`} src={brandAssets.logo} srcSet={brandAssets.logoSrcSet} sizes="(max-width:700px) 48px, 88px" width="320" height="320" alt={decorative ? '' : 'Foglie Bio Plus'} />;
}

export function OrganicLogo({ className = '' }: { className?: string }) {
  return <img className={`eu-organic-logo ${className}`} src={brandAssets.organic} width="500" height="333" alt="Logo biologico dell’Unione europea" />;
}
