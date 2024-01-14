import { AsyncPipe, JsonPipe, Location } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

// * Services.
import { CoreService } from '@core/services/core.service';

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
  imports: [AsyncPipe, JsonPipe, RouterLink, MatIconModule, SliderComponent, MenuComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  public project$?: Observable<IProject>;

  private _service: CoreService = inject(CoreService);
  private _location: Location = inject(Location);
  private _fire: Firestore = inject(Firestore);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _router: Router = inject(Router);
  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  public ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (!id) {
      this._router.navigate(['/proyectos']);
      return;
    }

    const ref = collection(this._fire, 'paths');
    const paths = collectionData(ref) as unknown as Observable<any>;
    paths.subscribe(paths => {
      if (!id) {
        this._router.navigate(['/proyectos']);
        return;
      }

      paths.forEach((path: any) => {
        path.paths.forEach((p: any) => {
          if (p === id) {
            const docRef = doc(this._fire, 'aparment', `${id}`);
            this.project$ = docData(docRef) as unknown as Observable<IProject>;
            this._service.hide();
            this._cdr.markForCheck();
          }
        });
      });
    });
  }

  public back(): void {
    this._location.back();
  }
}

export interface IProject {
  title: string;
  status: boolean;
  end?: string[];
  renders?: string[];
  advances?: string[];
}
