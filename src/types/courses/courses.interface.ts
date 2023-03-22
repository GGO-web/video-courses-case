import { Course } from './course.interface'

export type Courses = Omit<Course, 'lessons'>[];
