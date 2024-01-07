import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

// * Material.
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgStyle, MatButtonModule, MatIconModule],
  selector: 'app-windows-home-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent {
  public SECTIONS: ISection[] = [
    {
      title: 'APARTMENT',
      description: 'Todos nuestros proyectos en construcción y finalizados.',
      image: {
        src: './assets/images/home/sections/aparment.tif',
        alt: 'Apartamentos',
      },
    },
    {
      title: 'HOME',
      description: 'Encontrá todas las variantes y modelos de casas en construcción de hormigón.',
      image: {
        src: 'assets/images/home/sections/home.tif',
        alt: 'Casas',
      },
    },
    {
      title: 'INDUSTRY',
      description: 'Nuestros proyectos industriales en construcción y finalizados.',
      image: {
        src: 'assets/images/home/sections/industry.tif',
        alt: 'Industrias',
      },
    },
    {
      title: 'INVEST',
      description: 'Invertí en nuestros proyectos y obtené una renta mensual.',
      image: {
        src: 'assets/images/home/sections/invest.tif',
        alt: '',
      },
    },
    // {
    //   title: 'LOTE',
    //   description: 'Desarrollos en diferentes localidades para que encuentres el que más se adapte a vos.',
    //   image: {
    //     src: '',
    //     alt: '',
    //     // src: 'assets/images/home/sections/'
    //   },
    // },
  ];

  private _sanitizer: DomSanitizer = inject(DomSanitizer);

  public background(img: string): SafeStyle {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${img})`);
  }
}

export interface ISection {
  title: string;
  description: string;
  image: Img;
}

export interface Img {
  src: string;
  alt: string;
}
