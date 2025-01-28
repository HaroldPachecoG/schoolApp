import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Student, Course } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { COURSES } from '../../data/mock-data';

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <div class="card-body">
        <h2 class="card-title mb-4">Registro de Estudiante</h2>
        
        <form (ngSubmit)="onSubmit()" #form="ngForm">
          <div class="mb-3">
            <label class="form-label">Nombre:</label>
            <input type="text" 
                   class="form-control" 
                   [(ngModel)]="newStudent.name" 
                   name="name" 
                   required>
          </div>
          
          <div class="mb-3">
            <label class="form-label">Email:</label>
            <input type="email" 
                   class="form-control" 
                   [(ngModel)]="newStudent.email" 
                   name="email" 
                   required>
          </div>
          
          <div class="mb-3">
            <label class="form-label">Materias (Seleccione 3):</label>
            <div class="form-check" *ngFor="let course of availableCourses">
              <input class="form-check-input" 
                     type="checkbox"
                     [id]="'course-' + course.id"
                     [checked]="isSelected(course)"
                     (change)="toggleCourse(course)"
                     [disabled]="!canSelectCourse(course)">
              <label class="form-check-label" [for]="'course-' + course.id">
                {{ course.name }} - Prof. {{ course.professor.name }}
              </label>
            </div>
          </div>

          <div class="text-danger mb-3" *ngIf="error">{{ error }}</div>
          
          <button type="submit" 
                  class="btn btn-primary"
                  [disabled]="!isFormValid()">
            Registrar
          </button>
        </form>
      </div>
    </div>
  `
})
export class StudentRegistrationComponent {
  newStudent: Student = {
    name: '',
    email: '',
    selectedCourses: []
  };
  availableCourses = COURSES;
  error = '';

  constructor(private studentService: StudentService) {}

  isSelected(course: Course): boolean {
    return this.newStudent.selectedCourses.some(c => c.id === course.id);
  }

  canSelectCourse(course: Course): boolean {
    if (this.isSelected(course)) return true;
    if (this.newStudent.selectedCourses.length >= 3) return false;
    
    return !this.newStudent.selectedCourses.some(
      c => c.professor.id === course.professor.id
    );
  }

  toggleCourse(course: Course) {
    const index = this.newStudent.selectedCourses.findIndex(
      c => c.id === course.id
    );
    
    if (index === -1) {
      if (this.canSelectCourse(course)) {
        this.newStudent.selectedCourses.push(course);
      }
    } else {
      this.newStudent.selectedCourses.splice(index, 1);
    }
  }

  isFormValid(): boolean {
    return (
      this.newStudent.name.trim() !== '' &&
      this.newStudent.email.trim() !== '' &&
      this.newStudent.selectedCourses.length === 3
    );
  }

  onSubmit() {
    if (!this.isFormValid()) {
      this.error = 'Por favor complete todos los campos y seleccione 3 materias.';
      return;
    }
    
    this.studentService.addStudent({ ...this.newStudent });
    this.newStudent = {
      name: '',
      email: '',
      selectedCourses: []
    };
    this.error = '';
  }
}