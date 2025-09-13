import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Video } from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import AgoraScreen from '../screens/AgoraScreen';
import { RootTabParamList } from './types';
import { Colors, getThemeColors } from '../constants';

const Tab = createBottomTabNavigator<RootTabParamList>();

// Icon components defined outside render to avoid React warnings
const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <Home size={size} color={color} />
);

const VideoIcon = ({ color, size }: { color: string; size: number }) => (
  <Video size={size} color={color} />
);

const TabNavigator = () => {
  // Force dark mode for consistent theming
  const isDarkMode = true;
  const themeColors = getThemeColors(isDarkMode);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.tabBar.active,
        tabBarInactiveTintColor: Colors.tabBar.inactive,
        tabBarStyle: {
          backgroundColor: themeColors.tabBarBackground,
          borderTopColor: themeColors.tabBarBorder,
          borderTopWidth: 0.5,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerStyle: {
          backgroundColor: themeColors.surface,
        },
        headerTintColor: themeColors.textPrimary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Agora"
        component={AgoraScreen}
        options={{
          tabBarIcon: VideoIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
