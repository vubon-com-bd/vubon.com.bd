/**
 * Latitude / Longitude Types
 * @module shared-types/common/geo
 */

import type { Branded } from '../utils/branded.types';

export type Latitude = Branded<number, 'Latitude'>;
export type Longitude = Branded<number, 'Longitude'>;

export interface LatLng {
  readonly lat: Latitude | number;
  readonly lng: Longitude | number;
}

export interface BoundingBox {
  readonly north: number;
  readonly south: number;
  readonly east: number;
  readonly west: number;
}

export interface GeoPoint {
  readonly type: 'Point';
  readonly coordinates: readonly [number, number];
}

export interface GeoPolygon {
  readonly type: 'Polygon';
  readonly coordinates: readonly (readonly (readonly [number, number])[])[];
}

export const toLatitude = (value: number): Latitude => value as Latitude;
export const toLongitude = (value: number): Longitude => value as Longitude;
