import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.name, this.email, this.password)
      .subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          this.successMessage = '¡Registro exitoso! Redirigiendo al login...';
          setTimeout(() => {
            this.router.navigate(['/inicio-sesion']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error en registro', error);
          this.errorMessage = error.error?.message || 'Error al registrar usuario';
        }
      });
  }
}