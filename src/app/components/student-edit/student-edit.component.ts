import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <div class="card-body">
        <h2 class="card-title mb-4">Editar Estudiante</h2>
        
        <form (ngSubmit)="onSubmit()" #form="ngForm" *ngIf="student">
          <div class="mb-3">
            <label class="form-label">Nombre:</label>
            <input type="text" 
                   class="form-control" 
                   [(ngModel)]="student.name" 
                   name="name" 
                   required>
          </div>
          
          <div class="mb-3">
            <label class="form-label">Email:</label>
            <input type="email" 
                   class="form-control" 
                   [(ngModel)]="student.email" 
                   name="email" 
                   required>
          </div>

          <div class="text-danger mb-3" *ngIf="error">{{ error }}</div>
          
          <button type="submit" class="btn btn-primary me-2">
            Guardar
          </button>
          <button type="button" class="btn btn-secondary" (click)="cancel()">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  `
})
export class StudentEditComponent implements OnInit {
  student: Student | null = null;
  error = '';

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.getStudents().subscribe(students => {
      this.student = students.find(s => s.id === id) || null;
      if (!this.student) {
        this.router.navigate(['/list']);
      }
    });
  }

  onSubmit() {
    if (!this.student) return;
    
    if (!this.student.name.trim() || !this.student.email.trim()) {
      this.error = 'Por favor complete todos los campos.';
      return;
    }
    
    this.studentService.updateStudent(this.student);
    this.router.navigate(['/list']);
  }

  cancel() {
    this.router.navigate(['/list']);
  }
}