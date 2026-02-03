import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/Card';
import { SectionTitle } from '../../components/SectionTitle';
import { useTheme } from '../../context/ThemeContext';
import { educationData } from '../../data/cvData';

export const EducationScreen: React.FC = () => {
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
      <SectionTitle title="Education" />
      {educationData.map((education) => (
        <Card key={education.id} style={styles.educationCard}>
          <View style={styles.educationHeader}>
            <View style={[styles.iconContainer, { backgroundColor: isDark ? '#1E3A5F' : '#E3F2FD' }]}>
              <Ionicons name="school" size={24} color="#007AFF" />
            </View>
            <View style={styles.educationInfo}>
              <Text style={[styles.degree, { color: isDark ? '#ECEDEE' : '#1a1a1a' }]}>
                {education.degree}
              </Text>
              <Text style={[styles.institution, { color: isDark ? '#9BA1A6' : '#666' }]}>
                {education.institution}
              </Text>
              <Text style={[styles.dateRange, { color: isDark ? '#687076' : '#999' }]}>
                {education.dateRange}
              </Text>
            </View>
          </View>
          {education.coursework && education.coursework.length > 0 && (
            <View style={[styles.section, { borderTopColor: isDark ? '#333' : '#e0e0e0' }]}>
              <Text style={[styles.sectionTitle, { color: isDark ? '#9BA1A6' : '#666' }]}>
                Relevant Coursework:
              </Text>
              {education.coursework.map((course, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={[styles.listText, { color: isDark ? '#ECEDEE' : '#333' }]}>
                    {course}
                  </Text>
                </View>
              ))}
            </View>
          )}
          {education.achievements && education.achievements.length > 0 && (
            <View style={[styles.section, { borderTopColor: isDark ? '#333' : '#e0e0e0' }]}>
              <Text style={[styles.sectionTitle, { color: isDark ? '#9BA1A6' : '#666' }]}>
                Achievements:
              </Text>
              {education.achievements.map((achievement, index) => (
                <View key={index} style={styles.listItem}>
                  <Ionicons name="trophy" size={16} color="#FFB800" style={styles.achievementIcon} />
                  <Text style={[styles.listText, { color: isDark ? '#ECEDEE' : '#333' }]}>
                    {achievement}
                  </Text>
                </View>
              ))}
            </View>
          )}
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
  educationCard: {
    marginBottom: 16,
  },
  educationHeader: {
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
  educationInfo: {
    flex: 1,
  },
  degree: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  institution: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  dateRange: {
    fontSize: 14,
  },
  section: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 16,
    color: '#007AFF',
    marginRight: 8,
    fontWeight: '700',
  },
  achievementIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  listText: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
});
