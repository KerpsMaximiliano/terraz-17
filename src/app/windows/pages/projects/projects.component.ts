import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

// * Material.
import { MatIconModule } from '@angular/material/icon';

// * Shared.
import { MenuComponent } from '@core/components/menu.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-windows-projects',
  imports: [RouterLink, MatIconModule, MenuComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  public projects: IProjects[] = PROJECTS;

  private _location: Location = inject(Location);

  public back(): void {
    this._location.back();
  }
}

export const PROJECTS: IProjects[] = [
  {
    title: '3 de Febrero 2025',
    image: 'assets/images/projects/aparment/3_de_febrero_2025.jpeg',
  },
  {
    title: 'España 2089',
    image: 'assets/images/projects/aparment/españa_2089.jpeg',
  },
  {
    title: 'General Lopez 2389',
    image: 'assets/images/projects/aparment/general_lopez_2389.jpg',
  },
  {
    title: 'Laprida 1009',
    image: 'assets/images/projects/aparment/laprida_1009.jpeg',
  },
  {
    title: 'Mendoza 2720',
    image: 'assets/images/projects/aparment/mendoza_2720.jpeg',
  },
  {
    title: 'Montevideo 953',
    image: 'assets/images/projects/aparment/montevideo_953.jpeg',
  },
  {
    title: 'Pellegrini y Callao',
    image: 'assets/images/projects/aparment/pellegrini_callao.jpg',
  },
  {
    title: 'San Lorenzo 437',
    image: 'assets/images/projects/aparment/san_lorenzo_437.jpg',
  },
];

export interface IProjects {
  title: string;
  image: string;
}
