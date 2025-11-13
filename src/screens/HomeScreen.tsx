import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MetricCard } from '../components/MetricCard';
import { MenuList } from '../components/MenuList';
import { COURSE_OPTIONS } from '../constants/courses';
import { useMenu } from '../context/MenuContext';
import { calculateCourseSummaries } from '../utils/menuStats';

interface HomeScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { items } = useMenu();
  const totalItems = items.length;
  const summaries = calculateCourseSummaries(items);

  const getAccentForCourse = (courseId: string) => {
    switch (courseId) {
      case 'starter':
        return '#FF8A65';
      case 'main':
        return '#4DB6AC';
      case 'dessert':
        return '#BA68C8';
      case 'beverage':
        return '#4FC3F7';
      default:
        return '#00695C';
    }
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/background.jpg')}
      imageStyle={{ opacity: 0.15 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#003c33" />
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Alzu Restaurant</Text>
            <Text style={styles.subtitle}>Polished dining, proudly South African.</Text>
          </View>

          <View style={styles.summaryRow}>
            <MetricCard
              title="Menu Items"
              value={totalItems}
              subtitle="Total dishes currently available"
            />
            <MetricCard
              title="Chef Tools"
              value="Manage"
              subtitle="Add or remove menu items"
              accentColor="#F9A825"
            />
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.primaryButton]}
              onPress={() => navigation.navigate('ManageMenu')}
            >
              <Text style={styles.primaryButtonText}>Chef: Manage Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={() => navigation.navigate('FilterMenu')}
            >
              <Text style={styles.secondaryButtonText}>Guests: Filter Menu</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Average Price Per Course</Text>
            <View style={styles.metricsGrid}>
              {summaries.map((summary) => {
                const courseMeta = COURSE_OPTIONS.find((c) => c.id === summary.course);
                const accent = getAccentForCourse(summary.course);
                return (
                  <View key={summary.course} style={styles.metricWrapper}>
                    <MetricCard
                      title={courseMeta?.label ?? summary.course}
                      value={summary.count > 0 ? `R${summary.averagePrice.toFixed(2)}` : '—'}
                      subtitle={
                        summary.count > 0
                          ? `${summary.count} item${summary.count > 1 ? 's' : ''}`
                          : 'No dishes yet'
                      }
                      accentColor={accent}
                    />
                  </View>
                );
              })}
            </View>
          </View>

          <View style={[styles.section, styles.menuSection]}>
            <Text style={styles.sectionTitle}>Complete Menu</Text>
            <MenuList
              items={items}
              emptyMessage="Use the chef tools to add the first starter, main, dessert, or beverage."
            />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 40, 36, 0.85)',
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'flex-start',
    marginTop: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#C8E6C9',
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricWrapper: {
    width: '48%',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#FFB300',
  },
  primaryButtonText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#3E2723',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#004D40',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#003C33',
    marginBottom: 16,
  },
  metricsCard: {
    marginBottom: 12,
  },
  menuSection: {
    paddingBottom: 10,
  },
});

