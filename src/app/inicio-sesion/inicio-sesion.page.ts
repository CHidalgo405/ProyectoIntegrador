import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; // Importamos el Router

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
  standalone: false,
})
export class InicioSesionPage {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router // Inyectamos el Router
  ) {}

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.login(this.email, this.password)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.successMessage = '¡Login exitoso!';
          console.log('Respuesta completa:', response);
          // Redirigimos a /tabs/tabs después de un login exitoso
          this.router.navigate(['/tabs']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Error en el login: ' + error.message;
          console.error('Detalles del error:', error);
        },
        complete: () => {
          this.loading = false;
          console.log('Solicitud completada');
        }
      });
  }
}