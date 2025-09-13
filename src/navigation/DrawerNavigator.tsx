import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Home,
  Video,
  Radio,
  Phone,
  Monitor,
  Settings,
  Menu,
  X,
} from 'lucide-react-native';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import AgoraScreen from '../screens/AgoraScreen';
import LiveStreamScreen from '../screens/LiveStreamScreen';
import VideoCallScreen from '../screens/VideoCallScreen';
import AudioCallScreen from '../screens/AudioCallScreen';
import ScreenShareScreen from '../screens/ScreenShareScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { Colors, getThemeColors } from '../constants';
import { RootDrawerParamList } from './types';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

// Custom drawer content component
const CustomDrawerContent = (props: any) => {
  const isDarkMode = true;
  const themeColors = getThemeColors(isDarkMode);

  return (
    <View
      style={[styles.drawerContainer, { backgroundColor: themeColors.surface }]}
    >
      <View style={styles.drawerHeader}>
        <Text style={[styles.drawerTitle, { color: themeColors.textPrimary }]}>
          Agora
        </Text>
        <Text
          style={[styles.drawerSubtitle, { color: themeColors.textSecondary }]}
        >
          Video & Audio Platform
        </Text>
      </View>

      <View style={styles.drawerContent}>
        {props.state.routes.map((route: any, index: number) => {
          const { options } = props.descriptors[route.key];
          const isFocused = props.state.index === index;

          const onPress = () => {
            const event = props.navigation.emit({
              type: 'drawerItemPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!event.defaultPrevented) {
              props.navigation.navigate(route.name);
            }
          };

          const getIcon = (routeName: string) => {
            switch (routeName) {
              case 'Home':
                return Home;
              case 'Agora':
                return Video;
              case 'LiveStream':
                return Radio;
              case 'VideoCall':
                return Video;
              case 'AudioCall':
                return Phone;
              case 'ScreenShare':
                return Monitor;
              case 'Settings':
                return Settings;
              default:
                return Home;
            }
          };

          const IconComponent = getIcon(route.name);

          return (
            <TouchableOpacity
              key={route.key}
              style={[
                styles.drawerItem,
                isFocused && { backgroundColor: Colors.highlight },
              ]}
              onPress={onPress}
            >
              <View style={styles.drawerItemContent}>
                <IconComponent
                  size={24}
                  color={isFocused ? Colors.primary : themeColors.textSecondary}
                />
                <Text
                  style={[
                    styles.drawerItemText,
                    {
                      color: isFocused
                        ? Colors.primary
                        : themeColors.textPrimary,
                    },
                  ]}
                >
                  {options.title || route.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const DrawerNavigator = () => {
  const isDarkMode = true;
  const themeColors = getThemeColors(isDarkMode);

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: themeColors.surface,
          width: 280,
        },
        drawerActiveTintColor: Colors.primary,
        drawerInactiveTintColor: themeColors.textSecondary,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name="Agora"
        component={AgoraScreen}
        options={{
          title: 'Agora Overview',
        }}
      />
      <Drawer.Screen
        name="LiveStream"
        component={LiveStreamScreen}
        options={{
          title: 'Live Stream',
        }}
      />
      <Drawer.Screen
        name="VideoCall"
        component={VideoCallScreen}
        options={{
          title: 'Video Call',
        }}
      />
      <Drawer.Screen
        name="AudioCall"
        component={AudioCallScreen}
        options={{
          title: 'Audio Call',
        }}
      />
      <Drawer.Screen
        name="ScreenShare"
        component={ScreenShareScreen}
        options={{
          title: 'Screen Share',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerHeader: {
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  drawerSubtitle: {
    fontSize: 14,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 20,
  },
  drawerItem: {
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
  },
  drawerItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  drawerItemText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 16,
  },
});

export default DrawerNavigator;
