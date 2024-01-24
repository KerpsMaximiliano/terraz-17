import {
    Component,
    ChangeDetectionStrategy,
    inject,
    AfterViewInit,
  } from '@angular/core';
  
// * Directives.
import { NgClass, NgStyle } from '@angular/common';

// * Services.
import { CoreService } from '../services/core.service';

// * Materia.
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgStyle, MatIconModule],
  selector: 'app-success',
  template: ` 
  <style>
    div {
      text-align: center;
      padding: 20px;
      margin: 50px auto;
      max-width: 400px;

      & mat-icon{
        font-size: 46px;
        width: 50px;
        height: 50px;
        margin-bottom: 20px;
        color: #4caf50;
      }
    }

    h1 {
      font-size: 48px;
      color: #4caf50;
    }

    p {
      font-size: 14px;
      color: #757575;
    }

    a {
      text-decoration: none;
      color: #2196f3;
      font-weight: bold;
    }

  </style>
  <div data-aos="zoom-in" data-aos-duration="500" data-aos-delay="300">
    <mat-icon>check_circle</mat-icon>
    <h1>¡Éxito!</h1>
    <p>Su consulta fue enviada con éxito.</p>
    <p>En breve le vamos a estar respondiendo la consulta al email ingresado.</p>
    <a href="">Volver a la página de inicio</a>
  </div>
  `,
})
export class SuccessComponent implements AfterViewInit  {
  private _core: CoreService = inject(CoreService);

  public ngAfterViewInit(): void {
    this._core.hide();
  }
}
