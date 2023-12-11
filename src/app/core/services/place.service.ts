import { ElementRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleMap } from '@angular/google-maps';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private key: string = 'AIzaSyDztbDJpEj62tXlc31Ybwvgpb41uZ33ksA';
  private place: string = 'ChIJFWRYvOirt5URvyvxMfk9QMo';

  constructor(private http: HttpClient) {}

  // get() {
  //   const url = `"https://maps.googleapis.com/maps/api/js?v=3.exp&key=${this.key}&libraries=places"`;

  //   const request = {
  //     placeId: this.place,
  //     fields: ['reviews'],
  //   };
  //   const service = new google.maps.places.PlacesService();

  //   service.getDetails(request, () => {});
  // }

  // public callback = (place, status) => {
  //   if (status === google.maps.places.PlacesServiceStatus.OK) {
  //     this.reviews = place.reviews.slice();
  //   }
  // };
}

// const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${this.place}&fields=review&key=${this.key}`;
// return this.http.get(url);
