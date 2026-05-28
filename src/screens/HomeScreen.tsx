import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import {
  Home,
  Video,
  Radio,
  Phone,
  Monitor,
  Menu,
  ChevronRight,
  PanelLeftOpen,
} from 'lucide-react-native';
import { Colors, getThemeColors } from '../constants';
import type { RootDrawerParamList } from '../navigation/types';

type HomeNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Home'>;

type FeatureItem = {
  route: keyof RootDrawerParamList;
  title: string;
  description: string;
  icon: typeof Home;
  color: string;
};

const FEATURES: FeatureItem[] = [
  {
    route: 'LiveStream',
    title: 'Live Stream',
    description: 'Broadcast to your audience',
    icon: Radio,
    color: Colors.primary,
  },
  {
    route: 'VideoCall',
    title: 'Video Call',
    description: '1-on-1 or group video',
    icon: Video,
    color: Colors.primary,
  },
  {
    route: 'AudioCall',
    title: 'Audio Call',
    description: 'Audio-only conversations',
    icon: Phone,
    color: Colors.accent,
  },
  {
    route: 'ScreenShare',
    title: 'Screen Share',
    description: 'Share your screen (Android)',
    icon: Monitor,
    color: Colors.primaryLight,
  },
];

const HomeScreen = () => {
  const themeColors = getThemeColors(true);
  const navigation = useNavigation<HomeNavigationProp>();

  const openDrawer = () => navigation.openDrawer();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeColors.background }]}
      edges={['top']}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.menuButton, { backgroundColor: themeColors.surface }]}
          onPress={openDrawer}
          accessibilityRole="button"
          accessibilityLabel="Open navigation menu"
        >
          <Menu size={24} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={[styles.headerTitle, { color: themeColors.textPrimary }]}>
            Agora
          </Text>
          <Text
            style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}
          >
            Home
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.drawerHint, { backgroundColor: themeColors.surface }]}
        onPress={openDrawer}
        activeOpacity={0.85}
      >
        <PanelLeftOpen size={20} color={Colors.primary} />
        <View style={styles.drawerHintText}>
          <Text style={[styles.drawerHintTitle, { color: themeColors.textPrimary }]}>
            Side menu available
          </Text>
          <Text
            style={[
              styles.drawerHintSubtitle,
              { color: themeColors.textSecondary },
            ]}
          >
            Tap here or swipe from the left edge to open all features
          </Text>
        </View>
        <ChevronRight size={20} color={themeColors.textSecondary} />
      </TouchableOpacity>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeBlock}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: themeColors.surface },
            ]}
          >
            <Home size={40} color={Colors.primary} />
          </View>
          <Text style={[styles.title, { color: themeColors.textPrimary }]}>
            Welcome
          </Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            Pick a feature below to get started
          </Text>
        </View>

        <Text style={[styles.sectionLabel, { color: themeColors.textSecondary }]}>
          FEATURES
        </Text>

        {FEATURES.map(item => {
          const Icon = item.icon;
          return (
            <TouchableOpacity
              key={item.route}
              style={[styles.featureCard, { backgroundColor: themeColors.surface }]}
              onPress={() => navigation.navigate(item.route)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.featureIcon,
                  { backgroundColor: `${item.color}22` },
                ]}
              >
                <Icon size={26} color={item.color} />
              </View>
              <View style={styles.featureContent}>
                <Text
                  style={[styles.featureTitle, { color: themeColors.textPrimary }]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.featureDescription,
                    { color: themeColors.textSecondary },
                  ]}
                >
                  {item.description}
                </Text>
              </View>
              <ChevronRight size={22} color={themeColors.textSecondary} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 14,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: { flex: 1 },
  headerTitle: { fontSize: 22, fontWeight: '700' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  drawerHint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 8,
    padding: 14,
    borderRadius: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(10, 132, 255, 0.35)',
  },
  drawerHintText: { flex: 1 },
  drawerHintTitle: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  drawerHintSubtitle: { fontSize: 13, lineHeight: 18 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 24 },
  welcomeBlock: { alignItems: 'center', paddingVertical: 20 },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: { fontSize: 26, fontWeight: 'bold' },
  subtitle: {
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 12,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 4,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  featureContent: { flex: 1 },
  featureTitle: { fontSize: 16, fontWeight: '600', marginBottom: 2 },
  featureDescription: { fontSize: 13, lineHeight: 18 },
});

export default HomeScreen;
