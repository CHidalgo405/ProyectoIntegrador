import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false,
})
export class Tab4Page implements OnInit {

  selectedSegment: string = 'first'; // Selecciona la pestaña por defecto

  constructor() { }

  ngOnInit() {
  }

}
