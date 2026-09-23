import { Injectable } from '@nestjs/common';

const DEFAULT_POINTS_PER_BDT = 0.1;

@Injectable()
export class LoyaltyPointsCalculatorService {
  calculate(orderAmount: number, pointsPerUnit: number = DEFAULT_POINTS_PER_BDT): number {
    return Math.floor(orderAmount * pointsPerUnit);
  }

  calculateTier(points: number): string {
    if (points >= 100000) return 'diamond';
    if (points >= 50000) return 'platinum';
    if (points >= 20000) return 'gold';
    if (points >= 5000) return 'silver';
    return 'bronze';
  }
}
