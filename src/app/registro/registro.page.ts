import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

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
  confirmPassword: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async register() {
    if (!this.name.trim() || !this.email.trim() || !this.password.trim() || !this.confirmPassword.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    if (!this.validateEmail(this.email)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El correo electrónico no es válido',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    if (this.password.length < 6) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'La contraseña debe tener al menos 6 caracteres',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    if (this.password !== this.confirmPassword) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Registrando...',
    });
    await loading.present();

    // Simulación de registro
    setTimeout(async () => {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Registro exitoso. Ahora puedes iniciar sesión.',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.router.navigate(['/inicio-sesion']);
          }
        }],
      });
      await alert.present();
    }, 1500);
  }

  private validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
}