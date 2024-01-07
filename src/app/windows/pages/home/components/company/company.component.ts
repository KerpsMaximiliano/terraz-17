import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

// * Services.
import { CoreService } from '@app/core/services/core.service';

// * Components.
import { ButtonComponent } from '@app/core/components/button.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent],
  selector: 'app-windows-home-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent {
  private _service: CoreService = inject(CoreService);

  public contact(): void {
    this._service.toElement();
  }
}
