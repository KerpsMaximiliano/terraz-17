import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable, of, catchError, map } from 'rxjs';

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
        #map
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
      <button (click)="getReviews()">view</button>
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
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?v=beta&key=AIzaSyDztbDJpEj62tXlc31Ybwvgpb41uZ33ksA&libraries=places',
        'callback'
      )
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

  getReviews() {
    const placeId = 'ChIJFWRYvOirt5URvyvxMfk9QMo';
    const map = new google.maps.Map(document.createElement('div'));
    const service = new google.maps.places.PlacesService(map);

    service.getDetails({ placeId: placeId }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(place?.reviews);
      } else {
        console.error('Error al obtener detalles del lugar:', status);
      }
    });
  }
}
