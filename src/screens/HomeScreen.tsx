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
import { ChevronRight, PanelLeftOpen } from 'lucide-react-native';
import { Colors, getThemeColors } from '../constants';
import type { RootDrawerParamList } from '../navigation/types';
import {
  AGORA_FEATURES,
  AGORA_FEATURE_CATEGORIES,
  type AgoraFeatureCategory,
} from '../constants/agoraFeatures';

type HomeNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Home'>;

const HomeScreen = () => {
  const themeColors = getThemeColors(true);
  const navigation = useNavigation<HomeNavigationProp>();

  const openDrawer = () => navigation.openDrawer();

  const byCategory = (cat: AgoraFeatureCategory) =>
    AGORA_FEATURES.filter(f => f.category === cat);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeColors.background }]}
      edges={['bottom', 'left', 'right']}
    >
      <TouchableOpacity
        style={[styles.drawerHint, { backgroundColor: themeColors.surface }]}
        onPress={openDrawer}
      >
        <PanelLeftOpen size={20} color={Colors.primary} />
        <Text style={[styles.drawerHintText, { color: themeColors.textSecondary }]}>
          Swipe from the left or tap menu for all demos
        </Text>
        <ChevronRight size={20} color={themeColors.textSecondary} />
      </TouchableOpacity>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {AGORA_FEATURE_CATEGORIES.map(category => (
          <View key={category}>
            <Text
              style={[styles.sectionLabel, { color: themeColors.textSecondary }]}
            >
              {category.toUpperCase()}
            </Text>
            {byCategory(category).map(item => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={item.route}
                  style={[
                    styles.featureCard,
                    { backgroundColor: themeColors.surface },
                  ]}
                  onPress={() => navigation.navigate(item.route)}
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
                      style={[
                        styles.featureTitle,
                        { color: themeColors.textPrimary },
                      ]}
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
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  drawerHint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(10, 132, 255, 0.35)',
  },
  drawerHintText: { flex: 1, fontSize: 13 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 32 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 16,
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
