/**
 * VendorEntity — AGGREGATE ROOT
 * @module vendor-service/domain/entities
 *
 * State machine:
 *   pending → approved → active ⇄ inactive
 *   pending → rejected → pending (resubmit)
 *   any(approved|active|inactive) → suspended → active
 *   any → blocked → deleted
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_LIMIT } from '@vubon/shared-constants/business';

import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import { VendorNameVO } from '../value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../value-objects/primitives/vendor-slug.vo.js';
import { VendorStatusVO } from '../value-objects/primitives/vendor-status.vo.js';
import { VendorTypeVO } from '../value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../value-objects/primitives/vendor-business-type.vo.js';
import { VendorTierVO } from '../value-objects/primitives/vendor-tier.vo.js';
import { BusinessDescriptionVO } from '../value-objects/primitives/business-description.vo.js';
import { RatingScoreVO } from '../value-objects/primitives/rating-score.vo.js';
import { VendorEmailVO } from '../value-objects/primitives/vendor-email.vo.js';

import { VendorContactVO } from '../value-objects/composites/vendor-contact.vo.js';
import { VendorBusinessInfoVO } from '../value-objects/composites/vendor-business-info.vo.js';
import { VendorLocationVO } from '../value-objects/composites/vendor-location.vo.js';
import { VendorBrandingVO } from '../value-objects/composites/vendor-branding.vo.js';
import { VendorCommissionConfigVO } from '../value-objects/composites/vendor-commission-config.vo.js';
import { VendorPayoutConfigVO } from '../value-objects/composites/vendor-payout-config.vo.js';

import {
  VendorRegisteredEvent,
  VendorStatusChangedEvent,
  VendorActivatedEvent,
  VendorDeactivatedEvent,
  VendorApprovedEvent,
  VendorRejectedEvent,
  VendorSuspendedEvent,
  VendorSuspensionLiftedEvent,
  VendorBlockedEvent,
  VendorDeletedEvent,
  VendorProfileUpdatedEvent,
  VendorContactUpdatedEvent,
  VendorBrandingUpdatedEvent,
  VendorCommissionConfiguredEvent,
  VendorPayoutConfiguredEvent,
  VendorVerifiedEvent,
  VendorFeaturedEvent,
  VendorUnfeaturedEvent,
  VendorTierUpgradedEvent,
  VendorTierDowngradedEvent,
  VendorRatingUpdatedEvent,
  VendorSalesRecordedEvent,
} from '../events/vendor.events.js';

export interface VendorEntityProps {
  readonly userId: string;
  readonly name: VendorNameVO;
  readonly slug: VendorSlugVO;
  readonly displayName: VendorNameVO;
  readonly description?: BusinessDescriptionVO;
  readonly type: VendorTypeVO;
  readonly businessType: VendorBusinessTypeVO;
  readonly email: VendorEmailVO;
  readonly contact?: VendorContactVO;
  readonly businessInfo?: VendorBusinessInfoVO;
  readonly location?: VendorLocationVO;
  readonly branding?: VendorBrandingVO;
  readonly commission?: VendorCommissionConfigVO;
  readonly payoutConfig?: VendorPayoutConfigVO;
  readonly tier: VendorTierVO;
  readonly rating: RatingScoreVO;
  readonly totalSales: number;
  readonly totalOrders: number;
  readonly isVerified: boolean;
  readonly isFeatured: boolean;
  readonly joinedAt: string;
  readonly approvedAt?: string;
}

export class VendorEntity extends AggregateRoot<string> {
  private _status: VendorStatusVO;
  private _name: VendorNameVO;
  private _displayName: VendorNameVO;
  private _description?: BusinessDescriptionVO;
  private _contact?: VendorContactVO;
  private _businessInfo?: VendorBusinessInfoVO;
  private _location?: VendorLocationVO;
  private _branding?: VendorBrandingVO;
  private _commission?: VendorCommissionConfigVO;
  private _payoutConfig?: VendorPayoutConfigVO;
  private _tier: VendorTierVO;
  private _rating: RatingScoreVO;
  private _totalSales: number;
  private _totalOrders: number;
  private _isVerified: boolean;
  private _isFeatured: boolean;
  private _approvedAt?: string;
  private _suspendedAt?: string;

  private readonly _userId: string;
  private readonly _slug: VendorSlugVO;
  private readonly _type: VendorTypeVO;
  private readonly _businessType: VendorBusinessTypeVO;
  private readonly _email: VendorEmailVO;
  private readonly _joinedAt: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorEntityProps,
    status: VendorStatusVO,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);

    this._userId = props.userId;
    this._name = props.name;
    this._slug = props.slug;
    this._displayName = props.displayName;
    this._description = props.description;
    this._type = props.type;
    this._businessType = props.businessType;
    this._email = props.email;
    this._contact = props.contact;
    this._businessInfo = props.businessInfo;
    this._location = props.location;
    this._branding = props.branding;
    this._commission = props.commission;
    this._payoutConfig = props.payoutConfig;
    this._tier = props.tier;
    this._rating = props.rating;
    this._totalSales = props.totalSales;
    this._totalOrders = props.totalOrders;
    this._isVerified = props.isVerified;
    this._isFeatured = props.isFeatured;
    this._joinedAt = props.joinedAt;
    this._approvedAt = props.approvedAt;
    this._status = status;

    this.assertInvariants();
  }

  // ═══════════════ Invariants ═══════════════
  private assertInvariants(): void {
    if (this._totalSales < 0) {
      throw new ValidationError('Total sales cannot be negative', 'totalSales');
    }
    if (this._totalOrders < 0 || !Number.isInteger(this._totalOrders)) {
      throw new ValidationError('Total orders must be a non-negative integer', 'totalOrders');
    }
    if (this._totalSales > VENDOR_LIMIT.MAX_ORDER_AMOUNT * 1_000_000) {
      throw new ValidationError('Total sales exceeds system limit', 'totalSales');
    }
  }

  // ═══════════════ Getters ═══════════════
  get userId(): string { return this._userId; }
  get name(): VendorNameVO { return this._name; }
  get slug(): VendorSlugVO { return this._slug; }
  get displayName(): VendorNameVO { return this._displayName; }
  get description(): BusinessDescriptionVO | undefined { return this._description; }
  get type(): VendorTypeVO { return this._type; }
  get businessType(): VendorBusinessTypeVO { return this._businessType; }
  get email(): VendorEmailVO { return this._email; }
  get contact(): VendorContactVO | undefined { return this._contact; }
  get businessInfo(): VendorBusinessInfoVO | undefined { return this._businessInfo; }
  get location(): VendorLocationVO | undefined { return this._location; }
  get branding(): VendorBrandingVO | undefined { return this._branding; }
  get commission(): VendorCommissionConfigVO | undefined { return this._commission; }
  get payoutConfig(): VendorPayoutConfigVO | undefined { return this._payoutConfig; }
  get status(): VendorStatusVO { return this._status; }
  get tier(): VendorTierVO { return this._tier; }
  get rating(): RatingScoreVO { return this._rating; }
  get totalSales(): number { return this._totalSales; }
  get totalOrders(): number { return this._totalOrders; }
  get isVerified(): boolean { return this._isVerified; }
  get isFeatured(): boolean { return this._isFeatured; }
  get joinedAt(): string { return this._joinedAt; }
  get approvedAt(): string | undefined { return this._approvedAt; }
  get suspendedAt(): string | undefined { return this._suspendedAt; }

  get toIdVO(): VendorIdVO {
    return VendorIdVO.reconstitute(this.id);
  }

  // ═══════════════ Predicates ═══════════════
  isPending(): boolean { return this._status.isPending(); }
  isApproved(): boolean { return this._status.isApproved(); }
  isActive(): boolean { return this._status.isActive(); }
  isInactive(): boolean { return this._status.isInactive(); }
  isSuspended(): boolean { return this._status.isSuspended(); }
  isRejected(): boolean { return this._status.isRejected(); }
  isBlocked(): boolean { return this._status.isBlocked(); }
  isDeleted(): boolean { return this._status.value === 'deleted'; }

  isOperational(): boolean {
    return this._status.isOperational();
  }

  /** All onboarding data present? */
  isFullyOnboarded(): boolean {
    return this._contact !== undefined
      && this._location !== undefined
      && this._branding !== undefined
      && this._commission !== undefined
      && this._payoutConfig !== undefined;
  }

  // ═══════════════ Business Methods — Lifecycle ═══════════════
  approve(approvedBy: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('approved');
    const from = this._status.value;
    this._status = VendorStatusVO.approved();
    this._approvedAt = now;
    this.emitStatusChange(from, 'approved', approvedBy, now);
    this.addDomainEvent(
      new VendorApprovedEvent({
        aggregateId: this.id,
        payload: { vendorId: this.id, approvedBy, approvedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  reject(rejectedBy: string, reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('rejected');
    if (!reason || reason.trim().length === 0) {
      throw new ValidationError('Rejection reason is required', 'reason');
    }
    const from = this._status.value;
    this._status = VendorStatusVO.rejected();
    this.emitStatusChange(from, 'rejected', rejectedBy, now);
    this.addDomainEvent(
      new VendorRejectedEvent({
        aggregateId: this.id,
        payload: { vendorId: this.id, rejectedBy, reason, rejectedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  activate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    const from = this._status.value;
    this._status = VendorStatusVO.active();
    this.emitStatusChange(from, 'active', undefined, now);
    this.addDomainEvent(
      new VendorActivatedEvent({
        aggregateId: this.id,
        payload: { vendorId: this.id, activatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('inactive');
    const from = this._status.value;
    this._status = VendorStatusVO.inactive();
    this.emitStatusChange(from, 'inactive', undefined, now, reason);
    this.addDomainEvent(
      new VendorDeactivatedEvent({
        aggregateId: this.id,
        payload: { vendorId: this.id, reason, deactivatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  suspend(
    reason: string,
    durationDays: number,
    suspendedBy: string,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('suspended');
    if (!reason || reason.trim().length === 0) {
      throw new ValidationError('Suspension reason is required', 'reason');
    }
    if (!Number.isInteger(durationDays) || durationDays <= 0) {
      throw new ValidationError('Suspension duration must be a positive integer', 'durationDays');
    }
    const from = this._status.value;
    this._status = VendorStatusVO.suspended();
    this._suspendedAt = now;
    this.emitStatusChange(from, 'suspended', suspendedBy, now, reason);
    this.addDomainEvent(
      new VendorSuspendedEvent({
        aggregateId: this.id,
        payload: {
          vendorId: this.id,
          reason,
          durationDays,
          suspendedBy,
          suspendedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  liftSuspension(liftedBy: string, now: string = new Date().toISOString()): void {
    if (!this._status.isSuspended()) {
      throw new BusinessRuleError(
        `Cannot lift suspension from status "${this._status.value}"`,
        'VENDOR_NOT_SUSPENDED',
        { vendorId: this.id, status: this._status.value },
      );
    }
    const from = this._status.value;
    this._status = VendorStatusVO.active();
    this._suspendedAt = undefined;
    this.emitStatusChange(from, 'active', liftedBy, now);
    this.addDomainEvent(
      new VendorSuspensionLiftedEvent({
        aggregateId: this.id,
        payload: { vendorId: this.id, liftedBy, liftedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  block(reason: string, blockedBy: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('blocked');
    if (!reason || reason.trim().length === 0) {
      throw new ValidationError('Block reason is required', 'reason');
    }
    const from = this._status.value;
    this._status = VendorStatusVO.blocked();
    this.emitStatusChange(from, 'blocked', blockedBy, now, reason);
    this.addDomainEvent(
      new VendorBlockedEvent({
        aggregateId: this.id,
        payload: { vendorId: this.id, reason, blockedBy, blockedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  softDelete(deletedBy?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('deleted');
    const from = this._status.value;
    this._status = VendorStatusVO.deleted();
    (this as unknown as { deletedAt: string }).deletedAt = now;
    this.emitStatusChange(from, 'deleted', deletedBy, now);
    this.addDomainEvent(
      new VendorDeletedEvent({
        aggregateId: this.id,
        payload: { vendorId: this.id, deletedBy, deletedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  // ═══════════════ Business Methods — Profile ═══════════════
  updateProfile(
    changes: {
      name?: VendorNameVO;
      displayName?: VendorNameVO;
      description?: BusinessDescriptionVO;
    },
    now: string = new Date().toISOString(),
  ): void {
    if (!this._status.isEditable()) {
      throw new BusinessRuleError(
        `Cannot edit vendor in status "${this._status.value}"`,
        'VENDOR_NOT_EDITABLE',
        { vendorId: this.id, status: this._status.value },
      );
    }
    const changeKeys: string[] = [];
    if (changes.name) { this._name = changes.name; changeKeys.push('name'); }
    if (changes.displayName) { this._displayName = changes.displayName; changeKeys.push('displayName'); }
    if (changes.description) { this._description = changes.description; changeKeys.push('description'); }

    if (changeKeys.length === 0) return;

    this.addDomainEvent(
      new VendorProfileUpdatedEvent({
        aggregateId: this.id,
        payload: { vendorId: this.id, changes: changeKeys, updatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updateContact(contact: VendorContactVO, now: string = new Date().toISOString()): void {
    if (!(contact instanceof VendorContactVO)) {
      throw new ValidationError('Contact must be a VendorContactVO', 'contact');
    }
    this._contact = contact;
    this.addDomainEvent(
      new VendorContactUpdatedEvent({
        aggregateId: this.id,
        payload: { vendorId: this.id, updatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updateBranding(branding: VendorBrandingVO, now: string = new Date().toISOString()): void {
    if (!(branding instanceof VendorBrandingVO)) {
      throw new ValidationError('Branding must be a VendorBrandingVO', 'branding');
    }
    this._branding = branding;
    this.addDomainEvent(
      new VendorBrandingUpdatedEvent({
        aggregateId: this.id,
        payload: {
          vendorId: this.id,
          hasLogo: branding.hasLogo(),
          hasBanner: branding.hasBanner(),
          updatedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  configureCommission(config: VendorCommissionConfigVO, now: string = new Date().toISOString()): void {
    if (!(config instanceof VendorCommissionConfigVO)) {
      throw new ValidationError('Commission config must be VendorCommissionConfigVO', 'commission');
    }
    this._commission = config;
    this.addDomainEvent(
      new VendorCommissionConfiguredEvent({
        aggregateId: this.id,
        payload: {
          vendorId: this.id,
          type: config.type,
          percent: config.percent.value,
          effectiveFrom: config.effectiveFrom,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  configurePayout(config: VendorPayoutConfigVO, now: string = new Date().toISOString()): void {
    if (!(config instanceof VendorPayoutConfigVO)) {
      throw new ValidationError('Payout config must be VendorPayoutConfigVO', 'payoutConfig');
    }
    this._payoutConfig = config;
    this.addDomainEvent(
      new VendorPayoutConfiguredEvent({
        aggregateId: this.id,
        payload: {
          vendorId: this.id,
          method: config.method,
          cycle: config.cycle,
          bankAccountId: config.bankAccountId,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markVerified(now: string = new Date().toISOString()): void {
    if (this._isVerified) return;
    if (!this._status.isOperational()) {
      throw new BusinessRuleError(
        `Cannot verify vendor in status "${this._status.value}"`,
        'VENDOR_NOT_OPERATIONAL',
        { vendorId: this.id, status: this._status.value },
      );
    }
    this._isVerified = true;
    this.addDomainEvent(
      new VendorVerifiedEvent({
        aggregateId: this.id,
        payload: { vendorId: this.id, verifiedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  feature(featuredBy?: string, now: string = new Date().toISOString()): void {
    if (this._isFeatured) return;
    if (!this._status.isOperational()) {
      throw new BusinessRuleError(
        'Only operational vendors can be featured',
        'VENDOR_NOT_OPERATIONAL',
        { vendorId: this.id, status: this._status.value },
      );
    }
    this._isFeatured = true;
    this.addDomainEvent(
      new VendorFeaturedEvent({
        aggregateId: this.id,
        payload: { vendorId: this.id, featuredAt: now, featuredBy },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  unfeature(now: string = new Date().toISOString()): void {
    if (!this._isFeatured) return;
    this._isFeatured = false;
    this.addDomainEvent(
      new VendorUnfeaturedEvent({
        aggregateId: this.id,
        payload: { vendorId: this.id, featuredAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  // ═══════════════ Business Methods — Tier & Rating ═══════════════
  upgradeTier(newTier: VendorTierVO, reason: string, now: string = new Date().toISOString()): void {
    if (!newTier.isHigherThan(this._tier)) {
      throw new BusinessRuleError(
        `Cannot upgrade from "${this._tier.value}" to "${newTier.value}"`,
        'VENDOR_TIER_NOT_UPGRADE',
        { vendorId: this.id, from: this._tier.value, to: newTier.value },
      );
    }
    const from = this._tier.value;
    this._tier = newTier;
    this.addDomainEvent(
      new VendorTierUpgradedEvent({
        aggregateId: this.id,
        payload: { vendorId: this.id, fromTier: from, toTier: newTier.value, reason, changedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  downgradeTier(newTier: VendorTierVO, reason: string, now: string = new Date().toISOString()): void {
    if (!newTier.isLowerThan(this._tier)) {
      throw new BusinessRuleError(
        `Cannot downgrade from "${this._tier.value}" to "${newTier.value}"`,
        'VENDOR_TIER_NOT_DOWNGRADE',
        { vendorId: this.id, from: this._tier.value, to: newTier.value },
      );
    }
    const from = this._tier.value;
    this._tier = newTier;
    this.addDomainEvent(
      new VendorTierDowngradedEvent({
        aggregateId: this.id,
        payload: { vendorId: this.id, fromTier: from, toTier: newTier.value, reason, changedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updateRating(newRating: RatingScoreVO, totalReviews: number, now: string = new Date().toISOString()): void {
    if (!Number.isInteger(totalReviews) || totalReviews < 0) {
      throw new ValidationError('Total reviews must be a non-negative integer', 'totalReviews');
    }
    const previous = this._rating.value;
    if (previous === newRating.value && totalReviews === 0) return;
    this._rating = newRating;
    this.addDomainEvent(
      new VendorRatingUpdatedEvent({
        aggregateId: this.id,
        payload: {
          vendorId: this.id,
          previousRating: previous,
          newRating: newRating.value,
          totalReviews,
          updatedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  // ═══════════════ Business Methods — Sales ═══════════════
  recordSale(orderId: string, amount: number, currency: string, now: string = new Date().toISOString()): void {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new ValidationError('Sale amount must be positive', 'amount');
    }
    if (!this.isOperational()) {
      throw new BusinessRuleError(
        'Cannot record sale for non-operational vendor',
        'VENDOR_NOT_OPERATIONAL',
        { vendorId: this.id, status: this._status.value },
      );
    }
    this._totalSales = Math.round((this._totalSales + amount) * 100) / 100;
    this._totalOrders += 1;

    this.addDomainEvent(
      new VendorSalesRecordedEvent({
        aggregateId: this.id,
        payload: { vendorId: this.id, orderId, amount, currency, recordedAt: now },
        version: this.version + 1,
      }),
    );

    // Auto tier upgrade if threshold crossed
    const correctTier = VendorTierVO.forSalesAmount(this._totalSales);
    if (correctTier.isHigherThan(this._tier)) {
      this.upgradeTier(correctTier, 'auto: sales threshold', now);
    }

    this.touch(now);
    this.incrementVersion();
  }

  // ═══════════════ Private Helpers ═══════════════
  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid vendor status transition: "${this._status.value}" → "${target}"`,
        'INVALID_VENDOR_STATUS_TRANSITION',
        { from: this._status.value, to: target, vendorId: this.id },
      );
    }
  }

  private emitStatusChange(
    from: string,
    to: string,
    changedBy?: string,
    changedAt: string = new Date().toISOString(),
    reason?: string,
  ): void {
    this.addDomainEvent(
      new VendorStatusChangedEvent({
        aggregateId: this.id,
        payload: { vendorId: this.id, fromStatus: from, toStatus: to, reason, changedBy, changedAt },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══════════════ Factories ═══════════════
  static create(params: {
    id: string;
    props: VendorEntityProps;
    now: string;
  }): VendorEntity {
    const entity = new VendorEntity(
      params.id,
      params.now,
      params.now,
      params.props,
      VendorStatusVO.pending(),
    );

    entity.addDomainEvent(
      new VendorRegisteredEvent({
        aggregateId: params.id,
        payload: {
          vendorId: params.id,
          userId: params.props.userId,
          name: params.props.name.value,
          slug: params.props.slug.value,
          email: params.props.email.value,
          type: params.props.type.value,
          businessType: params.props.businessType.value,
          registeredAt: params.now,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorEntityProps;
    status: VendorStatusVO;
    deletedAt?: string | null;
    version?: number;
  }): VendorEntity {
    const entity = new VendorEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.status,
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
