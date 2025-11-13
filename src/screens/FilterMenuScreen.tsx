import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COURSE_OPTIONS } from '../constants/courses';
import { useMenu } from '../context/MenuContext';
import { CourseId } from '../types/menu';
import { filterMenuByCourse } from '../utils/menuStats';
import { MenuList } from '../components/MenuList';

type FilterValue = CourseId | 'all';

export const FilterMenuScreen: React.FC = () => {
  const { items } = useMenu();
  const [selectedFilter, setSelectedFilter] = useState<FilterValue>('all');

  const filteredItems = useMemo(
    () => filterMenuByCourse(items, selectedFilter),
    [items, selectedFilter],
  );

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Explore the Menu</Text>
        <Text style={styles.heroSubtitle}>
          Filter by course to plan your dining experience.
        </Text>
      </View>

      <View style={styles.filterGroup}>
        {(['all', ...COURSE_OPTIONS.map((option) => option.id)] as FilterValue[]).map(
          (filter) => {
            const label =
              filter === 'all'
                ? 'All Courses'
                : COURSE_OPTIONS.find((item) => item.id === filter)?.label ?? filter;
            const isActive = selectedFilter === filter;

            return (
              <TouchableOpacity
                key={filter}
                style={[styles.filterButton, isActive && styles.filterButtonActive]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[styles.filterText, isActive && styles.filterTextActive]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          },
        )}
      </View>

      <MenuList
        items={filteredItems}
        emptyMessage="No dishes match this course yet. Ask the chef for a recommendation!"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FBFA',
    padding: 20,
  },
  hero: {
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#003C33',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#546E7A',
    lineHeight: 20,
  },
  filterGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#80CBC4',
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    marginBottom: 10,
  },
  filterButtonActive: {
    backgroundColor: '#004D40',
    borderColor: '#004D40',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#004D40',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
});

