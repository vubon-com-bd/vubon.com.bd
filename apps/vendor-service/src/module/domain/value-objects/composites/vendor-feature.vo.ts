/**
 * VendorFeatureVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * একটি feature flag / entitlement, যা vendor aggregate-এর সাথে যুক্ত।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { FeatureIdVO } from '../primitives/feature-id.vo.js';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { FeatureTypeVO } from '../primitives/feature-type.vo.js';

export interface VendorFeatureVOProps {
  readonly id: FeatureIdVO;
  readonly vendorId: VendorIdVO;
  readonly featureKey: string;
  readonly type: FeatureTypeVO;
  readonly isEnabled: boolean;
  readonly enabledAt?: string;
  readonly enabledBy?: string;
  readonly disabledAt?: string;
  readonly disabledBy?: string;
  readonly limit?: number;
  readonly usedCount: number;
  readonly config?: Readonly<Record<string, unknown>>;
  readonly expiresAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const FEATURE_KEY_PATTERN = /^[a-z][a-z0-9_]*(?::[a-z][a-z0-9_]*)*$/;

export class VendorFeatureVO extends BaseVO<VendorFeatureVOProps> {
  private constructor(props: VendorFeatureVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorFeatureVOProps): VendorFeatureVO {
    const vo = new VendorFeatureVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorFeatureVOProps): VendorFeatureVO {
    return new VendorFeatureVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (!v.featureKey || !FEATURE_KEY_PATTERN.test(v.featureKey)) {
      throw new ValidationError(
        'featureKey must be lowercase namespace:key format',
        'featureKey',
      );
    }
    if (v.featureKey.length > 100) {
      throw new ValidationError('featureKey max 100 chars', 'featureKey');
    }

    if (v.limit !== undefined) {
      if (!Number.isInteger(v.limit) || v.limit < 0) {
        throw new ValidationError('limit must be a non-negative integer', 'limit');
      }
    }

    if (!Number.isInteger(v.usedCount) || v.usedCount < 0) {
      throw new ValidationError('usedCount must be a non-negative integer', 'usedCount');
    }

    if (v.limit !== undefined && v.usedCount > v.limit) {
      throw new ValidationError('usedCount cannot exceed limit', 'usedCount');
    }

    // Status invariants
    if (v.isEnabled && !v.enabledAt) {
      throw new ValidationError('Enabled feature must have enabledAt', 'enabledAt');
    }
    if (!v.isEnabled && v.enabledAt && !v.disabledAt) {
      throw new ValidationError('Disabled feature must have disabledAt', 'disabledAt');
    }

    if (v.expiresAt && v.enabledAt) {
      if (new Date(v.expiresAt) <= new Date(v.enabledAt)) {
        throw new ValidationError('expiresAt must be after enabledAt', 'expiresAt');
      }
    }
  }

  // ─── Getters ───
  get id(): FeatureIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get featureKey(): string { return this.value.featureKey; }
  get type(): FeatureTypeVO { return this.value.type; }
  get isEnabled(): boolean { return this.value.isEnabled; }
  get enabledAt(): string | undefined { return this.value.enabledAt; }
  get enabledBy(): string | undefined { return this.value.enabledBy; }
  get disabledAt(): string | undefined { return this.value.disabledAt; }
  get disabledBy(): string | undefined { return this.value.disabledBy; }
  get limit(): number | undefined { return this.value.limit; }
  get usedCount(): number { return this.value.usedCount; }
  get config(): Readonly<Record<string, unknown>> | undefined { return this.value.config; }
  get expiresAt(): string | undefined { return this.value.expiresAt; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // ─── Predicates ───
  isAnalytics(): boolean { return this.type.isAnalytics(); }
  isAi(): boolean { return this.type.isAi(); }
  isStorage(): boolean { return this.type.isStorage(); }
  isApi(): boolean { return this.type.isApi(); }
  isPremium(): boolean { return this.type.isPremium(); }

  hasLimit(): boolean { return this.limit !== undefined; }
  hasConfig(): boolean { return this.config !== undefined; }
  hasExpiry(): boolean { return this.expiresAt !== undefined; }
  isDisabled(): boolean { return !this.isEnabled; }

  /** Currently active (enabled + not expired) */
  isActive(): boolean {
    if (!this.isEnabled) return false;
    if (this.expiresAt && Date.now() > new Date(this.expiresAt).getTime()) return false;
    return true;
  }

  /** Expired by date */
  isExpired(): boolean {
    if (!this.expiresAt) return false;
    return Date.now() > new Date(this.expiresAt).getTime();
  }

  /** Days until expiry (null if no expiry) */
  get daysUntilExpiry(): number | null {
    if (!this.expiresAt) return null;
    const diff = new Date(this.expiresAt).getTime() - Date.now();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  /** Expiring soon */
  isExpiringSoon(days = 7): boolean {
    const d = this.daysUntilExpiry;
    return d !== null && d >= 0 && d <= days;
  }

  /** Usage remaining (null if unlimited) */
  get remaining(): number | null {
    if (this.limit === undefined) return null;
    return Math.max(0, this.limit - this.usedCount);
  }

  /** Percent used (0-100) */
  get usagePercent(): number {
    if (this.limit === undefined || this.limit === 0) return 0;
    return Math.min(100, Math.round((this.usedCount / this.limit) * 10000) / 100);
  }

  /** Exceeded usage limit */
  isLimitExceeded(): boolean {
    if (this.limit === undefined) return false;
    return this.usedCount >= this.limit;
  }

  /** Can be used one more time */
  canUse(): boolean {
    return this.isActive() && !this.isLimitExceeded();
  }

  /** Reading config value with type safety */
  getConfig<T = unknown>(key: string): T | undefined {
    return this.config?.[key] as T | undefined;
  }
}
