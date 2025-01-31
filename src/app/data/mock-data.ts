import { Course } from "../models/course";
import { Professor } from "../models/professor";

export const PROFESSORS: Professor[] = [
  { id: 1, name: 'Dr. Smith', courses: [] },
  { id: 2, name: 'Dr. Johnson', courses: [] },
  { id: 3, name: 'Dr. Williams', courses: [] },
  { id: 4, name: 'Dr. Brown', courses: [] },
  { id: 5, name: 'Dr. Davis', courses: [] },
];

// export const COURSES: Course[] = [
//   { id: 1, name: 'Mathematics', credits: 3, professors: PROFESSORS[0] },
//   { id: 2, name: 'Physics', credits: 3, professors[0]: PROFESSORS[0] },
//   { id: 3, name: 'Chemistry', credits: 3, professors[0]: PROFESSORS[1] },
//   { id: 4, name: 'Biology', credits: 3, professors[0]: PROFESSORS[1] },
//   { id: 5, name: 'History', credits: 3, professors[0]: PROFESSORS[2] },
//   { id: 6, name: 'Literature', credits: 3, professors[0]: PROFESSORS[2] },
//   { id: 7, name: 'Computer Science', credits: 3, professors[0]: PROFESSORS[3] },
//   { id: 8, name: 'Economics', credits: 3, professors[0]: PROFESSORS[3] },
//   { id: 9, name: 'Psychology', credits: 3, professors[0]: PROFESSORS[4] },
//   { id: 10, name: 'Sociology', credits: 3, professors[0]: PROFESSORS[4] },
// ];