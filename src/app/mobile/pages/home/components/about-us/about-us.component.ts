import { Component, ChangeDetectionStrategy } from '@angular/core';

// * Material.
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  selector: 'app-mobile-home-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss', '../common.scss'],
})
export class AboutUsComponent {
  public aboutUs: IAboutUs[] = ABOUT_US;
}

export interface IAboutUs {
  title: string;
  description: string;
}

export const ABOUT_US: IAboutUs[] = [
  {
    title: 'Terrenos a construir',
    description:
      'Contamos con desarrollos en Funes, Ybarlucea, Arroyo Seco, Granadero Baigorria, Pueblo Esther y muchas locaciones más para que elijas al que se adapte a tus necesidades.',
  },
  {
    title: 'Profesionales de Terraz',
    description:
      'Nuestro equipo está conformado con ingenieros, arquitectos, diseñadores y constructores, los cuales desarrollan más de 30 modelos de viviendas pensando en su funcionalidad, comodidad y con potencialidad de crecimiento a futuro.',
  },
  {
    title: 'Materiales de construcción',
    description:
      'Nuestras viviendas se realizan basándose en la construcción tradicional (no prefabricadas) y modulares de hormigón (las únicas con CAT 1) desarrolladas con materiales de excelente calidad y perdurabilidad.',
  },
  {
    title: 'Servicios prestados',
    description:
      'Todas las viviendas cuentan con cloacas, agua corriente, gas natural, electricidad, alumbrado público y demás servicios básicos destinados a asegurar tu comodidad y la de tu familia.',
  },
];
