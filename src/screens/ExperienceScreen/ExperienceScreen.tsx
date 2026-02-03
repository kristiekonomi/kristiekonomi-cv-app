import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/Card';
import { SectionTitle } from '../../components/SectionTitle';
import { useTheme } from '../../context/ThemeContext';
import { experienceData } from '../../data/cvData';

export const ExperienceScreen: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: isDark ? '#151718' : '#f5f5f5' }]}
      edges={['top']}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
      <SectionTitle title="Work Experience" />
      {experienceData.map((experience) => (
        <Card key={experience.id} style={styles.experienceCard}>
          <View style={styles.experienceHeader}>
            <View style={[styles.iconContainer, { backgroundColor: isDark ? '#1E3A5F' : '#E3F2FD' }]}>
              <Ionicons name="briefcase" size={24} color="#007AFF" />
            </View>
            <View style={styles.experienceInfo}>
              <Text style={[styles.jobTitle, { color: isDark ? '#ECEDEE' : '#1a1a1a' }]}>
                {experience.jobTitle}
              </Text>
              <Text style={[styles.company, { color: isDark ? '#9BA1A6' : '#666' }]}>
                {experience.company}
              </Text>
              <Text style={[styles.dateRange, { color: isDark ? '#687076' : '#999' }]}>
                {experience.dateRange}
              </Text>
            </View>
          </View>
          <View style={styles.responsibilitiesContainer}>
            {experience.responsibilities.map((responsibility, index) => (
              <View key={index} style={styles.responsibilityItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={[styles.responsibilityText, { color: isDark ? '#ECEDEE' : '#333' }]}>
                  {responsibility}
                </Text>
              </View>
            ))}
          </View>
        </Card>
      ))}
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
  experienceCard: {
    marginBottom: 16,
  },
  experienceHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  experienceInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  company: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  dateRange: {
    fontSize: 14,
  },
  responsibilitiesContainer: {
    marginTop: 8,
  },
  responsibilityItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#007AFF',
    marginRight: 8,
    fontWeight: '700',
  },
  responsibilityText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
});
