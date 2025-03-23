import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  isModalOpen = false;
  user: any = {}; // Objeto para almacenar los datos del usuario

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Cargar datos del usuario desde localStorage al iniciar
    const userData = this.authService.getUserData();
    if (userData) {
      this.user = userData;
    } else {
      // Opcional: Si no hay datos en localStorage, intentar obtenerlos del servidor
      this.loadUserData();
    }
  }

  // Método para cargar datos del usuario desde la API
  loadUserData() {
    const userData = this.authService.getUserData();
    if (userData && userData.idusuario) {
      this.authService.getUserById(userData.idusuario).subscribe({
        next: (response) => {
          this.user = response.data || response; // Ajusta según la estructura de la respuesta
          localStorage.setItem('userData', JSON.stringify(this.user)); // Actualizar localStorage
        },
        error: (error) => {
          console.error('Error al cargar datos del usuario:', error);
        }
      });
    }
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async presentLogoutAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cerrar sesión cancelada');
          }
        }, {
          text: 'Cerrar sesión',
          handler: () => {
            localStorage.removeItem('userData'); // Limpiar datos al cerrar sesión
            this.router.navigate(['/inicio-sesion']);
          }
        }
      ]
    });

    await alert.present();
  }
}