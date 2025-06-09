export const COLORS = {
  primary: '#007BFF',      
  secondary: '#6C757D',    
  background: '#F8F9FA',    
  white: '#FFFFFF',
  black: '#000000',
  success: '#28A745',     
  error: '#DC3545',       
  lightGray: '#E9ECEF',   
  darkGray: '#495057',     
};

export const SIZES = {
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // Font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  body: 14,
};

export const FONTS = {
  h1: { fontFamily: 'System', fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: 'System', fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: 'System', fontSize: SIZES.h3, lineHeight: 22 },
  body: { fontFamily: 'System', fontSize: SIZES.body, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;