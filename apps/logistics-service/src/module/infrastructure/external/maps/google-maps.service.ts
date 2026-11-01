/**
 * GoogleMapsService — Google Maps API client
 * @module logistics-service/infrastructure/external/maps
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface DistanceMatrixInput {
  readonly origins: readonly string[];
  readonly destinations: readonly string[];
  readonly mode?: 'driving' | 'walking' | 'bicycling' | 'transit';
}

export interface DistanceMatrixResult {
  readonly distanceKm: number;
  readonly durationMinutes: number;
  readonly raw?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class GoogleMapsService {
  private readonly logger = new Logger(GoogleMapsService.name);
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly timeoutMs: number;

  constructor() {
    this.baseUrl = getOptionalEnv('GOOGLE_MAPS_API_URL', 'https://maps.googleapis.com');
    this.apiKey = getOptionalEnv('GOOGLE_MAPS_API_KEY', '');
    this.timeoutMs = Number(getOptionalEnv('GOOGLE_MAPS_TIMEOUT_MS', '5000'));
  }

  async distanceMatrix(input: DistanceMatrixInput): Promise<DistanceMatrixResult | null> {
    try {
      const params = new URLSearchParams({
        origins: input.origins.join('|'),
        destinations: input.destinations.join('|'),
        mode: input.mode ?? 'driving',
        key: this.apiKey,
      });
      const res = await fetch(`${this.baseUrl}/maps/api/distancematrix/json?${params}`, {
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!res.ok) return null;
      const data = await res.json() as {
        rows?: Array<{ elements?: Array<{ distance?: { value: number }; duration?: { value: number } }> }>;
      };
      const el = data.rows?.[0]?.elements?.[0];
      if (!el?.distance || !el.duration) return null;
      return {
        distanceKm: Math.round((el.distance.value / 1000) * 100) / 100,
        durationMinutes: Math.round(el.duration.value / 60),
        raw: data as Readonly<Record<string, unknown>>,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.warn(`Google Maps error: ${msg}`);
      return null;
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/maps/api/staticmap?key=${this.apiKey}&size=1x1`, {
        signal: AbortSignal.timeout(2000),
      });
      return res.ok || res.status < 500;
    } catch { return false; }
  }
}
