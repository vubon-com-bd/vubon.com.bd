import { VENDOR_TIER } from '@vubon/shared-constants/business/vendor';
import { VendorTierVO } from '../value-objects/primitives/vendor-tier.vo';
import { VendorPerformanceEntity } from '../entities/vendor-performance.entity';

export class VendorTierCalculatorService {
  calculate(performance: VendorPerformanceEntity): VendorTierVO {
    const score = performance.overallScore.numeric;

    if (score >= 90) return VendorTierVO.create(VENDOR_TIER.DIAMOND);
    if (score >= 75) return VendorTierVO.create(VENDOR_TIER.PLATINUM);
    if (score >= 60) return VendorTierVO.create(VENDOR_TIER.GOLD);
    if (score >= 40) return VendorTierVO.create(VENDOR_TIER.SILVER);
    return VendorTierVO.create(VENDOR_TIER.BRONZE);
  }

  isUpgrade(from: VendorTierVO, to: VendorTierVO): boolean {
    const order: readonly string[] = [
      VENDOR_TIER.BRONZE,
      VENDOR_TIER.SILVER,
      VENDOR_TIER.GOLD,
      VENDOR_TIER.PLATINUM,
      VENDOR_TIER.DIAMOND,
    ];
    return order.indexOf(to.value) > order.indexOf(from.value);
  }
}
