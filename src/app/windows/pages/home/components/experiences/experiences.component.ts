import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { PlaceService } from '@app/core/services/place.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-windows-home-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss', '../common.scss'],
})
export class ExperiencesComponent {
  private _service = inject(PlaceService);

  ngOnInit() {
    // this._service.get().subscribe(data => console.log(data));
  }
}
