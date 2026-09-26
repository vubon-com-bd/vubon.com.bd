import { Injectable } from '@nestjs/common';
import { logisticsCalculator } from '@vubon/shared-utils/common';

interface GeoPoint {
  readonly lat: number;
  readonly lng: number;
}

@Injectable()
export class RouteOptimizerService {
  optimize(points: readonly GeoPoint[]): number {
    return logisticsCalculator.calculateRoute(points);
  }

  distanceBetween(a: GeoPoint, b: GeoPoint): number {
    return logisticsCalculator.calculateDistance(a, b);
  }
}
