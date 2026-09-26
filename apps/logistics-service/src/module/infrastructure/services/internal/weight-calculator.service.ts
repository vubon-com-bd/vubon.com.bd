import { Injectable } from '@nestjs/common';
import { logisticsCalculator } from '@vubon/shared-utils/common';

@Injectable()
export class WeightCalculatorService {
  volumetric(lengthCm: number, widthCm: number, heightCm: number): number {
    return logisticsCalculator.calculateVolumetricWeight(lengthCm, widthCm, heightCm);
  }

  chargeable(actualKg: number, volumetricKg: number): number {
    return actualKg >= volumetricKg ? actualKg : volumetricKg;
  }
}
