type Palette = Record<string, string>

interface Theme {
  palette: Palette;
  spacing: (factor: number) => string ;
}

const baseSpacing = 8; // A common base unit for spacing, e.g., 8px

export const theme: Theme = {
  palette: {
    primary: '#1976d2', 
    secondary: '#dc004e',
    black: '#000',
    grey: '#c1c1c1'
  },
  spacing: (factor: number) => baseSpacing * factor + "px",
};