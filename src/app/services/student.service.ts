import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student, Course } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [];
  private studentsSubject = new BehaviorSubject<Student[]>([]);

  constructor() {}

  getStudents(): Observable<Student[]> {
    return this.studentsSubject.asObservable();
  }

  addStudent(student: Student) {
    student.id = this.students.length + 1;
    this.students.push(student);
    this.studentsSubject.next([...this.students]);
  }

  updateStudent(student: Student) {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      this.students[index] = student;
      this.studentsSubject.next([...this.students]);
    }
  }

  deleteStudent(id: number) {
    this.students = this.students.filter(s => s.id !== id);
    this.studentsSubject.next([...this.students]);
  }

  getStudentsByCourse(course: Course): Student[] {
    return this.students.filter(student => 
      student.selectedCourses.some(c => c.id === course.id)
    );
  }
}