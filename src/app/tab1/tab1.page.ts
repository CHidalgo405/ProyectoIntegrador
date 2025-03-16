import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  selectedSegment: string = 'first'; // Selecciona la pestaña por defecto
  
  constructor() {}

}
