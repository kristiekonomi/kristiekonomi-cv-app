import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const TabButton: React.FC<{
  route: any;
  index: number;
  isFocused: boolean;
  options: any;
  onPress: () => void;
  onLongPress: () => void;
  label: string;
  isDark: boolean;
}> = ({
  route,
  isFocused,
  onPress,
  onLongPress,
  label,
  isDark,
}) => {
  const scale = useSharedValue(isFocused ? 1 : 0.9);
  const backgroundColor = useSharedValue(isFocused ? 1 : 0);
  const iconScale = useSharedValue(isFocused ? 1.1 : 1);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0.9, {
      damping: 15,
      stiffness: 150,
    });
    backgroundColor.value = withTiming(isFocused ? 1 : 0, {
      duration: 200,
    });
    iconScale.value = withSpring(isFocused ? 1.1 : 1, {
      damping: 15,
      stiffness: 150,
    });
  }, [isFocused]);

  const containerStyle = useAnimatedStyle(() => {
    const bgColor = interpolateColor(
      backgroundColor.value,
      [0, 1],
      [isDark ? 'rgba(30, 58, 95, 0)' : 'rgba(227, 242, 253, 0)', isDark ? '#1E3A5F' : '#E3F2FD']
    );
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: bgColor,
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: iconScale.value }],
    };
  });

  let iconName: keyof typeof Ionicons.glyphMap;
  if (route.name === 'Profile') {
    iconName = isFocused ? 'person' : 'person-outline';
  } else if (route.name === 'Experience') {
    iconName = isFocused ? 'briefcase' : 'briefcase-outline';
  } else if (route.name === 'Projects') {
    iconName = isFocused ? 'code' : 'code-outline';
  } else if (route.name === 'Education') {
    iconName = isFocused ? 'school' : 'school-outline';
  } else if (route.name === 'Settings') {
    iconName = isFocused ? 'settings' : 'settings-outline';
  } else {
    iconName = 'help-outline';
  }

  return (
    <AnimatedTouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabButton}
      activeOpacity={0.7}
    >
      <Animated.View style={[styles.iconContainer, containerStyle]}>
        <Animated.View style={iconStyle}>
          <Ionicons
            name={iconName}
            size={24}
            color={isFocused ? '#007AFF' : isDark ? '#9BA1A6' : '#999'}
          />
        </Animated.View>
      </Animated.View>
      <Text
        style={[
          styles.label,
          {
            color: isFocused
              ? '#007AFF'
              : isDark
              ? '#9BA1A6'
              : '#999',
          },
        ]}
      >
        {label}
      </Text>
    </AnimatedTouchableOpacity>
  );
};

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { isDark } = useTheme();

  return (
    <View style={styles.safeArea}>
      <SafeAreaView edges={['bottom']} style={styles.safeAreaInner}>
        <View style={styles.tabBarWrapper}>
        <View
          style={[
            styles.tabBarContainer,
            {
              backgroundColor: isDark ? '#1E1E1E' : '#ffffff',
              shadowColor: isDark ? '#000' : '#000',
            },
          ]}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TabButton
                key={route.key}
                route={route}
                index={index}
                isFocused={isFocused}
                options={options}
                onPress={onPress}
                onLongPress={onLongPress}
                label={label}
                isDark={isDark}
              />
            );
          })}
        </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  safeAreaInner: {
    backgroundColor: 'transparent',
  },
  tabBarWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  tabBarContainer: {
    flexDirection: 'row',
    height: 70,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 5,
    borderRadius: 25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
});
