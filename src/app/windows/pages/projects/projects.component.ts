import { AsyncPipe, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

// * Material.
import { MatIconModule } from '@angular/material/icon';

// * Shared.
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { MenuComponent } from '@core/components/menu.component';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-windows-projects',
  imports: [AsyncPipe, RouterLink, MatIconModule, MenuComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  private _location: Location = inject(Location);

  firestore: Firestore = inject(Firestore);
  projects$: Observable<IProjects[]>;
  constructor() {
    const ref = collection(this.firestore, 'projects');
    this.projects$ = collectionData(ref) as Observable<IProjects[]>;
  }

  public back(): void {
    this._location.back();
  }
}

export interface IProjects {
  title: string;
  image: string;
  path: string;
}
