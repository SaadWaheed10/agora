/**
 * Color constants for the Agora React Native app
 * Centralized color definitions for consistent theming
 */

export const Colors = {
  // Primary Colors
  primary: '#007AFF',
  primaryDark: '#0056CC',
  primaryLight: '#4A9EFF',

  // Secondary Colors
  secondary: '#FF6B6B',
  secondaryDark: '#E55555',
  secondaryLight: '#FF8E8E',

  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // iOS System Colors
  ios: {
    blue: '#007AFF',
    gray: '#8E8E93',
    lightGray: '#C6C6C8',
    darkGray: '#1C1C1E',
    darkerGray: '#38383A',
  },

  // Background Colors
  background: {
    light: '#F5F5F5',
    dark: '#000000',
    card: {
      light: '#FFFFFF',
      dark: '#1C1C1E',
    },
  },

  // Text Colors
  text: {
    primary: {
      light: '#333333',
      dark: '#FFFFFF',
    },
    secondary: {
      light: '#666666',
      dark: '#CCCCCC',
    },
    tertiary: {
      light: '#999999',
      dark: '#999999',
    },
  },

  // Tab Bar Colors
  tabBar: {
    background: {
      light: '#FFFFFF',
      dark: '#1C1C1E',
    },
    border: {
      light: '#C6C6C8',
      dark: '#38383A',
    },
    active: '#007AFF',
    inactive: '#8E8E93',
  },

  // Status Bar Colors
  statusBar: {
    light: 'dark-content',
    dark: 'light-content',
  },
} as const;

// Theme-aware color helper
export const getThemeColors = (isDark: boolean) => ({
  background: isDark ? Colors.background.dark : Colors.background.light,
  cardBackground: isDark
    ? Colors.background.card.dark
    : Colors.background.card.light,
  textPrimary: isDark ? Colors.text.primary.dark : Colors.text.primary.light,
  textSecondary: isDark
    ? Colors.text.secondary.dark
    : Colors.text.secondary.light,
  textTertiary: isDark ? Colors.text.tertiary.dark : Colors.text.tertiary.light,
  tabBarBackground: isDark
    ? Colors.tabBar.background.dark
    : Colors.tabBar.background.light,
  tabBarBorder: isDark ? Colors.tabBar.border.dark : Colors.tabBar.border.light,
  statusBar: isDark ? Colors.statusBar.dark : Colors.statusBar.light,
});

export default Colors;
