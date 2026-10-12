/**
 * OpenStreetMapService — Nominatim + Haversine adapter
 * @module logistics-service/infrastructure/external/maps
 *
 * Uses shared-kernel GeoPoint shape: { lat, lng }
 */
import { Injectable, Logger } from '@nestjs/common';
import { BaseMapsService } from '@vubon/shared-kernel/infrastructure/external/maps';
import type { GeoPoint, MapsDistanceResult } from '@vubon/shared-kernel/infrastructure/external/maps';
import { httpGet } from '@vubon/shared-utils/common';
import { calculateDistance } from '@vubon/shared-utils/calculator';

interface NominatimResponse extends Array<{ lat: string; lon: string }> {}

@Injectable()
export class OpenStreetMapService extends BaseMapsService {
  readonly name = 'openstreetmap';
  private readonly logger = new Logger(OpenStreetMapService.name);
  private readonly baseUrl = 'https://nominatim.openstreetmap.org';

  async calculateDistance(from: GeoPoint, to: GeoPoint): Promise<MapsDistanceResult> {
    const km = calculateDistance(
      { lat: from.lat, lng: from.lng },
      { lat: to.lat, lng: to.lng },
    );
    return { distanceKm: km, durationMinutes: Math.round((km / 30) * 60) };
  }

  async geocode(address: string): Promise<GeoPoint | null> {
    try {
      const url = `${this.baseUrl}/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
      const res = await httpGet<NominatimResponse>(url, {
        timeoutMs: 10000,
        headers: { 'User-Agent': 'vubon-logistics/1.0' },
      });
      const first = res[0];
      if (!first) return null;
      return { lat: Number(first.lat), lng: Number(first.lon) };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`OSM geocode failed: ${msg}`);
      return null;
    }
  }
}
