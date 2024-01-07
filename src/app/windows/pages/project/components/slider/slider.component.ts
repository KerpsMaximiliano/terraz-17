import { ChangeDetectionStrategy, Component } from '@angular/core';

// * Material.
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-windows-project-slider',
  imports: [MatIconModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
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
