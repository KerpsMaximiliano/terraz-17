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
        scroll-snap-type: y mandatory;
        overflow-y: scroll;
        height: 100%;
        max-height: var(--height);
        background-color: var(--white);
      }

      section {
        scroll-snap-align: start;
        scroll-snap-stop: always;
        min-width: var(--width);
        min-height: var(--height);
      }
    </style>
    <main #scroll>
      <section><app-windows-home-hero /></section>
      @defer {
        <section #company><app-windows-home-company /></section>
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
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scroll') public scroll?: ElementRef;
  @ViewChild('contact') public contact?: ElementRef;
  public toContact: boolean = false;

  private _service: CoreService = inject(CoreService);
  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _listener: (() => void) | null = null;
  private _subscription: Subscription = this._service.contact.subscribe(() => this._scrollToElement());

  public ngAfterViewInit(): void {
    if (!this.scroll?.nativeElement) return;
    this._listener = this._service.scroll(this.scroll.nativeElement);
  }

  public ngOnDestroy(): void {
    this._listener?.();
    this._subscription?.unsubscribe();
  }

  public scrollToElement(element: HTMLElement): void {
    element.scrollIntoView({ behavior: 'smooth' });
  }

  private _scrollToElement(): void {
    this.toContact = true;
    this._cdr.markForCheck();
    setTimeout(() => {
      if (!this.contact?.nativeElement) return;
      this.scrollToElement(this.contact.nativeElement);
    }, 100);
    setTimeout(() => {
      this.toContact = false;
      this._cdr.markForCheck();
    }, 500);
  }
}
