import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

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
        padding-top: 16px;
      }

      button {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        min-width: calc(var(--view) * 3.5);
        gap: calc(var(--view) * 0.3);
        min-width: 36px;
        gap: 4px;
        border: none;
        background-color: transparent;
        cursor: pointer;
        z-index: 10;
      }

      button div {
        width: 100%;
        height: 8px;
        background-color: var(--nordic);
      }

      button div:nth-child(3) {
        align-self: flex-end;
        width: 24px;
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
