import { ChangeDetectionStrategy, Component } from '@angular/core';

// * Components.
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';

// * Components.

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-windows-projects',
  imports: [FooterComponent, HeaderComponent, MainComponent],
  template: `
    <div>
      <app-windows-projects-header />
      <app-windows-projects-main />
      <app-windows-projects-footer />
    </div>
  `,
})
export class ProjectsComponent {}
