// * google-maps.component.ts
export interface IMap {
  center: { lat: number; lng: number };
  zoom: number;
  options: google.maps.MapOptions;
  markers: IMarker[];
}

export interface IMarker {
  position: { lat: number; lng: number };
  content: string;
  options: google.maps.MarkerOptions;
}

// * button.component.ts
export interface IButton {
  leyend: string;
  disabled?: boolean;
  color?: string;
  size?: string;
}
