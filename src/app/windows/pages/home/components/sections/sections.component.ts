import { AsyncPipe, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
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
export class SectionsComponent implements OnInit {
  public sections$?: Observable<ISection[]>;

  private _fire: Firestore = inject(Firestore);

  public ngOnInit(): void {
    const ref = collection(this._fire, 'sections');
    this.sections$ = collectionData(ref) as Observable<ISection[]>;
  }
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
