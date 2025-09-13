# Constants

This folder contains all app-wide constants including colors, dimensions, and other configuration values.

## Files

- **`colors.ts`**: Comprehensive color system with theme support
- **`index.ts`**: Barrel export file for clean imports

## Color System

The color system is designed to support both light and dark themes with consistent naming conventions.

### Color Categories

#### Primary Colors

- `primary`: Main brand color (#007AFF)
- `primaryDark`: Darker variant for pressed states
- `primaryLight`: Lighter variant for hover states

#### Secondary Colors

- `secondary`: Secondary brand color (#FF6B6B)
- `secondaryDark`: Darker variant
- `secondaryLight`: Lighter variant

#### Neutral Colors

- `white` / `black`: Pure white and black
- `gray`: 50-900 scale for various UI elements

#### iOS System Colors

- `ios.blue`: iOS system blue
- `ios.gray`: iOS system gray
- `ios.lightGray`: iOS light gray
- `ios.darkGray`: iOS dark gray
- `ios.darkerGray`: iOS darker gray

#### Theme-Aware Colors

- `background`: Main background color
- `card`: Card/container background
- `text.primary`: Primary text color
- `text.secondary`: Secondary text color
- `text.tertiary`: Tertiary text color

#### Tab Bar Colors

- `tabBar.background`: Tab bar background
- `tabBar.border`: Tab bar border
- `tabBar.active`: Active tab color
- `tabBar.inactive`: Inactive tab color

## Usage

### Basic Usage

```typescript
import { Colors } from '../constants';

// Use specific colors
<View style={{ backgroundColor: Colors.primary }} />
<Text style={{ color: Colors.text.primary.light }} />
```

### Theme-Aware Usage

```typescript
import { getThemeColors } from '../constants';
import { useColorScheme } from 'react-native';

const MyComponent = () => {
  const isDark = useColorScheme() === 'dark';
  const themeColors = getThemeColors(isDark);

  return (
    <View style={{ backgroundColor: themeColors.background }}>
      <Text style={{ color: themeColors.textPrimary }}>Hello</Text>
    </View>
  );
};
```

## Adding New Colors

1. Add the color to the appropriate category in `colors.ts`
2. If it's theme-aware, add it to the `getThemeColors` function
3. Update this README if needed
4. Use the new color throughout the app

## Best Practices

- Always use the color constants instead of hardcoded values
- Use theme-aware colors for UI elements that should adapt to dark/light mode
- Use specific color names (e.g., `Colors.primary`) for brand colors
- Use semantic names (e.g., `themeColors.textPrimary`) for theme-dependent colors
