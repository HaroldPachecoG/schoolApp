import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [];
  private apiUrl = 'https://localhost:7074/Courses';
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();


  constructor(private http: HttpClient) {}

  loadCourses(): void {
    this.http.get<Course[]>(this.apiUrl).subscribe(
      (courses) => {
        this.coursesSubject.next(courses);
      },
      (error) => {
        console.error('Error al cargar los cursos: ', error);
      }
    );
  }

  getCourses(): Observable<Course[]> {
    return this.courses$;
  }

  addStudent(student: { name: string; courseIds: number[] }): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, student).pipe(
      tap((newStudent) => {
        newStudent.id = this.courses.length + 1;
        this.courses.push(newStudent);
        this.coursesSubject.next([...this.courses]);
      })
    );
  }
  

  updateStudent(student: Course) {
    const index = this.courses.findIndex(s => s.id === student.id);
    if (index !== -1) {
      this.courses[index] = student;
      this.coursesSubject.next([...this.courses]);
    }
  }

  deleteStudent(id: number) {
    this.courses = this.courses.filter(s => s.id !== id);
    this.coursesSubject.next([...this.courses]);
  }
}