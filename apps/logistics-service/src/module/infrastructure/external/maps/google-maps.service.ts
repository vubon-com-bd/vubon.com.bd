/**
 * GoogleMapsService — Google Maps API adapter
 * @module logistics-service/infrastructure/external/maps
 *
 * Uses shared-kernel GeoPoint shape: { lat, lng }
 */
import { Injectable, Logger } from '@nestjs/common';
import { BaseMapsService } from '@vubon/shared-kernel/infrastructure/external/maps';
import type { GeoPoint, MapsDistanceResult } from '@vubon/shared-kernel/infrastructure/external/maps';
import { GOOGLE_MAPS_CONFIG } from '@vubon/shared-config/integration';
import { httpGet } from '@vubon/shared-utils/common';
import { calculateDistance } from '@vubon/shared-utils/calculator';

interface GoogleDistanceResponse {
  rows: ReadonlyArray<{
    elements: ReadonlyArray<{
      distance?: { value: number };
      duration?: { value: number };
      status: string;
    }>;
  }>;
}

@Injectable()
export class GoogleMapsService extends BaseMapsService {
  readonly name = 'google-maps';
  private readonly logger = new Logger(GoogleMapsService.name);

  async calculateDistance(from: GeoPoint, to: GeoPoint): Promise<MapsDistanceResult> {
    if (!GOOGLE_MAPS_CONFIG.enabled || !GOOGLE_MAPS_CONFIG.enableDirections) {
      const km = calculateDistance(
        { lat: from.lat, lng: from.lng },
        { lat: to.lat, lng: to.lng },
      );
      return { distanceKm: km, durationMinutes: Math.round((km / 30) * 60) };
    }
    try {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${from.lat},${from.lng}&destinations=${to.lat},${to.lng}&key=${GOOGLE_MAPS_CONFIG.apiKey}`;
      const res = await httpGet<GoogleDistanceResponse>(url, { timeoutMs: GOOGLE_MAPS_CONFIG.timeoutMs });
      const el = res.rows[0]?.elements[0];
      if (!el || el.status !== 'OK' || !el.distance) {
        throw new MapsAdapterError('Google Maps returned no distance', 'GOOGLE_MAPS_NO_RESULT');
      }
      return {
        distanceKm: Math.round((el.distance.value / 1000) * 100) / 100,
        durationMinutes: el.duration ? Math.round(el.duration.value / 60) : 0,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Google Maps failed: ${msg} — using Haversine fallback`);
      const km = calculateDistance(
        { lat: from.lat, lng: from.lng },
        { lat: to.lat, lng: to.lng },
      );
      return { distanceKm: km, durationMinutes: Math.round((km / 30) * 60) };
    }
  }

  async geocode(address: string): Promise<GeoPoint | null> {
    if (!GOOGLE_MAPS_CONFIG.enabled || !GOOGLE_MAPS_CONFIG.enableGeocoding) return null;
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_CONFIG.apiKey}`;
      const res = await httpGet<{ results: ReadonlyArray<{ geometry: { location: { lat: number; lng: number } } }> }>(
        url, { timeoutMs: GOOGLE_MAPS_CONFIG.timeoutMs },
      );
      const r = res.results[0];
      if (!r) return null;
      return { lat: r.geometry.location.lat, lng: r.geometry.location.lng };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Google geocode failed: ${msg}`);
      return null;
    }
  }
}

export class MapsAdapterError extends Error {
  readonly code: string;
  constructor(message: string, code: string) {
    super(message);
    this.name = 'MapsAdapterError';
    this.code = code;
  }
}
