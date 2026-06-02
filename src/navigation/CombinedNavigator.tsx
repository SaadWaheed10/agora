import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Home,
  Video,
  Users,
  Phone,
  Radio,
  Eye,
  Monitor,
  Sparkles,
  BookOpen,
} from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import AgoraGuideScreen from '../screens/AgoraGuideScreen';
import LiveStreamScreen from '../screens/LiveStreamScreen';
import VideoCallScreen from '../screens/VideoCallScreen';
import GroupVideoCallScreen from '../screens/GroupVideoCallScreen';
import AudioCallScreen from '../screens/AudioCallScreen';
import LiveAudienceScreen from '../screens/LiveAudienceScreen';
import ScreenShareScreen from '../screens/ScreenShareScreen';
import BeautyEffectsScreen from '../screens/BeautyEffectsScreen';

import { Colors, getThemeColors } from '../constants';
import { ScreenHeader } from '../components';
import { RootDrawerParamList } from './types';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const ROUTE_SUBTITLES: Partial<Record<keyof RootDrawerParamList, string>> = {
  Home: 'react-native-agora demos for the RN community',
};

const ROUTE_ICONS: Record<keyof RootDrawerParamList, typeof Home> = {
  Home,
  AgoraGuide: BookOpen,
  VideoCall: Video,
  GroupVideoCall: Users,
  AudioCall: Phone,
  LiveStream: Radio,
  LiveAudience: Eye,
  ScreenShare: Monitor,
  BeautyEffects: Sparkles,
};

const CustomDrawerContent = (props: any) => {
  const themeColors = getThemeColors(true);

  return (
    <View
      style={[styles.drawerContainer, { backgroundColor: themeColors.surface }]}
    >
      <View style={styles.drawerHeader}>
        <Text style={[styles.drawerTitle, { color: themeColors.textPrimary }]}>
          Agora SDK
        </Text>
        <Text
          style={[styles.drawerSubtitle, { color: themeColors.textSecondary }]}
        >
          React Native showcase
        </Text>
      </View>

      <View style={styles.drawerContent}>
        {props.state.routes.map((route: any, index: number) => {
          const { options } = props.descriptors[route.key];
          const isFocused = props.state.index === index;
          const IconComponent =
            ROUTE_ICONS[route.name as keyof RootDrawerParamList] ?? Home;

          return (
            <TouchableOpacity
              key={route.key}
              style={[
                styles.drawerItem,
                isFocused && { backgroundColor: Colors.highlight },
              ]}
              onPress={() => {
                const event = props.navigation.emit({
                  type: 'drawerItemPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!event.defaultPrevented) {
                  props.navigation.navigate(route.name);
                }
              }}
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

const CombinedNavigator = () => {
  const themeColors = getThemeColors(true);

  const handleHeaderBack = (
    navigation: { canGoBack: () => boolean; goBack: () => void; navigate: (name: 'Home') => void },
  ) => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation, route }) => {
        const routeName = route.name as keyof RootDrawerParamList;
        const isHome = routeName === 'Home';

        return {
          headerShown: true,
          header: ({ options }) => (
            <ScreenHeader
              title={options.title ?? route.name}
              subtitle={ROUTE_SUBTITLES[routeName]}
              leftAction={isHome ? 'menu' : 'back'}
              onLeftPress={() => {
                if (isHome) {
                  navigation.openDrawer();
                } else {
                  handleHeaderBack(navigation);
                }
              }}
            />
          ),
          swipeEnabled: true,
          swipeEdgeWidth: 48,
          drawerStyle: {
            backgroundColor: themeColors.surface,
            width: 280,
          },
          overlayColor: 'rgba(0, 0, 0, 0.55)',
        };
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Agora Showcase' }}
      />
      <Drawer.Screen
        name="AgoraGuide"
        component={AgoraGuideScreen}
        options={{ title: 'How to Test' }}
      />
      <Drawer.Screen
        name="VideoCall"
        component={VideoCallScreen}
        options={{ title: '1:1 Video Call' }}
      />
      <Drawer.Screen
        name="GroupVideoCall"
        component={GroupVideoCallScreen}
        options={{ title: 'Group Video' }}
      />
      <Drawer.Screen
        name="AudioCall"
        component={AudioCallScreen}
        options={{ title: 'Voice Call' }}
      />
      <Drawer.Screen
        name="LiveStream"
        component={LiveStreamScreen}
        options={{ title: 'Live Host' }}
      />
      <Drawer.Screen
        name="LiveAudience"
        component={LiveAudienceScreen}
        options={{ title: 'Live Audience' }}
      />
      <Drawer.Screen
        name="ScreenShare"
        component={ScreenShareScreen}
        options={{ title: 'Screen Share' }}
      />
      <Drawer.Screen
        name="BeautyEffects"
        component={BeautyEffectsScreen}
        options={{ title: 'Beauty FX' }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: { flex: 1 },
  drawerHeader: {
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  drawerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  drawerSubtitle: { fontSize: 14 },
  drawerContent: { flex: 1, paddingTop: 20 },
  drawerItem: { marginHorizontal: 16, marginVertical: 4, borderRadius: 8 },
  drawerItemContent: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  drawerItemText: { fontSize: 16, fontWeight: '500', marginLeft: 16 },
});

export default CombinedNavigator;
