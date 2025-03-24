import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.proyecto.app',
  appName: 'ProyectoIntegrador',
  webDir: 'www',
  server: {
    androidScheme: 'http', // Forzar esquema HTTP en Android
    cleartext: true // Permitir tráfico HTTP
  }
};

export default config;
