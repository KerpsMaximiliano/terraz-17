import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoreService {
  private _animation: boolean = false;
  private _time: number = 400;
  private _menu: Subject<void> = new Subject<void>();
  private _contact: Subject<void> = new Subject<void>();

  public menu: Observable<void> = this._menu.asObservable();
  public contact: Observable<void> = this._contact.asObservable();

  constructor() {
    window.addEventListener(
      'resize',
      () => {
        this.viewport();
      },
      { passive: true }
    );
  }

  public viewport(): void {
    document.documentElement.style.setProperty('--width', `${window.innerWidth}px`);
    document.documentElement.style.setProperty('--height', `${window.innerHeight}px`);
  }

  public scroll(element: HTMLElement): () => void {
    const listener = (e: WheelEvent) => this._handleWheelEvent(element, e);
    element.addEventListener('wheel', listener, { passive: false });
    return () => element.removeEventListener('wheel', listener);
  }

  public toElement(): void {
    this._contact.next();
  }

  public toggleMenu(): void {
    this._menu.next();
  }

  private _handleWheelEvent(element: HTMLElement, e: WheelEvent): void {
    const target = e.target as HTMLElement;
    if (target.closest('.google-maps')) return;

    e.preventDefault();
    if (this._animation) return;
    this._animation = true;
    element.scrollBy({
      top: e.deltaY,
      behavior: 'smooth',
    });
    setTimeout(() => {
      this._animation = false;
    }, this._time);
  }
}
