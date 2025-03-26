import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';

interface ReceiptData {
  user: { name: string; email: string };
  items: { nombre: string; preciomenudeo: number; cantidad: number }[];
  total: number;
  date: string;
}

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
  standalone: false
})
export class ReceiptPage implements OnInit {
  receiptData: ReceiptData | null = null;

  constructor(private router: Router, private platform: Platform) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.receiptData = navigation.extras.state as ReceiptData;
      console.log('Datos del recibo recibidos:', this.receiptData);
    } else {
      console.warn('No se encontraron datos de recibo, redirigiendo al carrito');
      this.router.navigate(['/tabs/tab3']);
    }
  }

  async downloadReceipt() {
    console.log('Iniciando descarga del recibo...');

    if (!this.receiptData) {
      console.error('No hay datos de recibo disponibles');
      alert('Error: No se encontraron datos para generar el recibo.');
      return;
    }

    try {
      const doc = new jsPDF();
      const margin = 10;
      let yPosition = margin;

      // Título
      doc.setFontSize(18);
      doc.text('Recibo de Compra - POWER CLEAN', margin, yPosition);
      yPosition += 10;

      // Datos del usuario
      doc.setFontSize(12);
      doc.text(`Cliente: ${this.receiptData.user.name || 'Desconocido'}`, margin, yPosition);
      yPosition += 6;
      doc.text(`Email: ${this.receiptData.user.email || 'No disponible'}`, margin, yPosition);
      yPosition += 6;
      doc.text(`Fecha: ${new Date(this.receiptData.date).toLocaleString()}`, margin, yPosition);
      yPosition += 10;

      // Línea separadora
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition, 200 - margin, yPosition);
      yPosition += 10;

      // Resumen de productos
      doc.setFontSize(14);
      doc.text('Resumen de la Compra', margin, yPosition);
      yPosition += 6;

      doc.setFontSize(12);
      if (this.receiptData.items && this.receiptData.items.length > 0) {
        this.receiptData.items.forEach(item => {
          const subtotal = (item.cantidad * item.preciomenudeo).toFixed(2);
          doc.text(
            `${item.nombre || 'Producto sin nombre'} - ${item.cantidad} x $${item.preciomenudeo.toFixed(2)} = $${subtotal}`,
            margin,
            yPosition
          );
          yPosition += 6;
        });
      } else {
        doc.text('No hay productos en el recibo', margin, yPosition);
        yPosition += 6;
      }

      // Total
      yPosition += 5;
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition, 200 - margin, yPosition);
      yPosition += 6;
      doc.setFontSize(14);
      doc.text(`Total: $${this.receiptData.total.toFixed(2)} MXN`, margin, yPosition);

      // Generar el PDF como Blob
      const pdfBlob = doc.output('blob');
      const fileName = `recibo_${new Date(this.receiptData.date).toISOString().split('T')[0]}.pdf`;
      console.log('Generando PDF con nombre:', fileName);

      // Guardar o descargar el archivo
      await this.saveFile(pdfBlob, fileName);
    } catch (error) {
      console.error('Error al generar o guardar el PDF:', error);
      alert('Error al generar el PDF. Revisa la consola para más detalles.');
    }
  }

  async saveFile(blob: Blob, fileName: string) {
    if (this.platform.is('capacitor') || this.platform.is('cordova')) {
      try {
        const arrayBuffer = await blob.arrayBuffer();
        const base64String = btoa(
          new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        const result = await Filesystem.writeFile({
          path: fileName,
          data: base64String,
          directory: Directory.Documents,
          recursive: true
        });
        alert(`Archivo guardado en: ${result.uri}`);
        console.log('PDF guardado exitosamente en el dispositivo:', result.uri);
      } catch (error) {
        console.error('Error al guardar el archivo:', error);
        alert('No se pudo guardar el archivo. Revisa la consola para más detalles.');
      }
    } else {
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link); // Añadir al DOM antes de hacer clic
      link.click();
      document.body.removeChild(link); // Limpiar después de la descarga
      URL.revokeObjectURL(url);
      console.log('PDF descargado exitosamente en el navegador');
    }
  }
}