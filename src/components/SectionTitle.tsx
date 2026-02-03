import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface SectionTitleProps {
  title: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  const { isDark } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: isDark ? '#ECEDEE' : '#1a1a1a' }]}>{title}</Text>
      <View style={styles.underline} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  underline: {
    height: 3,
    width: 50,
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
});
