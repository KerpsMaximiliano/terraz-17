import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// * Material.
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-mobile-project-slider',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
  @Input() public images?: string[] = [];

  public change(direction: boolean): void {
    if (direction) {
      const lists = document.querySelectorAll('.item');
      const slide = document.getElementById('slide');

      if (lists.length > 0 && slide) {
        slide.appendChild(lists[0]);
      }
    } else {
      const lists = document.querySelectorAll('.item');
      const slide = document.getElementById('slide');

      if (lists.length > 0 && slide) {
        slide.prepend(lists[lists.length - 1]);
      }
    }
  }
}
