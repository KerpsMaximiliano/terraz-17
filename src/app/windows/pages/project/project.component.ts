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
  public item: IProject = PROJECT;

  // public ngAfterViewInit(): void {
  //   this._loading.hide();
  // }

  private _location: Location = inject(Location);

  public back(): void {
    this._location.back();
  }
}

export const PROJECT: IProject = {
  id: 1,
  title: '3 de Febrero 2025',
  description:
    'Nuestras viviendas se realizan basándose en la construcción tradicional (no prefabricadas) y modulares de hormigoón (las únicas con CAT 1) desarrolladas con materiales de excelente calidad y perdurabilidad.',
  image: '/assets/images/project/unique.png',
};

export interface IProject {
  id: number;
  title: string;
  image: string;
  description: string;
}
