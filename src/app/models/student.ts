export interface Student {
  id?: number;
  name: string;
  email: string;
  selectedCourses: Course[];
}

export interface Course {
  id: number;
  name: string;
  credits: number;
  professor: Professor;
}

export interface Professor {
  id: number;
  name: string;
  courses: Course[];
}