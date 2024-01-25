import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject } from '@angular/core';

// * Rxjs.
import { Observable, map } from 'rxjs';

// * Fire.
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

// * Material.
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// * Services.
import { ScrollService } from '@app/core/services/scroll.service';

// * Components.
import { ScrollXComponent } from '@app/core/components/scroll-x/scroll-x.component';


@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, MatButtonModule, MatIconModule, ScrollXComponent],
  selector: 'app-mobile-home-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent implements AfterViewInit {
  public animation: boolean = false;
  public sections$?: Observable<ISections[]>;

  @ViewChild('container') private container!: ElementRef;

  private _fire: Firestore = inject(Firestore);
  private _scroll: ScrollService = inject(ScrollService);

  public ngOnInit(): void {
    const ref = collection(this._fire, 'sections');
    this.sections$ = collectionData(ref).pipe(
      map(sections => sections.sort((a, b) => a["id"] - b["id"]))
    ) as Observable<ISections[]>;
  }

  public ngAfterViewInit(): void {
    if (this.container) this.intersectionObserver();
  }

  public send(option: boolean): void {
    this._scroll.send(option);
  }

  private intersectionObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) this.animation = true;
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    observer.observe(this.container.nativeElement);
  }
}

export interface ISections {
  id: number;
  path: string;
  title: string;
  image: string;
  description: string;
}