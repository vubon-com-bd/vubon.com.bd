import { Injectable } from '@nestjs/common';

@Injectable()
export class RoiCalculatorService {
  calculate(revenue: number, cost: number): number {
    if (cost === 0) return 0;
    return ((revenue - cost) / cost) * 100;
  }

  roas(revenue: number, cost: number): number {
    if (cost === 0) return 0;
    return revenue / cost;
  }
}
