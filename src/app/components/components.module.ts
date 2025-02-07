import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { CardComponent } from './card/card.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    LayoutComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    LayoutComponent,
    CardComponent
  ]
})
export class ComponentsModule { }
