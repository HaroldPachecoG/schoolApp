import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Student, Course } from '../../models/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="card">
      <div class="card-body">
        <h2 class="card-title mb-4">Lista de Estudiantes</h2>
        
        <div class="accordion" id="studentAccordion">
          @for (student of students; track student.id) {
            <div class="accordion-item mb-3">
              <h3 class="accordion-header">
                <button class="accordion-button collapsed" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        [attr.data-bs-target]="'#student-' + student.id">
                  {{ student.name }}
                </button>
              </h3>
              <div [id]="'student-' + student.id" 
                   class="accordion-collapse collapse">
                <div class="accordion-body">
                  <div class="mb-3">
                    <button class="btn btn-primary btn-sm me-2" [routerLink]="['/edit', student.id]">
                      Editar
                    </button>
                    <button class="btn btn-danger btn-sm" (click)="deleteStudent(student.id!)">
                      Eliminar
                    </button>
                  </div>
                  <h4 class="fw-bold">Materias:</h4>
                  @for (course of student.selectedCourses; track course.id) {
                    <div class="mb-3">
                      <p class="fw-bold mb-1">{{ course.name }}</p>
                      <p class="text-muted">Profesor: {{ course.professor.name }}</p>
                      <p class="mb-1">Compañeros de clase:</p>
                      <ul class="list-group">
                        @for (classmate of getClassmates(course, student); track classmate.id) {
                          <li class="list-group-item">{{ classmate.name }}</li>
                        }
                      </ul>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;
    });
  }

  getClassmates(course: Course, currentStudent: Student): Student[] {
    return this.students.filter(student => 
      student.id !== currentStudent.id &&
      student.selectedCourses.some(c => c.id === course.id)
    );
  }

  deleteStudent(id: number) {
    if (confirm('¿Está seguro de que desea eliminar este estudiante?')) {
      this.studentService.deleteStudent(id);
    }
  }
}