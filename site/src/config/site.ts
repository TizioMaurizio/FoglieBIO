export const SITE_URL = 'https://tiziomaurizio.github.io/FoglieBIO/';

// Vite supplies the same base in development, prerendering and the client build.
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
