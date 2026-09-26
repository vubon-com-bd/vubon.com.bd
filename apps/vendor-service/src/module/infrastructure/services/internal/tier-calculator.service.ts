import { Injectable } from '@nestjs/common';

export type VendorTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

const TIER_ORDER: readonly VendorTier[] = [
  'bronze',
  'silver',
  'gold',
  'platinum',
  'diamond',
];

@Injectable()
export class TierCalculatorService {
  calculate(score: number): VendorTier {
    if (score >= 90) return 'diamond';
    if (score >= 75) return 'platinum';
    if (score >= 60) return 'gold';
    if (score >= 40) return 'silver';
    return 'bronze';
  }

  isUpgrade(from: string, to: string): boolean {
    const fromIdx = TIER_ORDER.indexOf(from as VendorTier);
    const toIdx = TIER_ORDER.indexOf(to as VendorTier);
    return toIdx > fromIdx;
  }

  isDowngrade(from: string, to: string): boolean {
    const fromIdx = TIER_ORDER.indexOf(from as VendorTier);
    const toIdx = TIER_ORDER.indexOf(to as VendorTier);
    return toIdx < fromIdx;
  }
}
