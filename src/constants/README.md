# Constants

This folder contains all app-wide constants including colors, dimensions, and other configuration values.

## Files

- **`colors.ts`**: Comprehensive color system with theme support
- **`index.ts`**: Barrel export file for clean imports

## Color System

The color system is optimized for a modern dark theme with sophisticated color choices and excellent contrast ratios.

### Color Categories

#### Primary Colors - Modern Blue

- `primary`: Main brand color (#0A84FF) - Bright, modern blue
- `primaryDark`: Darker variant for pressed states (#0056CC)
- `primaryLight`: Lighter variant for hover states (#4A9EFF)

#### Secondary Colors - Vibrant Purple

- `secondary`: Secondary brand color (#AF52DE) - Vibrant purple
- `secondaryDark`: Darker variant (#8E44AD)
- `secondaryLight`: Lighter variant (#C77DFF)

#### Accent Colors

- `accent`: Accent color (#FF9500) - Orange for highlights
- `accentDark`: Darker variant (#E6850E)
- `accentLight`: Lighter variant (#FFB84D)

#### Neutral Colors

- `white` / `black`: Pure white and black
- `gray`: 50-900 scale for various UI elements

#### iOS System Colors

- `ios.blue`: iOS system blue
- `ios.gray`: iOS system gray
- `ios.lightGray`: iOS light gray
- `ios.darkGray`: iOS dark gray
- `ios.darkerGray`: iOS darker gray

#### Dark Theme Colors

- `dark.background`: Main dark background (#0D1117) - Almost black with blue tint
- `dark.surface`: Card/surface background (#161B22) - Slightly lighter
- `dark.surfaceVariant`: Surface variant (#21262D) - For cards/containers
- `dark.border`: Subtle borders (#30363D)
- `dark.borderLight`: Lighter borders (#21262D)

#### Text Colors - High Contrast

- `text.primary`: Primary text (#F0F6FC) - High contrast white
- `text.secondary`: Secondary text (#8B949E) - Muted gray
- `text.tertiary`: Tertiary text (#6E7681) - More muted
- `text.inverse`: Inverse text (#0D1117) - Dark text on light backgrounds

#### Tab Bar Colors - Dark Optimized

- `tabBar.background`: Dark surface background
- `tabBar.border`: Subtle border color
- `tabBar.active`: Bright blue for active state
- `tabBar.inactive`: Muted gray for inactive state

#### Semantic Colors

- `success`: Success color (#28A745)
- `warning`: Warning color (#FFC107)
- `error`: Error color (#DC3545)
- `info`: Info color (#17A2B8)

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
