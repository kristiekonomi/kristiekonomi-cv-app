import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/Card';
import { SectionTitle } from '../../components/SectionTitle';
import { useTheme } from '../../context/ThemeContext';
import { educationData, experienceData, profileData } from '../../data/cvData';

export const PrintCVScreen: React.FC = () => {
  const { isDark } = useTheme();
  const navigation = useNavigation();

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${profileData.email}`);
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${profileData.phone}`);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#ffffff' }]}
      edges={['top']}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.title}>Print-Friendly CV</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.printView}>
          <View style={styles.headerSection}>
            <Text style={styles.fullName}>{profileData.fullName}</Text>
            <Text style={styles.jobTitle}>{profileData.jobTitle}</Text>
            <View style={styles.contactInfo}>
              <TouchableOpacity onPress={handleEmailPress} style={styles.contactButton}>
                <Ionicons name="mail-outline" size={16} color="#007AFF" />
                <Text style={styles.contactItem}> {profileData.email}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePhonePress} style={styles.contactButton}>
                <Ionicons name="call-outline" size={16} color="#007AFF" />
                <Text style={styles.contactItem}> {profileData.phone}</Text>
              </TouchableOpacity>
              <View style={styles.contactButton}>
                <Ionicons name="location-outline" size={16} color="#007AFF" />
                <Text style={styles.contactItem}> {profileData.location}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <SectionTitle title="Profile" />
            <Text style={styles.summary}>{profileData.summary}</Text>
          </View>

          <View style={styles.section}>
            <SectionTitle title="Experience" />
            {experienceData.map((experience) => (
              <Card key={experience.id} style={styles.experienceCard}>
                <Text style={styles.jobTitleText}>{experience.jobTitle}</Text>
                <Text style={styles.company}>{experience.company}</Text>
                <Text style={styles.dateRange}>{experience.dateRange}</Text>
                <View style={styles.responsibilitiesContainer}>
                  {experience.responsibilities.map((responsibility, index) => (
                    <View key={index} style={styles.responsibilityItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.responsibilityText}>{responsibility}</Text>
                    </View>
                  ))}
                </View>
              </Card>
            ))}
          </View>

          <View style={styles.section}>
            <SectionTitle title="Education" />
            {educationData.map((education) => (
              <Card key={education.id} style={styles.educationCard}>
                <Text style={styles.degree}>{education.degree}</Text>
                <Text style={styles.institution}>{education.institution}</Text>
                <Text style={styles.dateRange}>{education.dateRange}</Text>
                {education.coursework && education.coursework.length > 0 && (
                  <View style={styles.courseworkContainer}>
                    {education.coursework.map((course, index) => (
                      <View key={index} style={styles.courseworkItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.courseworkText}>{course}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  printView: {
    backgroundColor: '#ffffff',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  fullName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#666',
    marginBottom: 15,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    alignItems: 'center',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  contactItem: {
    fontSize: 14,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  section: {
    marginBottom: 30,
  },
  summary: {
    fontSize: 15,
    lineHeight: 24,
    color: '#333',
    textAlign: 'justify',
  },
  experienceCard: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  jobTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  company: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  dateRange: {
    fontSize: 14,
    color: '#999',
    marginBottom: 12,
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
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    flex: 1,
  },
  educationCard: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  degree: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  institution: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  courseworkContainer: {
    marginTop: 8,
  },
  courseworkItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  courseworkText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#666',
    flex: 1,
  },
});
