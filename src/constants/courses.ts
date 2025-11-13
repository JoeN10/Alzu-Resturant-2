import { CourseId } from '../types/menu';

export interface CourseOption {
  id: CourseId;
  label: string;
  description: string;
}

export const COURSE_OPTIONS: CourseOption[] = [
  {
    id: 'starter',
    label: 'Starter',
    description: 'Kick off with something light and flavourful.',
  },
  {
    id: 'main',
    label: 'Main Course',
    description: 'Hearty plates designed to satisfy every guest.',
  },
  {
    id: 'dessert',
    label: 'Dessert',
    description: 'Sweet endings and indulgent treats.',
  },
  {
    id: 'beverage',
    label: 'Beverage',
    description: 'Refreshing drinks and crafted cocktails.',
  },
];

export const getCourseLabel = (course: CourseId): string => {
  const option = COURSE_OPTIONS.find((item) => item.id === course);
  return option?.label ?? course;
};

