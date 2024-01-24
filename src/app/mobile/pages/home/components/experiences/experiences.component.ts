import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

// * Fire.
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

// * Rxjs.
import { Observable } from 'rxjs';

// * Material.
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, MatIconModule],
  selector: 'app-mobile-home-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss'],
})
export class ExperiencesComponent implements OnInit {
  public experiences$?: Observable<IExperience[]>;

  private _fire: Firestore = inject(Firestore);

  public ngOnInit(): void {
    const ref = collection(this._fire, 'reviews');
    this.experiences$ = collectionData(ref) as Observable<IExperience[]>;
  }
}

export interface IExperience {
  name: string;
  description: string;
  image: string;
  count: number;
  photos: number;
  time: string;
}
