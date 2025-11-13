import { COURSE_OPTIONS } from '../constants/courses';
import { CourseId, CourseSummary, MenuItem } from '../types/menu';

export const calculateCourseSummaries = (items: MenuItem[]): CourseSummary[] => {
  const summaries: CourseSummary[] = COURSE_OPTIONS.map((option) => ({
    course: option.id,
    count: 0,
    averagePrice: 0,
    totalPrice: 0,
  }));

  for (const item of items) {
    const summary = summaries.find((entry) => entry.course === item.course);
    if (!summary) {
      continue;
    }

    summary.count += 1;
    summary.totalPrice += item.price;
  }

  for (const summary of summaries) {
    if (summary.count > 0) {
      summary.averagePrice = parseFloat(
        (summary.totalPrice / summary.count).toFixed(2),
      );
    }
  }

  return summaries;
};

export const filterMenuByCourse = (
  items: MenuItem[],
  course: CourseId | 'all',
): MenuItem[] => {
  if (course === 'all') {
    return items;
  }

  return items.filter((item) => item.course === course);
};

