/**
 * VendorFeatureEntity — Child Entity
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import {
  VendorFeatureVO,
  type VendorFeatureVOProps,
} from '../value-objects/composites/vendor-feature.vo.js';

export interface VendorFeatureEntityProps {
  readonly vo: VendorFeatureVO;
}

export class VendorFeatureEntity extends BaseEntity<string> {
  private _vo: VendorFeatureVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorFeatureEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorFeatureVO { return this._vo; }
  get featureId() { return this._vo.id; }
  get vendorId() { return this._vo.vendorId; }
  get featureKey(): string { return this._vo.featureKey; }
  get type() { return this._vo.type; }
  get isEnabled(): boolean { return this._vo.isEnabled; }
  get limit(): number | undefined { return this._vo.limit; }
  get usedCount(): number { return this._vo.usedCount; }
  get remaining(): number | null { return this._vo.remaining; }
  get usagePercent(): number { return this._vo.usagePercent; }
  get expiresAt(): string | undefined { return this._vo.expiresAt; }
  get daysUntilExpiry(): number | null { return this._vo.daysUntilExpiry; }
  get config(): Readonly<Record<string, unknown>> | undefined { return this._vo.config; }

  // ═══ Predicates ═══
  isActive(): boolean { return this._vo.isActive(); }
  isDisabled(): boolean { return this._vo.isDisabled(); }
  isExpired(): boolean { return this._vo.isExpired(); }
  isExpiringSoon(days = 7): boolean { return this._vo.isExpiringSoon(days); }
  isLimitExceeded(): boolean { return this._vo.isLimitExceeded(); }
  canUse(): boolean { return this._vo.canUse(); }
  hasLimit(): boolean { return this._vo.hasLimit(); }
  hasConfig(): boolean { return this._vo.hasConfig(); }
  hasExpiry(): boolean { return this._vo.hasExpiry(); }

  getConfig<T = unknown>(key: string): T | undefined {
    return this._vo.getConfig<T>(key);
  }

  // ═══ Business Actions ═══
  enable(enabledBy: string, now: string = new Date().toISOString()): void {
    if (this.isEnabled) return;
    const current = this._vo.value;
    this._vo = VendorFeatureVO.create({
      ...current,
      isEnabled: true,
      enabledAt: now,
      enabledBy,
      disabledAt: undefined,
      disabledBy: undefined,
    });
    this.touch(now);
  }

  disable(disabledBy: string, reason?: string, now: string = new Date().toISOString()): void {
    if (!this.isEnabled) return;
    const current = this._vo.value;
    this._vo = VendorFeatureVO.create({
      ...current,
      isEnabled: false,
      disabledAt: now,
      disabledBy,
      config: reason ? { ...current.config, disableReason: reason } : current.config,
    });
    this.touch(now);
  }

  consume(count = 1, now: string = new Date().toISOString()): void {
    if (!this.canUse()) {
      throw new BusinessRuleError(
        `Cannot consume feature "${this.featureKey}" (expired, disabled, or limit exceeded)`,
        'FEATURE_CANNOT_BE_CONSUMED',
        { featureId: this.id, isActive: this.isActive(), isLimitExceeded: this.isLimitExceeded() },
      );
    }
    if (!Number.isInteger(count) || count <= 0) {
      throw new ValidationError('count must be a positive integer', 'usedCount');
    }
    if (this.limit !== undefined && this.usedCount + count > this.limit) {
      throw new BusinessRuleError(
        `Cannot consume ${count}: would exceed limit ${this.limit}`,
        'FEATURE_LIMIT_EXCEEDED',
        { featureId: this.id, usedCount: this.usedCount, limit: this.limit, requested: count },
      );
    }
    const current = this._vo.value;
    this._vo = VendorFeatureVO.create({
      ...current,
      usedCount: this.usedCount + count,
    });
    this.touch(now);
  }

  resetUsage(now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorFeatureVO.create({ ...current, usedCount: 0 });
    this.touch(now);
  }

  setLimit(limit: number | undefined, now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorFeatureVO.create({ ...current, limit });
    this.touch(now);
  }

  setExpiry(expiresAt: string | undefined, now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorFeatureVO.create({ ...current, expiresAt });
    this.touch(now);
  }

  setConfig(config: Readonly<Record<string, unknown>>, now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorFeatureVO.create({ ...current, config });
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorFeatureVO;
    now: string;
  }): VendorFeatureEntity {
    return new VendorFeatureEntity(params.id, params.now, params.now, { vo: params.vo }, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VendorFeatureEntityProps;
  }): VendorFeatureEntity {
    return new VendorFeatureEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
