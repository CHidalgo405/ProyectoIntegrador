import { Component } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  showSplash = true;

  constructor(private platform: Platform) {
    this.initializeApp();
  }

  // Cada vez que se incia la app, se cargan estos valores
  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.setOverlaysWebView({ overlay: false }); 
      StatusBar.setBackgroundColor({ color: '#4A827E' }); 
    });
  }
}