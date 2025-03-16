import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  isModalOpen = false;

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() { }

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
            this.router.navigate(['/inicio-sesion']);
          }
        }
      ]
    });

    await alert.present();
  }
}