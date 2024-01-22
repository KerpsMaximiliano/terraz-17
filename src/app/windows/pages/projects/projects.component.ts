import { AsyncPipe, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

// * Services.
import { CoreService } from '@core/services/core.service';

// * Material.
import { MatIconModule } from '@angular/material/icon';

// * Shared.
import { MenuComponent } from '@core/components/menu.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-windows-projects',
  standalone: true,
  imports: [AsyncPipe, RouterLink, MatIconModule, MenuComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  public projects$?: Observable<IProjects[]>;

  private _service: CoreService = inject(CoreService);
  private _location: Location = inject(Location);
  private _fire: Firestore = inject(Firestore);

  public ngOnInit(): void {
    const ref = collection(this._fire, 'projects');
    this.projects$ = collectionData(ref) as Observable<IProjects[]>;
  }

  public ngAfterViewInit(): void {
    this._service.hide();
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
