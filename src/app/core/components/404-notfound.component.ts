import { Component, ChangeDetectionStrategy, inject, AfterViewInit } from '@angular/core';

// * Directives.
import { NgClass, NgStyle } from '@angular/common';
import { CoreService } from '../services/core.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgStyle, MatIconModule],
  selector: 'app-404',
  template: `
    <style>
      div {
        text-align: center;
        padding: 20px;
        margin: 50px auto;
        max-width: 400px;
        & mat-icon {
          font-size: 46px;
          width: 50px;
          height: 50px;
          margin-bottom: 20px;
          color: #757575;
        }
      }

      h1 {
        font-size: 48px;
        color: #gray;
      }

      p {
        font-size: 18px;
        color: #757575;
      }

      a {
        text-decoration: none;
        color: #2196f3;
        font-weight: bold;
      }

      @media (max-width: 600px) {
        div {
          max-width: 80%;
        }

        h1 {
          font-size: 2.5em;
        }

        p {
          font-size: 1em;
        }
      }
    </style>
    <div data-aos="zoom-in" data-aos-duration="500" data-aos-delay="300">
      <mat-icon>sentiment_very_dissatisfied</mat-icon>
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>La página que está buscando no se encuentra disponible.</p>
      <a href="">Volver a la página de inicio</a>
    </div>
  `,
})
export class PageNotFoundComponent implements AfterViewInit {
  private _core: CoreService = inject(CoreService);

  public ngAfterViewInit(): void {
    this._core.hide();
  }
}
