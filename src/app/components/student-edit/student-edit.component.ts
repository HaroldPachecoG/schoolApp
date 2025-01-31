import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student, StudentSend } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-edit.component.html'
})
export class StudentEditComponent implements OnInit {
  student: Student | null = null;
  error = '';
  send : StudentSend | null = null;

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
  
    if (!this.student.name.trim()) {
      this.error = 'Por favor ingrese el nombre del estudiante.';
      return;
    }
    Swal.showLoading();
    const courseIds = this.student.courses ? this.student.courses.map(course => course.id) : [];
    this.send = new StudentSend(this.student.name, courseIds);
    this.studentService.updateStudent(this.student.id!, this.send)
      .subscribe({
        next: () => {
          Swal.hideLoading();
          Swal.fire({
            title: '¡Estudiante actualizado!',
            text: 'La información del estudiante se actualizó correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.router.navigate(['/list']);
          });
        },
        error: (error: HttpErrorResponse) => {
          Swal.hideLoading();
          console.error('Error al actualizar el estudiante', error);
          this.error = 'Hubo un problema al actualizar el estudiante.';
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al actualizar el estudiante.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
  }
  cancel() {
    this.router.navigate(['/list']);
  }
}
