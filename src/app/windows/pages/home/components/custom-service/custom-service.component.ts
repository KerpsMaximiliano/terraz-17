import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-windows-home-custom-service',
  templateUrl: './custom-service.component.html',
  styleUrls: ['./custom-service.component.scss', '../common.scss'],
})
export class CustomServiceComponent {}
