import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

// * Services.
import { CoreService } from '@core/services/core.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-core-menu',
  template: `
    <style>
      nav {
        position: absolute;
        top: 0;
        right: 0;
        padding: calc(var(--view) * 2) calc(var(--view) * 2) 0 0;
      }

      button {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        min-width: calc(var(--view) * 3.5);
        gap: calc(var(--view) * 0.3);
        border: none;
        background-color: transparent;
        cursor: pointer;
        z-index: 10;
      }

      button div {
        width: calc(var(--view) * 2.5);
        height: calc(var(--view) * 0.5);
        background-color: var(--nordic);
      }

      button div:nth-child(3) {
        align-self: flex-end;
        width: calc(var(--view) * 1.6);
      }
    </style>
    <nav>
      <button type="button" (click)="open()">
        <div></div>
        <div></div>
        <div></div>
      </button>
    </nav>
  `,
})
export class MenuComponent {
  private _service: CoreService = inject(CoreService);

  public open(): void {
    this._service.toggleMenu();
  }
}
