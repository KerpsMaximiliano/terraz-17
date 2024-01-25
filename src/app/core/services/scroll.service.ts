import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private time: number = 1010;
  private transition: boolean = false;
  private action = new Subject<boolean>();

  public action$ = this.action.asObservable();

  public send(option: boolean): void {
    this.action.next(option);
  }

  public prevent(event: KeyboardEvent | WheelEvent | TouchEvent): boolean {
    if (this.transition) return true;

    if (
      event instanceof KeyboardEvent &&
      (event.key === 'ArrowUp' || event.key === 'ArrowDown')
    )
      return false;

    if (
      event instanceof KeyboardEvent &&
      (event.key === 'ArrowLeft' || event.key === 'ArrowRight')
    )
      return false;

    return true;
  }

  public inTransition(): void {
    this.transition = true;
    setTimeout(() => {
      this.transition = false;
    }, this.time);
  }

  public getTransition(): boolean {
    return this.transition;
  }
}