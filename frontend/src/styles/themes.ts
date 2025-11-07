export const lightTheme = {
  background: '#f5f4ff',
  surface: 'rgba(255, 255, 255, 0.88)',
  surfaceSolid: '#ffffff',
  border: 'rgba(124, 58, 237, 0.15)',
  textPrimary: '#1e1637',
  textSecondary: 'rgba(30, 22, 55, 0.68)',
  textMuted: 'rgba(30, 22, 55, 0.45)',
  shadow: 'rgba(92, 51, 255, 0.12)',
  accentGradient: 'linear-gradient(135deg, #7c3aed 0%, #5a30f0 100%)',
  positive: '#16a34a',
  negative: '#dc2626',
  translucent: 'rgba(255, 255, 255, 0.65)',
  inputBackground: 'rgba(255, 255, 255, 0.95)',
  inputBorder: 'rgba(124, 58, 237, 0.18)',
  inputPlaceholder: 'rgba(30, 22, 55, 0.5)',
  divider: 'rgba(30, 22, 55, 0.1)'
};

export const darkTheme = {
  background: '#070513',
  surface: 'rgba(21, 18, 36, 0.88)',
  surfaceSolid: '#0f0c1f',
  border: 'rgba(168, 85, 247, 0.22)',
  textPrimary: '#f3f2ff',
  textSecondary: 'rgba(243, 242, 255, 0.72)',
  textMuted: 'rgba(243, 242, 255, 0.48)',
  shadow: 'rgba(0, 0, 0, 0.52)',
  accentGradient: 'linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)',
  positive: '#34d399',
  negative: '#f87171',
  translucent: 'rgba(255, 255, 255, 0.08)',
  inputBackground: 'rgba(31, 27, 53, 0.9)',
  inputBorder: 'rgba(168, 85, 247, 0.28)',
  inputPlaceholder: 'rgba(243, 242, 255, 0.43)',
  divider: 'rgba(243, 242, 255, 0.12)'
};

export type AppTheme = typeof lightTheme;
