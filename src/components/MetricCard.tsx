import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  accentColor?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  accentColor = '#004D40',
}) => (
  <View style={[styles.card, { borderLeftColor: accentColor }]}>
    <Text style={[styles.title, { color: accentColor }]}>{title}</Text>
    <Text style={styles.value}>{value}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    color: '#263238',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#607D8B',
  },
});

