import { Injectable } from '@nestjs/common';
import { logisticsCalculator } from '@vubon/shared-utils/common';

@Injectable()
export class EtaCalculatorService {
  calculate(distanceKm: number, avgSpeedKmh = 30): number {
    return logisticsCalculator.calculateDeliveryTime(distanceKm, avgSpeedKmh);
  }
}
