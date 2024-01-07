import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

// * Material.
import { MatIconModule } from '@angular/material/icon';

// * Components.
import { SliderComponent } from './components/slider/slider.component';

// * Shared.
import { MenuComponent } from '@core/components/menu.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-windows-project',
  imports: [RouterLink, MatIconModule, SliderComponent, MenuComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  public project: IProject = PROJECT;

  // public ngAfterViewInit(): void {
  //   this._loading.hide();
  // }

  private _location: Location = inject(Location);

  public back(): void {
    this._location.back();
  }
}

export const PROJECT: IProject = {
  title: '3 de Febrero 2025',
  description:
    'Nuestras viviendas se realizan basándose en la construcción tradicional (no prefabricadas) y modulares de hormigoón (las únicas con CAT 1) desarrolladas con materiales de excelente calidad y perdurabilidad.',
  images: [
    'assets/images/projects/febrero/1.jpeg',
    'assets/images/projects/febrero/2.jpeg',
    'assets/images/projects/febrero/3.jpeg',
    'assets/images/projects/febrero/4.jpeg',
    'assets/images/projects/febrero/5.jpeg',
    'assets/images/projects/febrero/6.jpeg',
    'assets/images/projects/febrero/7.jpeg',
    'assets/images/projects/febrero/8.jpeg',
    'assets/images/projects/febrero/9.jpeg',
    'assets/images/projects/febrero/10.jpeg',
    'assets/images/projects/febrero/11.jpeg',
  ],
};

export interface IProject {
  title: string;
  images: string[];
  description: string;
}
