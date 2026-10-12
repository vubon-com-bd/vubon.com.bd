/**
 * VendorTier Value Object — loyalty / commission tier
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import {
  VENDOR_TIER,
  VENDOR_TIER_THRESHOLD,
  VENDOR_TIER_BENEFIT,
} from '@vubon/shared-constants/business';
import { InvalidVendorTierError } from '../../errors/vendor.errors.js';

const ALLOWED = Object.values(VENDOR_TIER) as readonly string[];

const TIER_ORDER: readonly string[] = [
  VENDOR_TIER.BRONZE,
  VENDOR_TIER.SILVER,
  VENDOR_TIER.GOLD,
  VENDOR_TIER.PLATINUM,
  VENDOR_TIER.DIAMOND,
];

export class VendorTierVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return new Set(ALLOWED);
  }

  static create(raw: string): VendorTierVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidVendorTierError(String(raw), ALLOWED);
    }
    return new VendorTierVO(raw);
  }

  static reconstitute(raw: string): VendorTierVO {
    return new VendorTierVO(raw);
  }

  // ─── Business helpers ───
  getThreshold(): { minSales: number; maxSales: number | null } {
    const t = VENDOR_TIER_THRESHOLD[this.value as keyof typeof VENDOR_TIER_THRESHOLD];
    return { minSales: t.minSales, maxSales: t.maxSales };
  }

  getBenefit(): { commissionPercent: number; payoutDays: number } {
    const b = VENDOR_TIER_BENEFIT[this.value as keyof typeof VENDOR_TIER_BENEFIT];
    return { commissionPercent: b.commissionPercent, payoutDays: b.payoutDays };
  }

  getCommissionPercent(): number {
    return this.getBenefit().commissionPercent;
  }

  getPayoutDays(): number {
    return this.getBenefit().payoutDays;
  }

  getRank(): number {
    return TIER_ORDER.indexOf(this.value);
  }

  /** Returns next tier in progression, or null if already top. */
  nextTier(): VendorTierVO | null {
    const idx = this.getRank();
    if (idx < 0 || idx >= TIER_ORDER.length - 1) return null;
    return new VendorTierVO(TIER_ORDER[idx + 1]!);
  }

  /** Returns previous tier, or null if already bottom. */
  previousTier(): VendorTierVO | null {
    const idx = this.getRank();
    if (idx <= 0) return null;
    return new VendorTierVO(TIER_ORDER[idx - 1]!);
  }

  isHigherThan(other: VendorTierVO): boolean {
    return this.getRank() > other.getRank();
  }

  isLowerThan(other: VendorTierVO): boolean {
    return this.getRank() < other.getRank();
  }

  isSameAs(other: VendorTierVO): boolean {
    return this.getRank() === other.getRank();
  }

  static forSalesAmount(sales: number): VendorTierVO {
    const order: Array<{ tier: string; minSales: number; maxSales: number | null }> = [
      { tier: VENDOR_TIER.BRONZE, minSales: VENDOR_TIER_THRESHOLD.bronze.minSales, maxSales: VENDOR_TIER_THRESHOLD.bronze.maxSales },
      { tier: VENDOR_TIER.SILVER, minSales: VENDOR_TIER_THRESHOLD.silver.minSales, maxSales: VENDOR_TIER_THRESHOLD.silver.maxSales },
      { tier: VENDOR_TIER.GOLD, minSales: VENDOR_TIER_THRESHOLD.gold.minSales, maxSales: VENDOR_TIER_THRESHOLD.gold.maxSales },
      { tier: VENDOR_TIER.PLATINUM, minSales: VENDOR_TIER_THRESHOLD.platinum.minSales, maxSales: VENDOR_TIER_THRESHOLD.platinum.maxSales },
      { tier: VENDOR_TIER.DIAMOND, minSales: VENDOR_TIER_THRESHOLD.diamond.minSales, maxSales: VENDOR_TIER_THRESHOLD.diamond.maxSales },
    ];
    for (const t of order) {
      if (sales >= t.minSales && (t.maxSales === null || sales <= t.maxSales)) {
        return new VendorTierVO(t.tier);
      }
    }
    return new VendorTierVO(VENDOR_TIER.BRONZE);
  }
}
