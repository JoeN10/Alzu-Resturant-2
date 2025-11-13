export type CourseId = 'starter' | 'main' | 'dessert' | 'beverage';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: CourseId;
  price: number;
  createdAt: number;
}

export interface CourseSummary {
  course: CourseId;
  count: number;
  averagePrice: number;
  totalPrice: number;
}

