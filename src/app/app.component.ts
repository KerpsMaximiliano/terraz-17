import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// * AOS - Library.
import AOS from 'aos';

// * Services.
import { CoreService } from '@core/services/core.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  template: '<router-outlet />',
})
export class AppComponent {
  constructor(private _service: CoreService) {
    this._service.viewport();
  }

  ngAfterViewInit() {
    AOS.init();
  }

  ngAfterViewChecked() {
    AOS.refresh();
  }
}
