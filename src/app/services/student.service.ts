import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Student, StudentSend } from '../models/student';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [];
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  students$ = this.studentsSubject.asObservable();
  private apiUrl = 'https://localhost:7074/Students'; // Reemplaza con la URL real de tu API


  constructor(private http: HttpClient) {}

  loadStudents(): void {
    this.http.get<Student[]>(this.apiUrl).subscribe(
      (students) => {
        this.studentsSubject.next(students);  // Actualiza el observable
      },
      (error) => {
        console.error('Error al cargar los estudiantes: ', error);
      }
    );
  }

  getStudents(): Observable<Student[]> {
    return this.students$;
  }

  addStudent(student: { name: string; courseIds: number[] }): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student).pipe(
      tap((newStudent) => {
        // Ejecutar la lógica local después de un consumo exitoso
        newStudent.id = this.students.length + 1;
        this.students.push(newStudent);
        this.studentsSubject.next([...this.students]);
      })
    );
  }

  updateStudent(id: number, student: StudentSend): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student).pipe(
      tap((updatedStudent) => {
        const index = this.students.findIndex(s => s.id === updatedStudent.id);
        if (index !== -1) {
          this.students[index] = updatedStudent;
          this.studentsSubject.next([...this.students]);
        }
      })
    );
}
 
deleteStudent(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
    tap(() => {
      this.students = this.students.filter(s => s.id !== id);
      this.studentsSubject.next([...this.students]); // Emitir la nueva lista
    })
  );
}  

  getStudentsByCourse(course: Course): Student[] {
    return this.students.filter(student => 
      student.courses.some(c => c.id === course.id)
    );
  }
}