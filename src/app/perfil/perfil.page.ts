import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  isModalOpen = false;

  constructor() { }

  ngOnInit() { }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}