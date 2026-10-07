export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://tiziomaurizio.github.io/FoglieBIO/';
export const PAGE_BASE = import.meta.env.VITE_PAGE_BASE || import.meta.env.BASE_URL;

// Vite supplies the same base in development, prerendering and the client build.
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
