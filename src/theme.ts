interface Colors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  gradientStart: string;
  gradientEnd: string;
  border: string;
}

interface Typography {
  title: {
    fontSize: number;
    fontWeight: 'bold' | 'normal' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  };
  subtitle: {
    fontSize: number;
    fontWeight: 'bold' | 'normal' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  };
  body: {
    fontSize: number;
  };
}

interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

interface BorderRadius {
  small: number;
  medium: number;
  large: number;
}

interface Theme {
  colors: Colors;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
}

export const theme: Theme = {
  colors: {
    primary: '#2E7D32',
    secondary: '#4CAF50',
    accent: '#81C784',
    background: '#F5F5F5',
    card: '#FFFFFF',
    text: '#212121',
    textSecondary: '#757575',
    gradientStart: '#4CAF50',
    gradientEnd: '#2E7D32',
    border: '#E0E0E0',
  },
  typography: {
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 16,
      fontWeight: '600',
    },
    body: {
      fontSize: 14,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
  },
};