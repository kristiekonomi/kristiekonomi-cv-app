import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/Card';
import { SectionTitle } from '../../components/SectionTitle';
import { useTheme } from '../../context/ThemeContext';

export const ProjectsScreen: React.FC = () => {
  const { isDark } = useTheme();
  const navigation = useNavigation();

  const handleGamePress = () => {
    navigation.navigate('SnakeGame' as never);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: isDark ? '#151718' : '#f5f5f5' }]}
      edges={['top']}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
      <SectionTitle title="Projects" />
      
      <Card style={styles.projectCard}>
        <TouchableOpacity onPress={handleGamePress} activeOpacity={0.7} style={styles.gameButton}>
          <View style={styles.projectHeader}>
            <View style={[styles.iconContainer, { backgroundColor: isDark ? '#1E3A5F' : '#E3F2FD' }]}>
              <Ionicons name="game-controller-outline" size={24} color="#007AFF" />
            </View>
            <View style={styles.projectInfo}>
              <Text style={[styles.projectName, { color: isDark ? '#ECEDEE' : '#1a1a1a' }]}>
                Snake Game
              </Text>
              <Text style={[styles.description, { color: isDark ? '#ECEDEE' : '#333' }]}>
                Play the classic Snake game! Control the snake, eat food, and avoid collisions.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={isDark ? '#9BA1A6' : '#999'} />
          </View>
        </TouchableOpacity>
      </Card>
      </ScrollView>
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
  projectCard: {
    marginBottom: 16,
  },
  gameButton: {
    width: '100%',
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
});
