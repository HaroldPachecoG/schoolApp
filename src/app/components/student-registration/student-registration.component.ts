import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';
// import { COURSES } from '../../data/mock-data';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectionListChange } from '@angular/material/core';


@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-registration.component.html'
})
export class StudentRegistrationComponent {
  newStudent: Student = {
    name: '',
    courses: []
  };
  availableCourses: Course[] = [];
  error = '';
  loading = false;

  constructor(private studentService: StudentService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.courseService.loadCourses();  // Carga los cursos desde la API

    // Nos suscribimos al Observable para recibir los cursos
    this.courseService.getCourses().subscribe(
      (courses) => {
        this.availableCourses = courses;  // Asignamos los cursos al componente
      },
      (error) => {
        console.error('Error al cargar los cursos: ', error);  // Manejo de error
      }
    );
  }

  updateSelectedCourses(event: MatSelectionListChange) {
    this.newStudent.courses = event.source.selectedOptions.selected.map(option => option.value);
  }
  

  isSelected(course: Course): boolean {
    return this.newStudent.courses.some(c => c.id === course.id);
  }

  canSelectCourse(course: Course): boolean {
    if (this.isSelected(course)) return true;
    if (this.newStudent.courses.length >= 3) return false;
    return !this.newStudent.courses.some(
      c => c.professors[0].id === course.professors[0].id
    );
  }

  toggleCourse(course: Course) {
    const index = this.newStudent.courses.findIndex(
      c => c.id === course.id
    );
    
    if (index === -1) {
      if (this.canSelectCourse(course)) {
        this.newStudent.courses.push(course);
      }
    } else {
      this.newStudent.courses.splice(index, 1);
    }
  }

  isFormValid(): boolean {
    return (
      this.newStudent.name.trim() !== '' &&
      this.newStudent.courses.length > 0 &&
      this.newStudent.courses.length <= 3
    );
  }

  onSubmit() {
    if (!this.isFormValid()) {
      this.error = 'Por favor complete todos los campos y seleccione 3 materias.';
      return;
    }
  
    const studentToSend = {
      name: this.newStudent.name,
      courseIds: this.newStudent.courses.map(course => course.id)
    };
  
    this.loading = true;
    Swal.showLoading();
  
    this.studentService.addStudent(studentToSend).subscribe(() => {
      this.newStudent = { name: '', courses: [] };
      this.loading = false;
      Swal.close();
      Swal.fire("Registro Exitoso", "El estudiante ha sido registrado", "success");
    });
  }
  
}
