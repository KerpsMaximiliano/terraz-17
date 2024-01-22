import { AsyncPipe, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

// * Google maps.
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';

// * Interfaces.
import { IMap } from '@core/interfaces/core.interface';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GoogleMapsModule, NgIf, AsyncPipe],
  selector: 'app-core-maps',
  template: `
    @if (api | async) {
      <google-map
        height="100%"
        width="100%"
        [center]="config.center"
        [zoom]="config.zoom"
        [options]="config.options"
        class="google-maps">
        @for (item of config.markers; track $index) {
          <map-marker
            #marker="mapMarker"
            [position]="item.position"
            (mapClick)="open(marker, item.content)"
            [options]="item.options" />
        }
        <map-info-window />
      </google-map>
    }
  `,
})
export class MapComponent {
  public api: Observable<boolean>;
  @ViewChild(MapInfoWindow) infoWindow?: MapInfoWindow;
  @ViewChild('marker') marker?: MapMarker;

  public config: IMap = {
    center: { lat: -32.924051254291605, lng: -60.66517274984414 },
    zoom: 17,
    options: {
      mapId: '1c2014259a61ba8a',
    },
    markers: [
      {
        position: { lat: -32.9238706, lng: -60.6652281 },
        content:
          '<h1 style="text-align: center; font-size: 20px;">TERRAZ</h1><h2 style="font-size: 16px;">DESARROLLOS URBANOS</h2>',
        options: {
          draggable: false,
          icon: 'assets/images/core/maps/apartment.svg',
        },
      },
    ],
  };

  constructor(httpClient: HttpClient) {
    this.api = httpClient
      .jsonp('https://maps.googleapis.com/maps/api/js?v=beta&key=AIzaSyDztbDJpEj62tXlc31Ybwvgpb41uZ33ksA', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  public open(marker: MapMarker, content: string) {
    if (!this.infoWindow) return;
    this.infoWindow.infoWindow?.setContent(content);
    this.infoWindow.open(marker);
  }
}
