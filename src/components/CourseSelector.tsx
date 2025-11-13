import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COURSE_OPTIONS } from '../constants/courses';
import { CourseId } from '../types/menu';

interface CourseSelectorProps {
  value: CourseId | '';
  onChange: (course: CourseId) => void;
}

export const CourseSelector: React.FC<CourseSelectorProps> = ({ value, onChange }) => (
  <View>
    {COURSE_OPTIONS.map((course, index) => {
      const isSelected = value === course.id;
      const isLast = index === COURSE_OPTIONS.length - 1;

      return (
        <TouchableOpacity
          key={course.id}
          style={[
            styles.chip,
            isSelected && styles.chipSelected,
            !isLast && styles.chipSpacing,
          ]}
          onPress={() => onChange(course.id)}
        >
          <Text style={[styles.label, isSelected && styles.labelSelected]}>{course.label}</Text>
          <Text style={[styles.helper, isSelected && styles.helperSelected]}>
            {course.description}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderColor: '#B2DFDB',
    borderRadius: 14,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  chipSpacing: {
    marginBottom: 12,
  },
  chipSelected: {
    borderColor: '#00796B',
    backgroundColor: '#E0F2F1',
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#004D40',
    marginBottom: 4,
  },
  labelSelected: {
    color: '#004D40',
  },
  helper: {
    fontSize: 12,
    color: '#607D8B',
  },
  helperSelected: {
    color: '#004D40',
  },
});

