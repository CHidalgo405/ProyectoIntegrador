import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  isModalOpen = false;
  userData: any = {}; // Para almacenar los datos del usuario
  loading: boolean = true; // Para mostrar un estado de carga

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const idusuario = localStorage.getItem('idusuario');
    if (idusuario) {
      this.authService.getUserData(idusuario)
        .subscribe({
          next: (data) => {
            this.userData = data; // Guardamos los datos del usuario
            this.loading = false;
            console.log('Datos cargados:', this.userData);
          },
          error: (error) => {
            console.error('Error al cargar datos:', error);
            this.loading = false;
            this.router.navigate(['/inicio-sesion']); // Redirige si hay error (por ejemplo, sesión expirada)
          }
        });
    } else {
      this.loading = false;
      this.router.navigate(['/inicio-sesion']); // Redirige si no hay idusuario
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
            localStorage.removeItem('idusuario'); // Elimina el idusuario al cerrar sesión
            this.router.navigate(['/inicio-sesion']);
          }
        }
      ]
    });

    await alert.present();
  }
}