import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/Card';
import { SectionTitle } from '../../components/SectionTitle';
import { useTheme } from '../../context/ThemeContext';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface SettingItemProps {
  title: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
  isDark: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({
  title,
  subtitle,
  icon,
  onPress,
  rightComponent,
  isDark,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const Component = onPress ? AnimatedTouchableOpacity : View;

  return (
    <Component
      style={onPress ? animatedStyle : undefined}
      onPress={onPress}
      onPressIn={onPress ? handlePressIn : undefined}
      onPressOut={onPress ? handlePressOut : undefined}
      activeOpacity={onPress ? 0.7 : undefined}
    >
      <View
        style={[
          styles.settingItem,
          { backgroundColor: isDark ? '#1E1E1E' : '#ffffff', borderColor: isDark ? '#333' : '#e0e0e0' },
        ]}
      >
        <View style={[styles.iconContainer, { backgroundColor: isDark ? '#1E3A5F' : '#E3F2FD' }]}>
          <Ionicons name={icon} size={20} color="#007AFF" />
        </View>
        <View style={styles.settingContent}>
          <Text style={[styles.settingTitle, { color: isDark ? '#ECEDEE' : '#1a1a1a' }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.settingSubtitle, { color: isDark ? '#9BA1A6' : '#666' }]}>
              {subtitle}
            </Text>
          )}
        </View>
        {rightComponent && <View style={styles.rightComponent}>{rightComponent}</View>}
        {onPress && (
          <Ionicons
            name="chevron-forward"
            size={20}
            color={isDark ? '#9BA1A6' : '#999'}
            style={styles.chevron}
          />
        )}
      </View>
    </Component>
  );
};

export const SettingsScreen: React.FC = () => {
  const { themeMode, isDark, setThemeMode } = useTheme();
  // const [language, setLanguage] = useState('English');
  // const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);

  // const handleLanguagePress = () => {
  //   setIsLanguageModalVisible(true);
  // };

  // const handleLanguageSelect = (selectedLanguage: string) => {
  //   setLanguage(selectedLanguage);
  // };

  const getThemeLabel = () => {
    if (themeMode === 'auto') return 'Auto (System)';
    return themeMode === 'dark' ? 'Dark' : 'Light';
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: isDark ? '#151718' : '#f5f5f5' }]}
      edges={['top']}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <SectionTitle title="Settings" />

        <Card>
          <Text style={[styles.sectionLabel, { color: isDark ? '#9BA1A6' : '#666' }]}>
            Appearance
          </Text>
          <View style={styles.settingsList}>
            <SettingItem
              title="Theme"
              subtitle={getThemeLabel()}
              icon="color-palette-outline"
              isDark={isDark}
              rightComponent={
                <View style={styles.themeOptions}>
                  <TouchableOpacity
                    onPress={() => setThemeMode('light')}
                    style={[
                      styles.themeOption,
                      themeMode === 'light' && styles.themeOptionActive,
                      { borderColor: isDark ? '#333' : '#e0e0e0' },
                    ]}
                  >
                    <Ionicons
                      name="sunny"
                      size={18}
                      color={themeMode === 'light' ? '#007AFF' : isDark ? '#9BA1A6' : '#999'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setThemeMode('dark')}
                    style={[
                      styles.themeOption,
                      themeMode === 'dark' && styles.themeOptionActive,
                      { borderColor: isDark ? '#333' : '#e0e0e0' },
                    ]}
                  >
                    <Ionicons
                      name="moon"
                      size={18}
                      color={themeMode === 'dark' ? '#007AFF' : isDark ? '#9BA1A6' : '#999'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setThemeMode('auto')}
                    style={[
                      styles.themeOption,
                      themeMode === 'auto' && styles.themeOptionActive,
                      { borderColor: isDark ? '#333' : '#e0e0e0' },
                    ]}
                  >
                    <Ionicons
                      name="phone-portrait-outline"
                      size={18}
                      color={themeMode === 'auto' ? '#007AFF' : isDark ? '#9BA1A6' : '#999'}
                    />
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        </Card>

        {/* <Card>
          <Text style={[styles.sectionLabel, { color: isDark ? '#9BA1A6' : '#666' }]}>
            Language & Region
          </Text>
          <View style={styles.settingsList}>
            <SettingItem
              title="Language"
              subtitle={language}
              icon="language-outline"
              onPress={handleLanguagePress}
              isDark={isDark}
            />
          </View>
        </Card> */}

        <Card>
          <Text style={[styles.sectionLabel, { color: isDark ? '#9BA1A6' : '#666' }]}>
            About
          </Text>
          <View style={styles.settingsList}>
            <SettingItem
              title="Version"
              subtitle="1.0.0"
              icon="information-circle-outline"
              isDark={isDark}
            />
          </View>
        </Card>
      </ScrollView>
      {/* <LanguageModal
        visible={isLanguageModalVisible}
        onClose={() => setIsLanguageModalVisible(false)}
        selectedLanguage={language}
        onSelect={handleLanguageSelect}
        isDark={isDark}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  settingsList: {
    gap: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
  },
  rightComponent: {
    marginRight: 8,
  },
  chevron: {
    marginLeft: 8,
  },
  themeOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  themeOption: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeOptionActive: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
});
