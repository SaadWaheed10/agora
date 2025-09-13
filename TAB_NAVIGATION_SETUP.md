# Bottom Tab Navigation Setup

This document describes the bottom tab navigation implementation for the Agora React Native app.

## Features Implemented

- **Bottom Tab Navigation**: Two tabs (Home and Agora)
- **Lucide React Native Icons**: Home and Video icons for the tabs
- **Dark/Light Mode Support**: Automatic theme switching based on system preferences
- **Safe Area Support**: Proper handling of device safe areas

## Dependencies Added

- `@react-navigation/native`: Core navigation library
- `@react-navigation/bottom-tabs`: Bottom tab navigator
- `react-native-screens`: Native screen optimization
- `react-native-gesture-handler`: Touch gesture handling
- `lucide-react-native`: Icon library

## File Structure

```
src/
  constants/
    colors.ts          # Color system and theme definitions
    index.ts           # Constants barrel exports
    README.md          # Constants documentation
  navigation/
    AppNavigator.tsx   # Main navigation container
    TabNavigator.tsx   # Bottom tab navigator
    types.ts          # Navigation type definitions
    index.ts          # Navigation barrel exports
    README.md         # Navigation documentation
  screens/
    HomeScreen.tsx    # Home tab screen
    AgoraScreen.tsx   # Agora tab screen
App.tsx              # Main app component
```

## Tab Configuration

- **Home Tab**: Uses Home icon from Lucide
- **Agora Tab**: Uses Video icon from Lucide
- **Active Color**: Uses centralized color constants
- **Inactive Color**: Uses centralized color constants

## Color System

The app uses a centralized color system located in `src/constants/colors.ts`:

- **Theme Support**: Automatic dark/light mode switching
- **Consistent Colors**: All colors defined in one place
- **Type Safety**: TypeScript support for all color values
- **Easy Maintenance**: Change colors globally by updating constants

### Key Features

- Primary colors for brand elements
- Secondary colors for accents
- Neutral gray scale (50-900)
- iOS system colors
- Theme-aware color helpers
- Tab bar specific colors

## Running the App

```bash
# Install dependencies
npm install

# iOS
npm run ios
# or
cd ios && pod install && cd .. && npm run ios

# Android
npm run android
```

## Next Steps

The basic tab navigation is now set up. You can:

1. Add more functionality to the Home and Agora screens
2. Implement actual Agora video calling features
3. Add more tabs if needed
4. Customize the tab bar appearance further
