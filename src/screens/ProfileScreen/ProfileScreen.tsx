import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/Card';
import { SectionTitle } from '../../components/SectionTitle';
import { useTheme } from '../../context/ThemeContext';
import { currentActivities, historyItems, profileData } from '../../data/cvData';

export const ProfileScreen: React.FC = () => {
  const { isDark } = useTheme();

  const handleEmailPress = async () => {
    const emailUrl = `mailto:${profileData.email}`;
    const canOpen = await Linking.canOpenURL(emailUrl);
    
    if (canOpen) {
      Linking.openURL(emailUrl);
    } else {
      Alert.alert(
        'Email',
        `Email: ${profileData.email}\n\n(Emulator doesn't support email app)`,
        [{ text: 'OK' }]
      );
    }
  };

  const handlePhonePress = async () => {
    const phoneUrl = `tel:${profileData.phone}`;
    const canOpen = await Linking.canOpenURL(phoneUrl);
    
    if (canOpen) {
      Linking.openURL(phoneUrl);
    } else {
      Alert.alert(
        'Phone',
        `Phone: ${profileData.phone}\n\n(Emulator doesn't support phone calls)`,
        [{ text: 'OK' }]
      );
    }
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
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Image
            source={require('../../../assets/images/maleavatar1.svg')}
            style={styles.profilePhoto}
            contentFit="contain"
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.fullName, { color: isDark ? '#ECEDEE' : '#1a1a1a' }]}>
              {profileData.fullName}
            </Text>
            <Text style={[styles.jobTitle, { color: isDark ? '#9BA1A6' : '#666' }]}>
              {profileData.jobTitle}
            </Text>
          </View>
        </View>
      </Card>

      <Card>
        <SectionTitle title="About" />
        <Text style={[styles.summary, { color: isDark ? '#ECEDEE' : '#333' }]}>
          {profileData.summary}
        </Text>
      </Card>

      <Card>
        <SectionTitle title="What I'm Doing" />
        {currentActivities.map((activity) => (
          <View key={activity.id} style={styles.activityItem}>
            <View style={[styles.activityIconContainer, { backgroundColor: isDark ? '#1E3A5F' : '#E3F2FD' }]}>
              <Ionicons name={activity.icon as any} size={20} color="#007AFF" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityTitle, { color: isDark ? '#ECEDEE' : '#1a1a1a' }]}>
                {activity.title}
              </Text>
              <Text style={[styles.activityDescription, { color: isDark ? '#9BA1A6' : '#666' }]}>
                {activity.description}
              </Text>
            </View>
          </View>
        ))}
      </Card>

      <Card>
        <SectionTitle title="History" />
        {historyItems.map((item, index) => (
          <View key={item.id}>
            <View style={styles.historyItem}>
              <View style={styles.historyLeft}>
                <View style={[styles.historyIconContainer, { backgroundColor: isDark ? '#1E3A5F' : '#E3F2FD' }]}>
                  <Ionicons name={item.icon as any} size={18} color="#007AFF" />
                </View>
                {index < historyItems.length - 1 && (
                  <View style={[styles.historyLine, { backgroundColor: isDark ? '#2C2C2E' : '#E5E5EA' }]} />
                )}
              </View>
              <View style={styles.historyContent}>
                <Text style={[styles.historyTitle, { color: isDark ? '#ECEDEE' : '#1a1a1a' }]}>
                  {item.title}
                </Text>
                <Text style={[styles.historyDescription, { color: isDark ? '#9BA1A6' : '#666' }]}>
                  {item.description}
                </Text>
                <Text style={[styles.historyDate, { color: isDark ? '#9BA1A6' : '#999' }]}>
                  {item.date}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </Card>

      <Card>
        <SectionTitle title="Contact Information" />
        <View style={styles.contactButtonsContainer}>
          <TouchableOpacity
            style={[styles.contactButton, { backgroundColor: isDark ? '#1E3A5F' : '#E3F2FD' }]}
            onPress={handleEmailPress}
            activeOpacity={0.7}
          >
            <Ionicons name="mail-outline" size={24} color="#007AFF" />
            <Text style={[styles.contactButtonText, { color: isDark ? '#ECEDEE' : '#1a1a1a' }]}>
              Email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.contactButton, { backgroundColor: isDark ? '#1E3A5F' : '#E3F2FD' }]}
            onPress={handlePhonePress}
            activeOpacity={0.7}
          >
            <Ionicons name="call-outline" size={24} color="#007AFF" />
            <Text style={[styles.contactButtonText, { color: isDark ? '#ECEDEE' : '#1a1a1a' }]}>
              Call
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contactDetails}>
          <View style={styles.contactItem}>
            <Ionicons name="mail-outline" size={20} color="#007AFF" style={styles.contactIcon} />
            <Text style={[styles.contactText, { color: isDark ? '#ECEDEE' : '#333' }]}>
              {profileData.email}
            </Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="call-outline" size={20} color="#007AFF" style={styles.contactIcon} />
            <Text style={[styles.contactText, { color: isDark ? '#ECEDEE' : '#333' }]}>
              {profileData.phone}
            </Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="location-outline" size={20} color="#007AFF" style={styles.contactIcon} />
            <Text style={[styles.contactText, { color: isDark ? '#ECEDEE' : '#333' }]}>
              {profileData.location}
            </Text>
          </View>
        </View>
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
  profileCard: {
    marginBottom: 16,
  },
  profileHeader: {
    alignItems: 'center',
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: '#e0e0e0',
  },
  profileInfo: {
    alignItems: 'center',
  },
  fullName: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
  },
  contactButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  contactDetails: {
    marginTop: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactIcon: {
    marginRight: 12,
  },
  contactText: {
    fontSize: 16,
    flex: 1,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  historyItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  historyLeft: {
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  historyIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  historyLine: {
    position: 'absolute',
    width: 2,
    top: 36,
    bottom: -20,
    left: 17,
  },
  historyContent: {
    flex: 1,
    paddingTop: 2,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  historyDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 12,
    fontWeight: '500',
  },
});
