/**
 * OpenStreetMapService — OSM + Nominatim (free)
 * @module logistics-service/infrastructure/external/maps
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface GeocodeResult {
  readonly lat: number;
  readonly lon: number;
  readonly displayName: string;
}

@Injectable()
export class OpenStreetMapService {
  private readonly logger = new Logger(OpenStreetMapService.name);
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor() {
    this.baseUrl = getOptionalEnv('OSM_NOMINATIM_URL', 'https://nominatim.openstreetmap.org');
    this.timeoutMs = Number(getOptionalEnv('OSM_TIMEOUT_MS', '5000'));
  }

  async geocode(address: string): Promise<GeocodeResult | null> {
    try {
      const params = new URLSearchParams({ q: address, format: 'json', limit: '1' });
      const res = await fetch(`${this.baseUrl}/search?${params}`, {
        signal: AbortSignal.timeout(this.timeoutMs),
        headers: { 'User-Agent': 'vubon-logistics/1.0' },
      });
      if (!res.ok) return null;
      const data = await res.json() as Array<{ lat: string; lon: string; display_name: string }>;
      if (data.length === 0) return null;
      return {
        lat: parseFloat(data[0]!.lat),
        lon: parseFloat(data[0]!.lon),
        displayName: data[0]!.display_name,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.warn(`OSM error: ${msg}`);
      return null;
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/status`, { signal: AbortSignal.timeout(2000) });
      return res.ok;
    } catch { return false; }
  }
}
