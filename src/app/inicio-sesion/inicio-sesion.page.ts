import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
  standalone: false,
})
export class InicioSesionPage {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthService,

  ) {}

  async login1() {
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
    });
    await loading.present();

    // Simulación de autenticación
    setTimeout(async () => {
      await loading.dismiss();
      if (this.email === 'equipo1@gmail.com' && this.password === '123456') {
        this.router.navigate(['/tabs']);
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Correo o contraseña incorrectos',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }, 1500);
  }

  async login() {
    const user = await this.authService.loginWithGoogle();
    if (user) {
      console.log('Usuario autenticado:', user);
      this.router.navigate(['/tabs/tab1']); // Redirige a la página principal
    } else {
      console.log('Error en la autenticación');
    }
  }
}
