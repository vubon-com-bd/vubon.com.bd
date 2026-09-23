import { Injectable } from '@nestjs/common';
import { logisticsCalculator } from '@vubon/shared-utils/common';

interface GeoPoint {
  readonly lat: number;
  readonly lng: number;
}

@Injectable()
export class DistanceCalculatorService {
  calculate(from: GeoPoint, to: GeoPoint): number {
    return logisticsCalculator.calculateDistance(from, to);
  }
}
