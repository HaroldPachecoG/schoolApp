import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { Course } from '../../models/course';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.loadStudents();  // Carga los estudiantes desde la API

    // Nos suscribimos al Observable para recibir los estudiantes
    this.studentService.getStudents().subscribe(
      (students) => {
        this.students = students;
      },
      (error) => {
        console.error('Error al cargar los estudiantes: ', error);  // Manejo de error
      }
    );
  }

  getClassmates(course: Course, currentStudent: Student): Student[] {
    return this.students.filter(student => 
      student.id !== currentStudent.id &&
      student.courses.some(c => c.id === course.id)
    );
  }

  deleteStudent(id: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción eliminará permanentemente al estudiante.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudent(id).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El estudiante ha sido eliminado correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              location.reload();
            });
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error al eliminar el estudiante', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al eliminar el estudiante.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      }
    });
  }

  trackByStudentId(index: number, student: Student): number {
    return student.id!; // Usar el ID único del estudiante
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id!; // Usar el ID único del curso
  }

  trackByClassmateId(index: number, classmate: Student): number {
    return classmate.id!; // Usar el ID único del compañero
  }
}
