/**
 * Location Types
 * @module shared-types/common/geo
 *
 * Generic location shape — address + coordinates।
 */

import type { Address } from './address.types';
import type { LatLng } from './latlng.types';

export interface Location {
  readonly address: Address;
  readonly coordinates?: LatLng;
  readonly placeId?: string;
  readonly formattedAddress?: string;
}

export interface LocationWithDistance extends Location {
  readonly distanceKm: number;
  readonly durationMinutes?: number;
}

export interface Distance {
  readonly value: number;
  readonly unit: 'km' | 'mi' | 'm';
}

export interface GeoRoute {
  readonly origin: LatLng;
  readonly destination: LatLng;
  readonly distance: Distance;
  readonly durationMinutes: number;
  readonly polyline?: string;
}

export interface ServiceArea {
  readonly name: string;
  readonly center: LatLng;
  readonly radiusKm: number;
  readonly polygon?: readonly LatLng[];
}
