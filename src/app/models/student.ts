import { Course } from "./course";

export interface Student {
  id?: number;
  name: string;
  courses: Course[];
}

export class StudentSend {
  name: string;
  courseIds: number[];

  constructor(name: string, courseIds: number[]) {
    this.name = name;
    this.courseIds = courseIds;
  }
}