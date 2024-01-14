import { ChangeDetectionStrategy, Component } from '@angular/core';

// * Components.
import { MenuComponent } from '@core/components/menu.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenuComponent],
  selector: 'app-mobile-home-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {}
