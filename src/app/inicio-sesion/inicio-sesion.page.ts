import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; 

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

  constructor(private authService: AuthService, private router: Router) {}

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
          this.router.navigate(['/tabs']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Error en el login: ' + error.message;
          console.error('Detalles del error:', error);
        }
      });
  }
}