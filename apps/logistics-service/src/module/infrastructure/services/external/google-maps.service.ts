import { Injectable } from '@nestjs/common';
import { BaseMapsService } from '@vubon/shared-kernel/infrastructure';
import type {
  GeoPoint,
  MapsDistanceResult,
} from '@vubon/shared-kernel/infrastructure';
import { GOOGLE_MAPS_CONFIG } from '@vubon/shared-config/integration';
import { httpGet } from '@vubon/shared-utils/common';

interface GoogleDistanceMatrixResponse {
  readonly rows: readonly {
    readonly elements: readonly {
      readonly distance: { readonly value: number };
      readonly duration: { readonly value: number };
    }[];
  }[];
}

interface GoogleGeocodeResponse {
  readonly results: readonly {
    readonly geometry: { readonly location: { lat: number; lng: number } };
  }[];
}

const BASE_URL = 'https://maps.googleapis.com/maps/api';

@Injectable()
export class GoogleMapsService extends BaseMapsService {
  readonly name = 'google-maps';

  async calculateDistance(from: GeoPoint, to: GeoPoint): Promise<MapsDistanceResult> {
    const url = `${BASE_URL}/distancematrix/json?origins=${from.lat},${from.lng}&destinations=${to.lat},${to.lng}&key=${GOOGLE_MAPS_CONFIG.apiKey}`;
    const data = await httpGet<GoogleDistanceMatrixResponse>(url);
    const element = data.rows[0]?.elements[0];
    return {
      distanceKm: Number(((element?.distance.value ?? 0) / 1000).toFixed(2)),
      durationMinutes: Math.ceil((element?.duration.value ?? 0) / 60),
    };
  }

  async geocode(address: string): Promise<GeoPoint | null> {
    const url = `${BASE_URL}/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_CONFIG.apiKey}`;
    const data = await httpGet<GoogleGeocodeResponse>(url);
    const loc = data.results[0]?.geometry.location;
    return loc ? { lat: loc.lat, lng: loc.lng } : null;
  }
}
