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
  navigation/
    AppNavigator.tsx    # Main navigation container
    TabNavigator.tsx    # Bottom tab navigator
    types.ts           # Navigation type definitions
    index.ts           # Barrel exports
    README.md          # Navigation documentation
  screens/
    HomeScreen.tsx     # Home tab screen
    AgoraScreen.tsx    # Agora tab screen
App.tsx               # Main app component
```

## Tab Configuration

- **Home Tab**: Uses Home icon from Lucide
- **Agora Tab**: Uses Video icon from Lucide
- **Active Color**: #007AFF (iOS blue)
- **Inactive Color**: #8E8E93 (iOS gray)

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
