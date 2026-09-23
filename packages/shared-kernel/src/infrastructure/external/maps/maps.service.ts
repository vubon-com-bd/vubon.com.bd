/**
 * Base Maps Service
 * @module shared-kernel/infrastructure/external/maps
 */
import { Injectable } from '@nestjs/common';
import type { GeoPoint, MapsDistanceResult } from './maps.client';

@Injectable()
export abstract class BaseMapsService {
  abstract readonly name: string;

  abstract calculateDistance(
    from: GeoPoint,
    to: GeoPoint,
  ): Promise<MapsDistanceResult>;

  abstract geocode(address: string): Promise<GeoPoint | null>;
}
