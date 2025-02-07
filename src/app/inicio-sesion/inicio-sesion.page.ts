import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

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
    private loadingController: LoadingController
  ) {}

  async login() {
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
}
