import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Renderer2,
  inject,
} from '@angular/core';

// * Directives.
import { NgClass, NgStyle } from '@angular/common';

// * Interfaces.
import { IButton } from '@core/interfaces/core.interface';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgStyle],
  selector: 'app-core-button',
  template: `
    <style>
      button {
        font-weight: 600;
        border: solid 2px var(--nordic);
        border-radius: 7px;
        padding: calc(var(--view) * 0.5) calc(var(--view) * 1);
        max-width: fit-content;
        cursor: pointer;
        background-color: var(--white);
      }

      button:hover {
        background-color: var(--nordic);
        color: var(--white);
      }

      button.disabled {
        opacity: 0.5;
        pointer-events: pointer;
        cursor: not-allowed;
        filter: grayscale(100%);
      }

      button.disabled:hover {
        filter: grayscale(100%);
      }
    </style>
    <button #button type="submit" [ngClass]="{ disabled: config?.disabled }" [style.fontSize]="config?.size">
      {{ config?.leyend }}
    </button>
  `,
})
export class ButtonComponent implements AfterViewInit {
  @Input() public config?: IButton;
  @ViewChild('button') public button?: ElementRef<HTMLButtonElement>;

  private _renderer: Renderer2 = inject(Renderer2);

  public ngAfterViewInit(): void {
    if (!this.button?.nativeElement) return;
    if (!this.config?.color) return;

    const button = this.button.nativeElement;
    const color = this.config.color;

    this._render(button, 'color', color);
    this._render(button, 'border-color', color);

    this._renderer.listen(button, 'mouseenter', () => {
      this._render(button, 'background-color', color);
      this._render(button, 'color', '#ffffff');
    });

    this._renderer.listen(button, 'mouseleave', () => {
      this._renderer.removeStyle(button, 'background-color');
      this._render(button, 'color', color);
    });
  }

  public ngOnDestroy(): void {
    this._renderer.destroy();
  }

  private _render(button: HTMLButtonElement, action: string, color: string): void {
    this._renderer.setStyle(button, action, color);
  }
}
