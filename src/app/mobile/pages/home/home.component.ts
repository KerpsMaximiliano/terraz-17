import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';

// * Services.
import { CoreService } from '@app/core/services/core.service';

// * Components.
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CompanyComponent } from './components/company/company.component';
import { ContactComponent } from './components/contact/contact.component';
import { CustomServiceComponent } from './components/custom-service/custom-service.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { HeroComponent } from './components/hero/hero.component';
import { SectionsComponent } from './components/sections/sections.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroComponent,
    CompanyComponent,
    SectionsComponent,
    CustomServiceComponent,
    AboutUsComponent,
    ExperiencesComponent,
    ContactComponent
  ],
  selector: 'app-mobile-home',
  template: `
    <main style="height: 100%; width: 100%; padding: 0 16px; background-color: var(--white);">
      <section style="margin-bottom: 36px;"><app-mobile-home-hero /></section>
      @defer {
        <section style="margin-bottom: 36px;"><app-mobile-home-company /></section>
      }
      @defer {
        <section style="margin-bottom: 36px;"><app-mobile-home-sections /></section>
      }
      @defer {
        <section style="margin-bottom: 36px;"><app-mobile-home-custom-service /></section>
      }
      @defer {
        <section style="margin-bottom: 36px;"><app-mobile-home-about-us /></section>
      }
      @defer {
        <section style="margin-bottom: 36px;"><app-mobile-home-experiences /></section>
      }

      <section>
        @defer {
          <app-mobile-home-contact />
        }
      </section>
    </main>
  `,
})
export class HomeComponent implements AfterViewInit {
  private _core: CoreService = inject(CoreService);

  public ngAfterViewInit(): void {
    this._core.hide();
  }
}
