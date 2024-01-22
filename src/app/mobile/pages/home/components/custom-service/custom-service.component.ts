import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
  selector: 'app-mobile-home-custom-service',
  templateUrl: './custom-service.component.html',
  styleUrls: ['./custom-service.component.scss', '../common.scss'],
})
export class CustomServiceComponent {
  firestore: Firestore = inject(Firestore);
  video$: Observable<IVideo[]>;
  video: string = '';
  constructor() {
    const ref = collection(this.firestore, 'video');
    this.video$ = collectionData(ref) as Observable<IVideo[]>;
  }
}

export interface IVideo {
  url: string;
}
