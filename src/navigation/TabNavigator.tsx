import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { CustomTabBar } from '../components/CustomTabBar';
import { EducationScreen } from '../screens/EducationScreen/EducationScreen';
import { ExperienceScreen } from '../screens/ExperienceScreen/ExperienceScreen';
import { ProfileScreen } from '../screens/ProfileScreen/ProfileScreen';
import { ProjectsScreen } from '../screens/ProjectsScreen/ProjectsScreen';
import { SettingsScreen } from '../screens/SettingsScreen/SettingsScreen';

const Tab = createBottomTabNavigator();

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
      <Tab.Screen
        name="Experience"
        component={ExperienceScreen}
        options={{ tabBarLabel: 'Experience' }}
      />
      <Tab.Screen name="Projects" component={ProjectsScreen} options={{ tabBarLabel: 'Projects' }} />
      <Tab.Screen
        name="Education"
        component={EducationScreen}
        options={{ tabBarLabel: 'Education' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
};
