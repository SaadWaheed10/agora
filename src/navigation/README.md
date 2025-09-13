# Navigation Structure

This folder contains all navigation-related code for the Agora React Native app.

## Files

- **`AppNavigator.tsx`**: Main navigation container that wraps the entire app
- **`TabNavigator.tsx`**: Bottom tab navigation configuration
- **`types.ts`**: TypeScript type definitions for navigation parameters
- **`index.ts`**: Barrel export file for clean imports

## Structure

```
src/navigation/
├── AppNavigator.tsx    # Main navigation container
├── TabNavigator.tsx    # Bottom tab navigator
├── types.ts           # Navigation types
├── index.ts           # Exports
└── README.md          # This file
```

## Usage

```typescript
// Import the main navigator
import { AppNavigator } from './src/navigation';

// Import specific components
import { TabNavigator } from './src/navigation';

// Import types
import { RootTabParamList } from './src/navigation';
```

## Adding New Tabs

1. Add the new screen component to `src/screens/`
2. Import the screen in `TabNavigator.tsx`
3. Add a new `Tab.Screen` component
4. Update the `RootTabParamList` type in `types.ts`
5. Add the appropriate icon from `lucide-react-native`

## Customization

- Tab bar colors and styles are configured in `TabNavigator.tsx`
- Dark/light mode support is automatically handled
- Icons are from the Lucide React Native library
