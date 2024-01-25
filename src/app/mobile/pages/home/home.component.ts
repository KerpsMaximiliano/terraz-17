import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild, inject } from '@angular/core';

// * Rxjs.
import { Subscription } from 'rxjs';

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

      <section #contact>
        @defer {
          <app-mobile-home-contact />
        }
      </section>
    </main>
  `,
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('contact') public contact?: ElementRef;
  public toContact: boolean = false;

  private _service: CoreService = inject(CoreService);
  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _subscription: Subscription = this._service.contact.subscribe(() => this._scrollToElement());

  public ngAfterViewInit(): void {
    this._service.hide();
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
  private _scrollToElement(): void {
    this.toContact = true;  
    this.contact?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.toContact = false;  
    this._cdr.markForCheck();
  }
}

