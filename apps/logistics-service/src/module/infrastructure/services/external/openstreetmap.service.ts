import { Injectable } from '@nestjs/common';
import { BaseMapsService } from '@vubon/shared-kernel/infrastructure';
import type {
  GeoPoint,
  MapsDistanceResult,
} from '@vubon/shared-kernel/infrastructure';
import { httpGet, logisticsCalculator } from '@vubon/shared-utils/common';

interface NominatimResponse {
  readonly lat: string;
  readonly lon: string;
}

@Injectable()
export class OpenStreetMapService extends BaseMapsService {
  readonly name = 'openstreetmap';
  private readonly baseUrl = 'https://nominatim.openstreetmap.org';

  async calculateDistance(from: GeoPoint, to: GeoPoint): Promise<MapsDistanceResult> {
    const distanceKm = logisticsCalculator.calculateDistance(from, to);
    const durationMinutes = logisticsCalculator.calculateDeliveryTime(distanceKm, 40);
    return { distanceKm, durationMinutes };
  }

  async geocode(address: string): Promise<GeoPoint | null> {
    const url = `${this.baseUrl}/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
    const data = await httpGet<NominatimResponse[]>(url);
    const first = data[0];
    return first ? { lat: Number(first.lat), lng: Number(first.lon) } : null;
  }
}
