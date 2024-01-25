import {
    Component,
    ElementRef,
    ViewChild,
    Renderer2,
    AfterViewInit,
    OnDestroy,
    ChangeDetectionStrategy,
    inject,
    Inject,
  } from '@angular/core';
  import { Subscription } from 'rxjs';
  
  // * Services.
  import { ScrollService } from '@app/core/services/scroll.service';

  @Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-scroll-x',
    templateUrl: './scroll-x.component.html',
    styleUrls: ['./scroll-x.component.scss'],
  })
  export class ScrollXComponent implements AfterViewInit, OnDestroy {
    private scroll$: Subscription;
    private time: number = 800;
    private animation: string = `all 800ms linear`;
  
    @ViewChild('scrollX', { static: false }) public scrollX!: ElementRef;
    private _scroll: ScrollService = inject(ScrollService);
    private renderer: Renderer2 = inject(Renderer2);
    private el: ElementRef = inject(ElementRef);
  
    constructor() {
      this.scroll$ = this._scroll.action$.subscribe((option: boolean) =>
        this.scroll(option)
      );
  
      this.el.nativeElement.addEventListener(
        'wheel',
        (event: WheelEvent) => {
          if (
            event instanceof WheelEvent &&
            event.shiftKey &&
            !this._scroll.getTransition()
          )
            this.scroll(event.deltaY > 0);
        },
        { passive: true }
      );
  
      this.el.nativeElement.addEventListener(
        'keydown',
        (event: KeyboardEvent) => {
          if (this._scroll.prevent(event)) return;
          if (event.key === 'ArrowRight') this.scroll(true);
          if (event.key === 'ArrowLeft') this.scroll(false);
        },
        { passive: true }
      );
    }
  
    public ngAfterViewInit(): void {
      this.addChild(false);
    }
  
    public ngOnDestroy(): void {
      if (this.scroll$) this.scroll$.unsubscribe();
    }
  
    private scroll(action: boolean): void {
      this._scroll.inTransition();
      this.change(action);
      this.animate(true);
      this.transform(action ? -200 : 0);
    }
  
    private change(option: boolean): void {
      setTimeout(() => {
        this.animate(false);
        this.transform(-100);
        this.addChild(option);
      }, this.time);
    }
  
    private addChild(option: boolean): void {
      let e: HTMLElement = this.scrollX.nativeElement;
      if (option) {
        let first: HTMLElement = e.firstElementChild as HTMLElement;
        if (first) e.appendChild(first);
      } else {
        let last: HTMLElement = e.lastElementChild as HTMLElement;
        if (last) e.insertBefore(last, e.firstChild);
      }
    }
  
    private transform(percentage: number): void {
      this.setStyle('transform', `translateX(${percentage}%)`);
    }
  
    private animate(option: boolean): void {
      this.setStyle('transition', option ? this.animation : 'none');
    }
  
    private setStyle(prop: string, value: string): void {
      this.renderer.setStyle(this.scrollX.nativeElement, prop, value);
    }
  }