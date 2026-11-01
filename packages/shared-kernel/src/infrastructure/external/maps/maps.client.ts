/**
 * Maps Client Types
 * @module shared-kernel/infrastructure/external/maps
 */
export interface GeoPoint {
  readonly lat: number;
  readonly lng: number;
}

export interface MapsDistanceResult {
  readonly distanceKm: number;
  readonly durationMinutes: number;
}
