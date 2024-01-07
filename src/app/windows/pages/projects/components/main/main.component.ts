import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-windows-projects-main',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  public projects: IProjects[] = PROJECTS;
}

export const PROJECTS: IProjects[] = [
  {
    id: 1,
    title: '3 de Febrero 2025',
    image: '',
  },
  {
    id: 2,
    title: 'Elorza 1422',
    image: '',
  },
  {
    id: 3,
    title: 'Laprida 1009',
    image: '',
  },
  {
    id: 4,
    title: '3 de Febrero 2025',
    image: '',
  },
  {
    id: 5,
    title: 'Elorza 1422',
    image: '',
  },
  {
    id: 6,
    title: 'Laprida 1009',
    image: '',
  },
];

export interface IProjects {
  id: number;
  title: string;
  image: string;
}
