import { Course } from "./course";

export interface Professor {
    id: number;
    name: string;
    courses: Course[];
  }