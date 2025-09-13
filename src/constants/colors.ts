/**
 * Color constants for the Agora React Native app
 * Centralized color definitions for consistent theming
 */

export const Colors = {
  // Primary Colors - Modern Blue
  primary: '#0A84FF',
  primaryDark: '#0056CC',
  primaryLight: '#4A9EFF',

  // Secondary Colors - Vibrant Purple
  secondary: '#AF52DE',
  secondaryDark: '#8E44AD',
  secondaryLight: '#C77DFF',

  // Accent Colors
  accent: '#FF9500',
  accentDark: '#E6850E',
  accentLight: '#FFB84D',

  // Neutral Colors - Dark Theme Focused
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F8F9FA',
    100: '#E9ECEF',
    200: '#DEE2E6',
    300: '#CED4DA',
    400: '#ADB5BD',
    500: '#6C757D',
    600: '#495057',
    700: '#343A40',
    800: '#212529',
    900: '#0D1117',
  },

  // Dark Theme Colors
  dark: {
    background: '#0D1117', // Almost black with slight blue tint
    surface: '#161B22', // Slightly lighter than background
    surfaceVariant: '#21262D', // Card/surface variant
    border: '#30363D', // Subtle borders
    borderLight: '#21262D', // Lighter borders
    shadow: '#000000', // Pure black for shadows
  },

  // Light Theme Colors (for future use)
  light: {
    background: '#FFFFFF',
    surface: '#F8F9FA',
    surfaceVariant: '#E9ECEF',
    border: '#DEE2E6',
    borderLight: '#F1F3F4',
    shadow: '#00000020',
  },

  // Text Colors - Optimized for dark theme
  text: {
    primary: {
      light: '#F0F6FC', // High contrast white
      dark: '#F0F6FC', // Same for consistency
    },
    secondary: {
      light: '#8B949E', // Muted gray
      dark: '#8B949E', // Same for consistency
    },
    tertiary: {
      light: '#6E7681', // More muted
      dark: '#6E7681', // Same for consistency
    },
    inverse: {
      light: '#0D1117', // Dark text on light backgrounds
      dark: '#0D1117', // Same for consistency
    },
  },

  // Tab Bar Colors - Dark theme optimized
  tabBar: {
    background: {
      light: '#FFFFFF',
      dark: '#161B22', // Dark surface
    },
    border: {
      light: '#DEE2E6',
      dark: '#21262D', // Subtle border
    },
    active: '#0A84FF', // Bright blue for active state
    inactive: '#6E7681', // Muted gray for inactive
  },

  // Status Bar Colors
  statusBar: {
    light: 'dark-content',
    dark: 'light-content',
  },

  // Semantic Colors
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  info: '#17A2B8',

  // Special Effects
  blur: 'rgba(13, 17, 23, 0.8)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  highlight: 'rgba(10, 132, 255, 0.1)',
} as const;

// Theme-aware color helper - Optimized for dark theme
export const getThemeColors = (isDark: boolean) => ({
  // Background colors
  background: isDark ? Colors.dark.background : Colors.light.background,
  surface: isDark ? Colors.dark.surface : Colors.light.surface,
  surfaceVariant: isDark
    ? Colors.dark.surfaceVariant
    : Colors.light.surfaceVariant,

  // Text colors
  textPrimary: isDark ? Colors.text.primary.dark : Colors.text.primary.light,
  textSecondary: isDark
    ? Colors.text.secondary.dark
    : Colors.text.secondary.light,
  textTertiary: isDark ? Colors.text.tertiary.dark : Colors.text.tertiary.light,
  textInverse: isDark ? Colors.text.inverse.dark : Colors.text.inverse.light,

  // Border colors
  border: isDark ? Colors.dark.border : Colors.light.border,
  borderLight: isDark ? Colors.dark.borderLight : Colors.light.borderLight,

  // Tab bar colors
  tabBarBackground: isDark
    ? Colors.tabBar.background.dark
    : Colors.tabBar.background.light,
  tabBarBorder: isDark ? Colors.tabBar.border.dark : Colors.tabBar.border.light,

  // Status bar
  statusBar: isDark ? Colors.statusBar.dark : Colors.statusBar.light,

  // Legacy support
  cardBackground: isDark ? Colors.dark.surface : Colors.light.surface,
});

export default Colors;
