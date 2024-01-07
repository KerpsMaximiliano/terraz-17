import { AsyncPipe, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

// * Material.
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, NgStyle, MatButtonModule, MatIconModule],
  selector: 'app-windows-home-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent {
  firestore: Firestore = inject(Firestore);
  sections$: Observable<ISection[]>;
  sections: any[] = [];
  constructor() {
    const ref = collection(this.firestore, 'sections');
    this.sections$ = collectionData(ref) as Observable<ISection[]>;
  }

  private _sanitizer: DomSanitizer = inject(DomSanitizer);
}

export interface ISection {
  title: string;
  description: string;
  image: string;
}

export interface Img {
  url: string;
  alt: string;
}
