import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import AOS from 'aos'
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
    ContactComponent,
  ],
  selector: 'app-windows-home',
  template: `
    <style>
      main {
        width: 100%;
        height: 100%;
        scroll-snap-type: y mandatory;
        background-color: var(--white);
      }

      section {
        scroll-snap-align: start;
        scroll-snap-stop: always;
        min-width: var(--width);
        min-height: var(--height);
      }
    </style>
    <main >
      <section ><app-windows-home-hero /></section>
      @defer {
        <section #company ><app-windows-home-company /></section>
      }
      @if (!toContact) {
        @defer {
          <section><app-windows-home-sections /></section>
        }
        @defer {
          <section><app-windows-home-custom-service /></section>
        }
        @defer {
          <section><app-windows-home-about-us /></section>
        }
        @defer {
          <section><app-windows-home-experiences /></section>
        }
      }
      <section #contact>
        @defer {
          <app-windows-home-contact />
        }
      </section>
    </main>
  `,
})
export class HomeComponent implements AfterViewInit, OnDestroy  {
  @ViewChild('contact') public contact?: ElementRef;
  public toContact: boolean = false;

  private _service: CoreService = inject(CoreService);
  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _subscription: Subscription = this._service.contact.subscribe(() => this._scrollToElement());

  public ngAfterViewInit(): void {
    this._service.hide();
  }

  public ngAfterViewChecked() {
    AOS.refresh();
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
