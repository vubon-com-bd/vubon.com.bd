/**
 * VendorEntity — AGGREGATE ROOT
 * @module vendor-service/domain/entities
 *
 * Vendor aggregate root — সব vendor-related business logic এখানে।
 *
 * State machine:
 *   pending → approved → active → inactive | suspended
 *   pending/approved → rejected
 *   any (except deleted) → blocked
 *   inactive/blocked/suspended → active (reactivate)
 *   any → deleted
 *
 * Invariants:
 *   - Featured vendor must be verified
 *   - Approved vendor must have approvedAt
 *   - Rejected vendor must have rejectionReason
 *   - Suspended vendor must have active suspension
 *   - Slug is immutable after activation
 *   - Email is unique (enforced at repository level)
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { VendorVO, type VendorVOProps } from '../value-objects/composites/vendor.vo.js';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import { VendorStatusVO } from '../value-objects/primitives/vendor-status.vo.js';
import { VendorTierVO } from '../value-objects/primitives/vendor-tier.vo.js';
import { VendorNameVO } from '../value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../value-objects/primitives/vendor-slug.vo.js';
import { BusinessDescriptionVO } from '../value-objects/primitives/business-description.vo.js';
import { RatingValueVO } from '../value-objects/primitives/rating-value.vo.js';

import {
  VendorRegisteredEvent,
  VendorUpdatedEvent,
  VendorProfileUpdatedEvent,
  VendorStatusChangedEvent,
  VendorApprovedEvent,
  VendorRejectedEvent,
  VendorActivatedEvent,
  VendorDeactivatedEvent,
  VendorSuspendedEvent,
  VendorReactivatedEvent,
  VendorBlockedEvent,
  VendorDeletedEvent,
  VendorFeaturedEvent,
  VendorUnfeaturedEvent,
  VendorVerifiedEvent,
} from '../events/vendor.events.js';

import { VendorTierUpgradedEvent } from '../events/vendor-tier.events.js';

// ─── Entity Props ──────────────────────────
export interface VendorEntityProps {
  readonly vo: VendorVO;
  readonly rejectionReason?: string;
  readonly suspensionId?: string;
  readonly deletedBy?: string;
  readonly featuredAt?: string;
  readonly verifiedAt?: string;
}

// ─── Entity Class ──────────────────────────
export class VendorEntity extends AggregateRoot<string> {
  // ═══ Mutable State ═══
  private _vo: VendorVO;
  private _rejectionReason?: string;
  private _suspensionId?: string;
  private _deletedBy?: string;
  private _featuredAt?: string;
  private _verifiedAt?: string;

  // ═══ Constructor ═══
  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
    this._rejectionReason = props.rejectionReason;
    this._suspensionId = props.suspensionId;
    this._deletedBy = props.deletedBy;
    this._featuredAt = props.featuredAt;
    this._verifiedAt = props.verifiedAt;
    this.assertInvariants();
  }

  // ═══════════════ Invariants ═══════════════
  private assertInvariants(): void {
    const v = this._vo;

    // Verified flag requires verifiedAt
    if (v.isVerified && !this._verifiedAt) {
      throw new ValidationError('Verified vendor must have verifiedAt', 'verifiedAt');
    }
    if (!v.isVerified && this._verifiedAt) {
      throw new ValidationError('Unverified vendor cannot have verifiedAt', 'verifiedAt');
    }

    // Featured vendor must be verified
    if (v.isFeatured && !v.isVerified) {
      throw new ValidationError('Featured vendor must be verified', 'isFeatured');
    }
    if (v.isFeatured && !this._featuredAt) {
      throw new ValidationError('Featured vendor must have featuredAt', 'featuredAt');
    }

    // Approved vendor must have approvedAt
    if (v.status.isApproved() && !v.approvedAt) {
      throw new ValidationError('Approved vendor must have approvedAt', 'approvedAt');
    }

    // Rejected vendor must have rejectionReason
    if (v.status.isRejected() && !this._rejectionReason) {
      throw new ValidationError('Rejected vendor must have rejectionReason', 'rejectionReason');
    }
    if (!v.status.isRejected() && this._rejectionReason) {
      throw new ValidationError('Non-rejected vendor cannot have rejectionReason', 'rejectionReason');
    }

    // Suspended vendor must have suspensionId
    if (v.status.isSuspended() && !this._suspensionId) {
      throw new ValidationError('Suspended vendor must have suspensionId', 'suspensionId');
    }
    if (!v.status.isSuspended() && this._suspensionId) {
      throw new ValidationError('Non-suspended vendor cannot have suspensionId', 'suspensionId');
    }

    // Deleted vendor must have deletedBy or deletedAt
    if (v.status.isDeleted() && !this.deletedAt) {
      throw new ValidationError('Deleted vendor must have deletedAt', 'deletedAt');
    }
  }

  // ═══════════════ Getters ═══════════════
  get vo(): VendorVO {
    return this._vo;
  }

  get vendorId(): VendorIdVO {
    return this._vo.id;
  }

  get status(): VendorStatusVO {
    return this._vo.status;
  }

  get tier(): VendorTierVO {
    return this._vo.tier;
  }

  get name(): VendorNameVO {
    return this._vo.name;
  }

  get slug(): VendorSlugVO {
    return this._vo.slug;
  }

  get rejectionReason(): string | undefined {
    return this._rejectionReason;
  }

  get suspensionId(): string | undefined {
    return this._suspensionId;
  }

  get deletedBy(): string | undefined {
    return this._deletedBy;
  }

  get featuredAt(): string | undefined {
    return this._featuredAt;
  }

  get verifiedAt(): string | undefined {
    return this._verifiedAt;
  }

  // ═══════════════ Predicates ═══════════════
  isPending(): boolean {
    return this.status.isPending();
  }
  isApproved(): boolean {
    return this.status.isApproved();
  }
  isActive(): boolean {
    return this.status.isActive();
  }
  isInactive(): boolean {
    return this.status.isInactive();
  }
  isSuspended(): boolean {
    return this.status.isSuspended();
  }
  isRejected(): boolean {
    return this.status.isRejected();
  }
  isBlocked(): boolean {
    return this.status.isBlocked();
  }
  isDeleted(): boolean {
    return this.status.isDeleted();
  }

  isEditable(): boolean {
    return this.status.isEditable();
  }
  isOperational(): boolean {
    return this.status.isOperational();
  }
  isVisible(): boolean {
    return this.status.isVisible();
  }
  isFinal(): boolean {
    return this.status.isFinal();
  }

  isVerified(): boolean {
    return this._vo.isVerified;
  }
  isFeatured(): boolean {
    return this._vo.isFeatured;
  }

  // ═══════════════ Business Capability Checks ═══════════════
  canBeApproved(): boolean {
    return this.status.canTransitionTo('approved');
  }

  canBeActivated(): boolean {
    return this.status.canTransitionTo('active');
  }

  canBeSuspended(): boolean {
    return this.status.canTransitionTo('suspended');
  }

  canBeReactivated(): boolean {
    return (
      (this.isInactive() || this.isSuspended() || this.isBlocked()) &&
      this.status.canTransitionTo('active')
    );
  }

  canBeDeleted(): boolean {
    return !this.isDeleted() && this.status.canTransitionTo('deleted');
  }

  canBeFeatured(): boolean {
    return this.isVerified() && !this.isFeatured() && !this.isDeleted();
  }

  // ═══════════════ Business Actions ═══════════════

  // ─── Update profile ───
  updateProfile(
    patch: {
      name?: VendorNameVO;
      description?: BusinessDescriptionVO;
      displayName?: string;
      logoUrl?: string;
      bannerUrl?: string;
      website?: string;
    },
    now: string = new Date().toISOString(),
  ): void {
    this.assertEditable('update profile');

    const current = this._vo.value;
    const changedFields: string[] = [];

    const nextProps: VendorVOProps = {
      ...current,
      name: patch.name ?? current.name,
      description: patch.description ?? current.description,
      displayName: patch.displayName ?? current.displayName,
      logoUrl: patch.logoUrl ?? current.logoUrl,
      bannerUrl: patch.bannerUrl ?? current.bannerUrl,
      website: patch.website ?? current.website,
    };

    if (patch.name !== undefined && !patch.name.equals(current.name)) {
      changedFields.push('name');
    }
    if (patch.description !== undefined && patch.description !== current.description) {
      changedFields.push('description');
    }
    if (patch.displayName !== undefined && patch.displayName !== current.displayName) {
      changedFields.push('displayName');
    }
    if (patch.logoUrl !== undefined && patch.logoUrl !== current.logoUrl) {
      changedFields.push('logoUrl');
    }
    if (patch.bannerUrl !== undefined && patch.bannerUrl !== current.bannerUrl) {
      changedFields.push('bannerUrl');
    }
    if (patch.website !== undefined && patch.website !== current.website) {
      changedFields.push('website');
    }

    if (changedFields.length === 0) return;

    this._vo = VendorVO.create(nextProps);
    this.emitProfileUpdate(changedFields);
    this.touch(now);
    this.incrementVersion();
  }

  // ─── Approve ───
  approve(approvedBy: string, now: string = new Date().toISOString()): void {
    if (!this.canBeApproved()) {
      throw new BusinessRuleError(
        `Cannot approve vendor in status "${this.status.value}"`,
        'VENDOR_CANNOT_BE_APPROVED',
        { vendorId: this.id, status: this.status.value },
      );
    }

    const from = this.status.value;
    const current = this._vo.value;

    this._vo = VendorVO.create({
      ...current,
      status: VendorStatusVO.approved(),
      approvedAt: now,
    });
    this._rejectionReason = undefined;

    this.emitStatusChange(from, 'approved', approvedBy);
    this.addDomainEvent(
      new VendorApprovedEvent({
        aggregateId: this.id,
        payload: {
          vendorId: this.id,
          approvedBy,
          approvedAt: now,
          tier: this.tier.value,
        },
        version: this.version + 1,
      }),
    );

    this.touch(now);
    this.incrementVersion();
  }

  // ─── Reject ───
  reject(
    reason: string,
    rejectedBy: string,
    now: string = new Date().toISOString(),
  ): void {
    if (!reason || reason.trim().length === 0) {
      throw new BusinessRuleError(
        'Rejection reason is required',
        'VENDOR_REJECTION_REASON_REQUIRED',
        { vendorId: this.id },
      );
    }

    const from = this.status.value;

    if (!this.status.canTransitionTo('rejected')) {
      throw new BusinessRuleError(
        `Cannot reject vendor in status "${from}"`,
        'INVALID_VENDOR_STATUS_TRANSITION',
        { vendorId: this.id, from, to: 'rejected' },
      );
    }

    const current = this._vo.value;
    this._vo = VendorVO.create({
      ...current,
      status: VendorStatusVO.rejected(),
      isFeatured: false,
    });
    this._rejectionReason = reason;
    this._featuredAt = undefined;

    this.emitStatusChange(from, 'rejected', rejectedBy);
    this.addDomainEvent(
      new VendorRejectedEvent({
        aggregateId: this.id,
        payload: {
          vendorId: this.id,
          rejectedBy,
          rejectedAt: now,
          reason,
        },
        version: this.version + 1,
      }),
    );

    this.touch(now);
    this.incrementVersion();
  }

  // ─── Activate ───
  activate(now: string = new Date().toISOString()): void {
    if (!this.canBeActivated()) {
      throw new BusinessRuleError(
        `Cannot activate vendor in status "${this.status.value}"`,
        'INVALID_VENDOR_STATUS_TRANSITION',
        { vendorId: this.id, from: this.status.value, to: 'active' },
      );
    }

    // Business rule: vendor must be verified to activate
    if (!this.isVerified) {
      throw new BusinessRuleError(
        'Vendor must be verified before activation',
        'VENDOR_NOT_VERIFIED',
        { vendorId: this.id },
      );
    }

    const from = this.status.value;
    const current = this._vo.value;

    this._vo = VendorVO.create({
      ...current,
      status: VendorStatusVO.active(),
    });

    this.emitStatusChange(from, 'active');
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

  // ─── Deactivate ───
  deactivate(reason?: string, now: string = new Date().toISOString()): void {
    if (!this.status.isActive()) {
      throw new BusinessRuleError(
        `Cannot deactivate vendor in status "${this.status.value}"`,
        'INVALID_VENDOR_STATUS_TRANSITION',
        { vendorId: this.id, from: this.status.value, to: 'inactive' },
      );
    }
    if (!this.status.canTransitionTo('inactive')) {
      throw new BusinessRuleError(
        `Invalid vendor status transition: "${this.status.value}" → "inactive"`,
        'INVALID_VENDOR_STATUS_TRANSITION',
        { vendorId: this.id, from: this.status.value, to: 'inactive' },
      );
    }

    const from = this.status.value;
    const current = this._vo.value;

    this._vo = VendorVO.create({
      ...current,
      status: VendorStatusVO.inactive(),
    });

    this.emitStatusChange(from, 'inactive');
    this.addDomainEvent(
      new VendorDeactivatedEvent({
        aggregateId: this.id,
        payload: { vendorId: this.id, deactivatedAt: now, reason },
        version: this.version + 1,
      }),
    );

    this.touch(now);
    this.incrementVersion();
  }

  // ─── Suspend ───
  suspend(
    suspensionId: string,
    reason: string,
    suspendedBy: string,
    durationDays?: number,
    now: string = new Date().toISOString(),
  ): void {
    if (!this.canBeSuspended()) {
      throw new BusinessRuleError(
        `Cannot suspend vendor in status "${this.status.value}"`,
        'VENDOR_CANNOT_BE_SUSPENDED',
        { vendorId: this.id, status: this.status.value },
      );
    }

    const from = this.status.value;
    const current = this._vo.value;

    this._vo = VendorVO.create({
      ...current,
      status: VendorStatusVO.suspended(),
    });
    this._suspensionId = suspensionId;

    this.emitStatusChange(from, 'suspended', suspendedBy, reason);
    this.addDomainEvent(
      new VendorSuspendedEvent({
        aggregateId: this.id,
        payload: {
          vendorId: this.id,
          suspensionId,
          reason,
          suspendedAt: now,
          suspendedBy,
          durationDays,
        },
        version: this.version + 1,
      }),
    );

    this.touch(now);
    this.incrementVersion();
  }

  // ─── Reactivate ───
  reactivate(now: string = new Date().toISOString()): void {
    if (!this.canBeReactivated()) {
      throw new BusinessRuleError(
        `Cannot reactivate vendor in status "${this.status.value}"`,
        'INVALID_VENDOR_STATUS_TRANSITION',
        { vendorId: this.id, from: this.status.value, to: 'active' },
      );
    }

    const from = this.status.value;
    const current = this._vo.value;

    this._vo = VendorVO.create({
      ...current,
      status: VendorStatusVO.active(),
    });
    this._suspensionId = undefined;

    this.emitStatusChange(from, 'active');
    this.addDomainEvent(
      new VendorReactivatedEvent({
        aggregateId: this.id,
        payload: { vendorId: this.id, reactivatedAt: now },
        version: this.version + 1,
      }),
    );

    this.touch(now);
    this.incrementVersion();
  }

  // ─── Block ───
  block(
    reason: string,
    blockedBy: string,
    now: string = new Date().toISOString(),
  ): void {
    if (this.isDeleted()) {
      throw new BusinessRuleError(
        'Cannot block a deleted vendor',
        'VENDOR_CANNOT_BE_BLOCKED',
        { vendorId: this.id },
      );
    }
    if (!this.status.canTransitionTo('blocked')) {
      throw new BusinessRuleError(
        `Invalid vendor status transition: "${this.status.value}" → "blocked"`,
        'INVALID_VENDOR_STATUS_TRANSITION',
        { vendorId: this.id, from: this.status.value, to: 'blocked' },
      );
    }

    const from = this.status.value;
    const current = this._vo.value;

    this._vo = VendorVO.create({
      ...current,
      status: VendorStatusVO.blocked(),
      isFeatured: false,
    });
    this._featuredAt = undefined;

    this.emitStatusChange(from, 'blocked', blockedBy, reason);
    this.addDomainEvent(
      new VendorBlockedEvent({
        aggregateId: this.id,
        payload: {
          vendorId: this.id,
          blockedAt: now,
          blockedBy,
          reason,
        },
        version: this.version + 1,
      }),
    );

    this.touch(now);
    this.incrementVersion();
  }

  // ─── Delete ───
  delete(deletedBy?: string, now: string = new Date().toISOString()): void {
    if (!this.canBeDeleted()) {
      throw new BusinessRuleError(
        `Cannot delete vendor in status "${this.status.value}"`,
        'VENDOR_CANNOT_BE_DELETED',
        { vendorId: this.id, status: this.status.value },
      );
    }

    const from = this.status.value;
    const current = this._vo.value;

    this._vo = VendorVO.create({
      ...current,
      status: VendorStatusVO.deleted(),
      isFeatured: false,
      isVerified: false,
    });
    this._deletedBy = deletedBy;
    this._featuredAt = undefined;
    this._verifiedAt = undefined;
    (this as unknown as { deletedAt: string | null }).deletedAt = now;

    this.emitStatusChange(from, 'deleted', deletedBy);
    this.addDomainEvent(
      new VendorDeletedEvent({
        aggregateId: this.id,
        payload: { vendorId: this.id, deletedAt: now, deletedBy },
        version: this.version + 1,
      }),
    );

    this.touch(now);
    this.incrementVersion();
  }

  // ─── Verify ───
  markVerified(now: string = new Date().toISOString()): void {
    if (this.isVerified()) return;

    const current = this._vo.value;
    this._vo = VendorVO.create({
      ...current,
      isVerified: true,
    });
    this._verifiedAt = now;

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

  // ─── Feature ───
  feature(featuredBy?: string, now: string = new Date().toISOString()): void {
    if (!this.canBeFeatured()) {
      throw new BusinessRuleError(
        `Cannot feature vendor in status "${this.status.value}" or not verified`,
        'VENDOR_CANNOT_BE_FEATURED',
        { vendorId: this.id, status: this.status.value, isVerified: this.isVerified() },
      );
    }

    const current = this._vo.value;
    this._vo = VendorVO.create({
      ...current,
      isFeatured: true,
    });
    this._featuredAt = now;

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

  // ─── Unfeature ───
  unfeature(reason?: string, now: string = new Date().toISOString()): void {
    if (!this.isFeatured()) return;

    const current = this._vo.value;
    this._vo = VendorVO.create({
      ...current,
      isFeatured: false,
    });
    this._featuredAt = undefined;

    this.addDomainEvent(
      new VendorUnfeaturedEvent({
        aggregateId: this.id,
        payload: { vendorId: this.id, unfeaturedAt: now, reason },
        version: this.version + 1,
      }),
    );

    this.touch(now);
    this.incrementVersion();
  }

  // ─── Change tier ───
  upgradeTier(
    newTier: VendorTierVO,
    reason: string,
    totalSales: number,
    now: string = new Date().toISOString(),
  ): void {
    if (!newTier.isHigherThan(this.tier)) {
      throw new BusinessRuleError(
        `Cannot upgrade tier from "${this.tier.value}" to "${newTier.value}"`,
        'TIER_CANNOT_BE_UPGRADED',
        { vendorId: this.id, current: this.tier.value, target: newTier.value },
      );
    }

    const fromTier = this.tier.value;
    const current = this._vo.value;

    this._vo = VendorVO.create({
      ...current,
      tier: newTier,
    });

    this.addDomainEvent(
      new VendorTierUpgradedEvent({
        aggregateId: this.id,
        payload: {
          vendorId: this.id,
          fromTier,
          toTier: newTier.value,
          upgradedAt: now,
          reason,
          totalSales,
          newCommissionPercent: newTier.commissionPercent,
          newPayoutDays: newTier.payoutDays,
        },
        version: this.version + 1,
      }),
    );

    this.touch(now);
    this.incrementVersion();
  }

  // ─── Update sales metrics ───
  recordSale(amount: number, now: string = new Date().toISOString()): void {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new ValidationError('Sale amount must be a non-negative finite number', 'amount');
    }

    const current = this._vo.value;
    this._vo = VendorVO.create({
      ...current,
      totalSales: current.totalSales + Math.round(amount * 100) / 100,
      totalOrders: current.totalOrders + 1,
    });

    this.touch(now);
    this.incrementVersion();
  }

  // ═══════════════ Private Helpers ═══════════════
  private assertEditable(action: string): void {
    if (!this.isEditable()) {
      throw new BusinessRuleError(
        `Cannot ${action} vendor in status "${this.status.value}"`,
        'VENDOR_NOT_EDITABLE',
        { vendorId: this.id, status: this.status.value, action },
      );
    }
  }

  private emitStatusChange(
    from: string,
    to: string,
    changedBy?: string,
    reason?: string,
  ): void {
    this.addDomainEvent(
      new VendorStatusChangedEvent({
        aggregateId: this.id,
        payload: {
          vendorId: this.id,
          fromStatus: from,
          toStatus: to,
          changedBy,
          reason,
        },
        version: this.version + 1,
      }),
    );
  }

  private emitProfileUpdate(changedFields: readonly string[]): void {
    this.addDomainEvent(
      new VendorProfileUpdatedEvent({
        aggregateId: this.id,
        payload: {
          vendorId: this.id,
          changedFields,
          updatedAt: new Date().toISOString(),
        },
        version: this.version + 1,
      }),
    );
    this.addDomainEvent(
      new VendorUpdatedEvent({
        aggregateId: this.id,
        payload: {
          vendorId: this.id,
          changedFields,
          updatedAt: new Date().toISOString(),
        },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══════════════ Factories ═══════════════
  static create(params: {
    id: VendorIdVO;
    props: Omit<VendorVOProps, 'status' | 'rating' | 'totalSales' | 'totalOrders' | 'isVerified' | 'isFeatured'>;
    now: string;
  }): VendorEntity {
    const vo = VendorVO.create({
      ...params.props,
      status: VendorStatusVO.pending(),
      rating: RatingValueVO.empty(),
      totalSales: 0,
      totalOrders: 0,
      isVerified: false,
      isFeatured: false,
    });

    const entity = new VendorEntity(
      params.id.value,
      params.now,
      params.now,
      { vo },
      null,
    );

    entity.addDomainEvent(
      new VendorRegisteredEvent({
        aggregateId: params.id.value,
        payload: {
          vendorId: params.id.value,
          userId: vo.userId.value,
          name: vo.name.value,
          slug: vo.slug.value,
          type: vo.type.value,
          businessType: vo.businessType.value,
          email: vo.email,
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
    deletedAt?: string | null;
    props: VendorEntityProps;
    version?: number;
  }): VendorEntity {
    const entity = new VendorEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
