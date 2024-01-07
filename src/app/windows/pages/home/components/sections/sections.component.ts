import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Observable } from 'rxjs';

// * Material.
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgStyle, MatButtonModule, MatIconModule],
  selector: 'app-windows-home-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent {
  firestore: Firestore = inject(Firestore);
  sections$: Observable<ISection[]>;
  section: ISection[] = [];
  constructor() {
    const ref = collection(this.firestore, 'sections');
    this.sections$ = collectionData(ref) as Observable<ISection[]>;
  }

  private _sanitizer: DomSanitizer = inject(DomSanitizer);

  public background(img: string): SafeStyle {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${img})`);
  }
}

export interface ISection {
  title: string;
  description: string;
  images: Img;
}

export interface Img {
  url: string;
  alt: string;
}
