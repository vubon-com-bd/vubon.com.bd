/**
 * VendorTier Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * Tier progression: bronze → silver → gold → platinum → diamond
 * Higher tier = lower commission + faster payout
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import {
  VENDOR_TIER,
  VENDOR_TIER_THRESHOLD,
  VENDOR_TIER_BENEFIT,
} from '@vubon/shared-constants/business';

export type VendorTierValue = (typeof VENDOR_TIER)[keyof typeof VENDOR_TIER];

const VALID_TIERS = new Set<string>(Object.values(VENDOR_TIER));
const TIER_ORDER: readonly VendorTierValue[] = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];

export class VendorTierVO extends BaseTypeVO<VendorTierValue> {
  private constructor(value: VendorTierValue) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return VALID_TIERS;
  }

  static create(raw: string): VendorTierVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('VendorTier must be a string', 'tier');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TIERS.has(normalized)) {
      throw new ValidationError(
        `Invalid VendorTier: "${normalized}". Allowed: ${[...VALID_TIERS].join(', ')}`,
        'tier',
      );
    }
    return new VendorTierVO(normalized as VendorTierValue);
  }

  static reconstitute(raw: string): VendorTierVO {
    return new VendorTierVO(raw as VendorTierValue);
  }

  // ─── Predicates ───
  isBronze(): boolean { return this.value === 'bronze'; }
  isSilver(): boolean { return this.value === 'silver'; }
  isGold(): boolean { return this.value === 'gold'; }
  isPlatinum(): boolean { return this.value === 'platinum'; }
  isDiamond(): boolean { return this.value === 'diamond'; }

  /** Numeric weight (0=lowest) for comparisons */
  get weight(): number {
    return TIER_ORDER.indexOf(this.value);
  }

  /** Check if this tier is higher than other */
  isHigherThan(other: VendorTierVO): boolean {
    return this.weight > other.weight;
  }

  /** Check if this tier is lower than other */
  isLowerThan(other: VendorTierVO): boolean {
    return this.weight < other.weight;
  }

  /** Next tier up (null if diamond) */
  nextTier(): VendorTierVO | null {
    const idx = TIER_ORDER.indexOf(this.value);
    if (idx < 0 || idx >= TIER_ORDER.length - 1) return null;
    return new VendorTierVO(TIER_ORDER[idx + 1]!);
  }

  /** Commission percent for this tier */
  get commissionPercent(): number {
    return VENDOR_TIER_BENEFIT[this.value].commissionPercent;
  }

  /** Payout cycle days for this tier */
  get payoutDays(): number {
    return VENDOR_TIER_BENEFIT[this.value].payoutDays;
  }

  /** Sales threshold for this tier */
  get threshold(): { readonly minSales: number; readonly maxSales: number | null } {
    const t = VENDOR_TIER_THRESHOLD[this.value];
    return { minSales: t.minSales, maxSales: t.maxSales };
  }

  /**
   * Compute tier from total sales.
   */
  static fromSales(totalSales: number): VendorTierVO {
    if (!Number.isFinite(totalSales) || totalSales < 0) {
      throw new ValidationError('totalSales must be a non-negative number', 'totalSales');
    }
    for (let i = TIER_ORDER.length - 1; i >= 0; i--) {
      const tier = TIER_ORDER[i]!;
      const t = VENDOR_TIER_THRESHOLD[tier];
      if (totalSales >= t.minSales) {
        return new VendorTierVO(tier);
      }
    }
    return new VendorTierVO('bronze');
  }
}
