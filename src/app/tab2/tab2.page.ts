import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
  productos: any[] = [];
  allProductos: any[] = [
    { "imagen": "/assets/imgs/producto_9.jpg", "producname": "Jabón Líquido Antibacterial", "descripcion": "Jabón líquido con propiedades antibacteriales, ideal para una limpieza profunda y efectiva. Formulado para eliminar gérmenes y bacterias sin resecar la piel, proporcionando una sensación de frescura y protección.", "precio": 45.00 },
    { "imagen": "/assets/imgs/producto_10.jpg", "producname": "Jabón Líquido Neutro", "descripcion": "Jabón sin fragancia especialmente diseñado para pieles sensibles. Su fórmula suave ayuda a mantener el equilibrio natural de la piel, evitando irritaciones y ofreciendo una limpieza delicada y efectiva.", "precio": 40.00 },
    { "imagen": "/assets/imgs/producto_11.jpg", "producname": "Jabón Líquido Coco", "descripcion": "Jabón líquido con una fórmula suave y cremosa que limpia profundamente mientras deja la piel hidratada. Su delicioso aroma a coco brinda una experiencia refrescante y tropical en cada uso.", "precio": 48.00 },
    { "imagen": "/assets/imgs/producto_12.jpg", "producname": "Jabón Líquido Almendra", "descripcion": "Hidratante con fragancia a almendra que proporciona una limpieza delicada y nutritiva. Su fórmula con extracto de almendra deja la piel suave, tersa y con un agradable aroma dulce y envolvente.", "precio": 50.00 },
    { "imagen": "/assets/imgs/producto_5.jpg", "producname": "Aromatizante Lavanda", "descripcion": "Aromatizante en spray con esencia de lavanda, ideal para crear un ambiente relajante y armonioso. Su fragancia duradera ayuda a neutralizar olores y proporciona una sensación de tranquilidad y bienestar.", "precio": 50.00 },
    { "imagen": "/assets/imgs/producto_6.jpg", "producname": "Aromatizante Cítrico", "descripcion": "Ambientador con fragancia a cítricos que refresca y revitaliza cualquier espacio. Su mezcla de notas de limón, naranja y mandarina ayuda a eliminar malos olores y deja un ambiente limpio y energizante.", "precio": 55.00 },
    { "imagen": "/assets/imgs/producto_7.jpg", "producname": "Aromatizante Vainilla", "descripcion": "Perfume ambiental con aroma a vainilla que envuelve tu hogar u oficina con una fragancia dulce y reconfortante. Su fórmula en spray permite una aplicación fácil y uniforme, dejando un ambiente cálido y acogedor.", "precio": 60.00 },
    { "imagen": "/assets/imgs/producto_8.jpg", "producname": "17Aromatizante Floral", "descripcion": "Fragancia en spray con esencias florales que transforman cualquier espacio en un jardín perfumado. Su fórmula ayuda a eliminar malos olores y proporciona una sensación de frescura y naturalidad.", "precio": 58.00 },
    { "imagen": "/assets/imgs/producto_1.jpg", "producname": "Cloro Espumoso", "descripcion": "Desinfectante de alto poder con espuma activa que facilita la limpieza y desinfección de diversas superficies. Su fórmula elimina gérmenes, bacterias y hongos, dejando un ambiente higiénico y seguro.", "precio": 70.00 },
    { "imagen": "/assets/imgs/producto_2.jpg", "producname": "Cloro Concentrado", "descripcion": "Blanqueador y desinfectante multiusos con una fórmula de alta concentración para una limpieza efectiva. Ideal para eliminar manchas difíciles y desinfectar superficies con máxima eficiencia.", "precio": 65.00 },
    { "imagen": "/assets/imgs/producto_3.jpg", "producname": "Desinfectante Multiusos", "descripcion": "Limpia y elimina bacterias en múltiples superficies con una fórmula efectiva y de rápida acción. Perfecto para la desinfección del hogar, oficinas y áreas de alto contacto, dejando un ambiente fresco y seguro.", "precio": 75.00 },
    { "imagen": "/assets/imgs/producto_4.jpg", "producname": "Desinfectante en Aerosol", "descripcion": "Fácil aplicación y rápida desinfección en cualquier espacio. Su fórmula en aerosol permite una distribución uniforme para eliminar virus, bacterias y malos olores, dejando un ambiente limpio y protegido.", "precio": 80.00 },
    {
      "imagen": "/assets/imgs/producto_12.jpg",
      "producname": "Jabón Líquido Manzanilla",
      "descripcion": "Jabón líquido con extracto de manzanilla, ideal para pieles sensibles. Su fórmula calmante ayuda a reducir irritaciones y proporciona una limpieza suave y refrescante.",
      "precio": 47.00
    },
    {
      "imagen": "/assets/imgs/producto_11.jpg",
      "producname": "Jabón Líquido Miel",
      "descripcion": "Jabón líquido enriquecido con miel natural, que nutre e hidrata la piel mientras la limpia. Su aroma dulce y reconfortante hace que cada uso sea una experiencia placentera.",
      "precio": 49.00
    },
    {
      "imagen": "/assets/imgs/producto_10.jpg",
      "producname": "Aromatizante Canela 1L",
      "descripcion": "Ambientador con aroma a canela que crea un ambiente cálido y acogedor. Ideal para épocas frías, su fragancia especiada aporta una sensación de confort y bienestar.",
      "precio": 56.00
    },
    {
      "imagen": "/assets/imgs/producto_9.jpg",
      "producname": "Aromatizante Bambú",
      "descripcion": "Fragancia en spray con notas frescas de bambú, perfecta para crear un ambiente relajante y natural. Ayuda a neutralizar olores y deja un aroma limpio y fresco.",
      "precio": 54.00
    },
    {
      "imagen": "/assets/imgs/producto_1.jpg",
      "producname": "Limpiador de Vidrios",
      "descripcion": "Producto especializado para limpiar y dejar relucientes vidrios y espejos. Su fórmula sin rayones garantiza un acabado impecable y sin residuos.",
      "precio": 52.00
    },
    {
      "imagen": "/assets/imgs/producto_2.jpg",
      "producname": "Limpiador de Cocina",
      "descripcion": "Fórmula poderosa para eliminar grasa y suciedad en superficies de cocina. Deja un aroma fresco y una sensación de limpieza profunda.",
      "precio": 58.00
    },
    {
      "imagen": "/assets/imgs/producto_3.jpg",
      "producname": "Desinfectante para Manos ",
      "descripcion": "Gel desinfectante con alcohol que elimina el 99.9% de bacterias y virus. Fórmula rápida y efectiva para mantener las manos limpias y protegidas en todo momento.",
      "precio": 35.00
    },
    {
      "imagen": "/assets/imgs/producto_4.jpg",
      "producname": "Suavizante para Ropa Vainilla",
      "descripcion": "Suavizante con aroma a vainilla que deja las prendas suaves y con un aroma dulce y duradero. Ideal para todo tipo de telas.",
      "precio": 59.00
    },
    {
      "imagen": "/assets/imgs/producto_5.jpg",
      "producname": "Limpiador Multiusos con Vinagre",
      "descripcion": "Producto ecológico con vinagre para una limpieza efectiva y segura en múltiples superficies. Elimina manchas y desinfecta sin dañar el medio ambiente.",
      "precio": 45.00
    },
    {
      "imagen": "/assets/imgs/producto_6.jpg",
      "producname": "Jabón Líquido Aloe Vera",
      "descripcion": "Jabón líquido con extracto de aloe vera que hidrata y suaviza la piel mientras la limpia. Ideal para todo tipo de pieles, especialmente las secas.",
      "precio": 50.00
    },
    {
      "imagen": "/assets/imgs/producto_7.jpg",
      "producname": "Aromatizante Lavanda y Vainilla 1L",
      "descripcion": "Ambientador con una mezcla relajante de lavanda y vainilla. Perfecto para crear un ambiente tranquilo y acogedor en cualquier espacio.",
      "precio": 57.00
    },
    {
      "imagen": "/assets/imgs/producto_8.jpg",
      "producname": "Limpiador de Alfombras",
      "descripcion": "Fórmula especializada para eliminar manchas y olores en alfombras y tapicerías. Deja una sensación de frescura y limpieza profunda.",
      "precio": 65.00
    }
  ];
  currentIndex: number = 0;

  constructor(private toastController: ToastController) {}

  ngOnInit() {
    this.loadMoreProducts();
  }

  loadMore(event?: any) {
    setTimeout(() => {
      this.loadMoreProducts();
      if (event) {
        event.target.complete();
      }
    }, 2500);
  }

  async loadMoreProducts() {
    const nextIndex = this.currentIndex + 4;
    const newProducts = this.allProductos.slice(this.currentIndex, nextIndex);
    this.productos = [...this.productos, ...newProducts];
    this.currentIndex = nextIndex;

    if (this.currentIndex >= this.allProductos.length) {
      const toast = await this.toastController.create({
        message: 'Todos los productos han sido cargados.',
        duration: 3000,
        position: 'middle',
        cssClass: 'custom-toast' // Clase CSS personalizada
      });
      toast.present();
    }
  }
}