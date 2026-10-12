/**
 * InsuranceEntity — AGGREGATE ROOT (policy + claim lifecycle)
 * @module logistics-service/domain/entities
 *
 * Business rules:
 *  - Declared value between INSURANCE.MIN_VALUE and MAX_VALUE
 *  - Premium calculated from type's premiumPercent
 *  - Claim window = INSURANCE.CLAIM_WINDOW_DAYS after expiry
 *  - Auto-approve claims under INSURANCE.AUTO_APPROVE_UNDER
 *  - Only active/expired policies can file claim
 *  - Claims must include evidence (photos/proof)
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { INSURANCE } from '@vubon/shared-constants/logistics';
import type { Url, UserId } from '@vubon/shared-types/common';

import { InsuranceIdVO } from '../value-objects/primitives/insurance-id.vo.js';
import { InsuranceClaimIdVO } from '../value-objects/primitives/insurance-claim-id.vo.js';
import { PolicyNumberVO } from '../value-objects/primitives/policy-number.vo.js';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { InsuranceStatusVO } from '../value-objects/primitives/insurance-status.vo.js';
import { InsuranceTypeVO } from '../value-objects/primitives/insurance-type.vo.js';
import { InsuranceCoverageVO } from '../value-objects/primitives/insurance-coverage.vo.js';
import { InsuranceClaimStatusVO } from '../value-objects/primitives/insurance-claim-status.vo.js';
import { DeclaredValueVO } from '../value-objects/primitives/declared-value.vo.js';
import { InsurancePremiumVO } from '../value-objects/primitives/insurance-premium.vo.js';
import { ReasonTextVO } from '../value-objects/primitives/reason-text.vo.js';
import { DescriptionTextVO } from '../value-objects/primitives/description-text.vo.js';

import {
  InsuranceIssuedEvent,
  InsuranceActivatedEvent,
  InsuranceExpiredEvent,
  InsuranceCancelledEvent,
  InsuranceClaimSubmittedEvent,
  InsuranceClaimUnderReviewEvent,
  InsuranceClaimApprovedEvent,
  InsuranceClaimRejectedEvent,
  InsuranceClaimPaidEvent,
  InsuranceClaimAppealedEvent,
} from '../events/insurance.events.js';

import {
  InvalidInsuranceStatusTransitionError,
  InvalidInsuranceClaimStatusTransitionError,
  InsuranceNotAvailableError,
  InsuranceAmountOutOfRangeError,
  InsuranceClaimWindowExpiredError,
} from '../errors/insurance.errors.js';

export interface InsuranceClaimProps {
  readonly id: string;
  readonly claimNumber: string;
  readonly status: InsuranceClaimStatusVO;
  readonly reason: ReasonTextVO;
  readonly description?: DescriptionTextVO;
  readonly images: readonly Url[];
  readonly amount: number;
  readonly currency: string;
  readonly approvedAmount?: number;
  readonly submittedAt: string;
  readonly reviewedAt?: string;
  readonly approvedAt?: string;
  readonly rejectedAt?: string;
  readonly rejectionReason?: string;
  readonly paidAt?: string;
}

export interface InsuranceEntityProps {
  readonly policyNumber: PolicyNumberVO;
  readonly shipmentId?: ShipmentIdVO;
  readonly orderId?: OrderIdVO;
  readonly userId?: UserIdVO;
  readonly status: InsuranceStatusVO;
  readonly type: InsuranceTypeVO;
  readonly coverages: readonly InsuranceCoverageVO[];
  readonly declaredValue: DeclaredValueVO;
  readonly premium: InsurancePremiumVO;
  readonly startsAt: string;
  readonly expiresAt: string;
  readonly isClaimed: boolean;
  readonly claim?: InsuranceClaimProps;
}

export class InsuranceEntity extends AggregateRoot<string> {
  private _status: InsuranceStatusVO;
  private _isClaimed: boolean;
  private _claim?: InsuranceClaimProps;

  private readonly _policyNumber: PolicyNumberVO;
  private readonly _shipmentId?: ShipmentIdVO;
  private readonly _orderId?: OrderIdVO;
  private readonly _userId?: UserIdVO;
  private readonly _type: InsuranceTypeVO;
  private readonly _coverages: readonly InsuranceCoverageVO[];
  private readonly _declaredValue: DeclaredValueVO;
  private readonly _premium: InsurancePremiumVO;
  private readonly _startsAt: string;
  private readonly _expiresAt: string;

  private constructor(
    id: string, createdAt: string, updatedAt: string,
    props: InsuranceEntityProps, deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._policyNumber = props.policyNumber;
    this._shipmentId = props.shipmentId;
    this._orderId = props.orderId;
    this._userId = props.userId;
    this._status = props.status;
    this._type = props.type;
    this._coverages = [...props.coverages];
    this._declaredValue = props.declaredValue;
    this._premium = props.premium;
    this._startsAt = props.startsAt;
    this._expiresAt = props.expiresAt;
    this._isClaimed = props.isClaimed;
    this._claim = props.claim;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._coverages.length === 0) {
      throw new ValidationError('Insurance requires at least one coverage', 'coverages');
    }
    if (this._declaredValue.amount < INSURANCE.MIN_VALUE) {
      throw new InsuranceAmountOutOfRangeError(this._declaredValue.amount);
    }
    if (this._declaredValue.amount > INSURANCE.MAX_VALUE) {
      throw new InsuranceAmountOutOfRangeError(this._declaredValue.amount);
    }
    if (new Date(this._expiresAt).getTime() <= new Date(this._startsAt).getTime()) {
      throw new ValidationError('expiresAt must be after startsAt', 'expiresAt');
    }
    if (this._isClaimed && !this._claim) {
      throw new ValidationError('isClaimed=true requires a claim record', 'claim');
    }
  }

  get policyNumber(): PolicyNumberVO { return this._policyNumber; }
  get shipmentId(): ShipmentIdVO | undefined { return this._shipmentId; }
  get orderId(): OrderIdVO | undefined { return this._orderId; }
  get userId(): UserIdVO | undefined { return this._userId; }
  get status(): InsuranceStatusVO { return this._status; }
  get type(): InsuranceTypeVO { return this._type; }
  get coverages(): readonly InsuranceCoverageVO[] { return this._coverages; }
  get declaredValue(): DeclaredValueVO { return this._declaredValue; }
  get premium(): InsurancePremiumVO { return this._premium; }
  get startsAt(): string { return this._startsAt; }
  get expiresAt(): string { return this._expiresAt; }
  get isClaimed(): boolean { return this._isClaimed; }
  get claim(): InsuranceClaimProps | undefined { return this._claim; }
  get toIdVO(): InsuranceIdVO { return InsuranceIdVO.reconstitute(this.id); }

  isPending(): boolean { return this._status.isPending(); }
  isActive(): boolean { return this._status.isActive(); }
  isExpired(): boolean { return this._status.isExpired(); }
  isCancelled(): boolean { return this._status.isCancelled(); }
  isFinal(): boolean { return this._status.isFinal(); }

  covers(coverage: string): boolean {
    return this._coverages.some((c) => c.value === coverage);
  }

  isEffective(at: Date = new Date()): boolean {
    const t = at.getTime();
    return t >= new Date(this._startsAt).getTime() && t <= new Date(this._expiresAt).getTime();
  }

  isClaimWindowOpen(at: Date = new Date()): boolean {
    const expires = new Date(this._expiresAt).getTime();
    const windowMs = INSURANCE.CLAIM_WINDOW_DAYS * 24 * 60 * 60 * 1000;
    return at.getTime() <= expires + windowMs;
  }

  canFileClaim(at: Date = new Date()): boolean {
    if (this._isClaimed) return false;
    if (this.isCancelled()) return false;
    if (!this.isActive() && !this.isExpired()) return false;
    return this.isClaimWindowOpen(at);
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new InvalidInsuranceStatusTransitionError(this._status.value, target);
    }
  }
  private assertClaimTransitionTo(target: string): void {
    if (!this._claim) {
      throw new BusinessRuleError('No claim exists', 'INSURANCE_NO_CLAIM', { insuranceId: this.id });
    }
    if (!this._claim.status.canTransitionTo(target)) {
      throw new InvalidInsuranceClaimStatusTransitionError(this._claim.status.value, target);
    }
  }
  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  activate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    const from = this._status.value;
    this._status = InsuranceStatusVO.active();
    this.addDomainEvent(new InsuranceActivatedEvent({
      aggregateId: this.id,
      payload: { insuranceId: this.id, fromStatus: from, toStatus: 'active' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  expire(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('expired');
    const from = this._status.value;
    this._status = InsuranceStatusVO.expired();
    this.addDomainEvent(new InsuranceExpiredEvent({
      aggregateId: this.id,
      payload: { insuranceId: this.id, fromStatus: from, toStatus: 'expired' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  cancel(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('cancelled');
    const from = this._status.value;
    this._status = InsuranceStatusVO.cancelled();
    this.addDomainEvent(new InsuranceCancelledEvent({
      aggregateId: this.id,
      payload: { insuranceId: this.id, fromStatus: from, toStatus: 'cancelled', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  /** File a claim. Auto-approves if amount ≤ AUTO_APPROVE_UNDER. */
  fileClaim(params: {
    id: string;
    claimNumber: string;
    reason: ReasonTextVO;
    amount: number;
    currency: string;
    description?: DescriptionTextVO;
    images?: readonly Url[];
    now?: string;
  }): void {
    if (!this.canFileClaim()) {
      if (!this.isClaimWindowOpen()) {
        throw new InsuranceClaimWindowExpiredError(this._policyNumber.value, this._expiresAt);
      }
      throw new InsuranceNotAvailableError(
        `Insurance cannot be claimed (status: ${this._status.value}, claimed: ${this._isClaimed})`,
      );
    }
    if (params.amount <= 0 || params.amount > this._declaredValue.amount) {
      throw new ValidationError(
        `Claim amount must be > 0 and ≤ declared value ${this._declaredValue.amount}`,
        'amount',
      );
    }
    if (INSURANCE.REQUIRE_PHOTOS && (!params.images || params.images.length === 0)) {
      throw new ValidationError('Claim requires photo evidence', 'images');
    }
    const now = params.now ?? new Date().toISOString();
    const autoApprove = params.amount <= INSURANCE.AUTO_APPROVE_UNDER;
    const initialStatus = autoApprove
      ? InsuranceClaimStatusVO.approved()
      : InsuranceClaimStatusVO.submitted();

    this._claim = {
      id: params.id,
      claimNumber: params.claimNumber,
      status: initialStatus,
      reason: params.reason,
      description: params.description,
      images: params.images ?? [],
      amount: params.amount,
      currency: params.currency,
      approvedAmount: autoApprove ? params.amount : undefined,
      submittedAt: now,
      approvedAt: autoApprove ? now : undefined,
    };
    this._isClaimed = true;
    this._status = InsuranceStatusVO.claimed();

    this.addDomainEvent(new InsuranceClaimSubmittedEvent({
      aggregateId: this.id,
      payload: {
        insuranceId: this.id,
        claimId: params.id,
        fromStatus: 'none',
        toStatus: initialStatus.value,
        amount: params.amount,
      },
      version: this.version + 1,
    }));

    if (autoApprove) {
      this.addDomainEvent(new InsuranceClaimApprovedEvent({
        aggregateId: this.id,
        payload: {
          insuranceId: this.id,
          claimId: params.id,
          fromStatus: 'submitted',
          toStatus: 'approved',
          amount: params.amount,
        },
        version: this.version + 1,
      }));
    }
    this.touch(now);
    this.incrementVersion();
  }

  startClaimReview(now: string = new Date().toISOString()): void {
    this.assertClaimTransitionTo('under_review');
    if (!this._claim) return;
    this._claim = { ...this._claim, status: InsuranceClaimStatusVO.underReview(), reviewedAt: now };
    this.addDomainEvent(new InsuranceClaimUnderReviewEvent({
      aggregateId: this.id,
      payload: {
        insuranceId: this.id,
        claimId: this._claim.id,
        fromStatus: 'submitted',
        toStatus: 'under_review',
      },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  approveClaim(approvedAmount: number, now: string = new Date().toISOString()): void {
    this.assertClaimTransitionTo('approved');
    if (!this._claim) return;
    if (approvedAmount <= 0 || approvedAmount > this._claim.amount) {
      throw new ValidationError(
        `Approved amount must be > 0 and ≤ claimed ${this._claim.amount}`,
        'approvedAmount',
      );
    }
    this._claim = {
      ...this._claim,
      status: InsuranceClaimStatusVO.approved(),
      approvedAmount,
      approvedAt: now,
    };
    this.addDomainEvent(new InsuranceClaimApprovedEvent({
      aggregateId: this.id,
      payload: {
        insuranceId: this.id,
        claimId: this._claim.id,
        fromStatus: 'under_review',
        toStatus: 'approved',
        amount: approvedAmount,
      },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  rejectClaim(reason: string, now: string = new Date().toISOString()): void {
    this.assertClaimTransitionTo('rejected');
    if (!this._claim) return;
    this._claim = {
      ...this._claim,
      status: InsuranceClaimStatusVO.rejected(),
      rejectedAt: now,
      rejectionReason: reason,
    };
    this.addDomainEvent(new InsuranceClaimRejectedEvent({
      aggregateId: this.id,
      payload: {
        insuranceId: this.id,
        claimId: this._claim.id,
        fromStatus: 'under_review',
        toStatus: 'rejected',
        reason,
      },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  payClaim(now: string = new Date().toISOString()): void {
    this.assertClaimTransitionTo('paid');
    if (!this._claim || this._claim.approvedAmount === undefined) {
      throw new BusinessRuleError(
        'Cannot pay claim before approval',
        'CLAIM_NOT_APPROVED',
        { insuranceId: this.id },
      );
    }
    this._claim = { ...this._claim, status: InsuranceClaimStatusVO.paid(), paidAt: now };
    this.addDomainEvent(new InsuranceClaimPaidEvent({
      aggregateId: this.id,
      payload: {
        insuranceId: this.id,
        claimId: this._claim.id,
        fromStatus: 'approved',
        toStatus: 'paid',
        amount: this._claim.approvedAmount,
      },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  appealClaim(reason: string, now: string = new Date().toISOString()): void {
    this.assertClaimTransitionTo('appealed');
    if (!this._claim) return;
    this._claim = {
      ...this._claim,
      status: InsuranceClaimStatusVO.appealed(),
      rejectionReason: reason,
    };
    this.addDomainEvent(new InsuranceClaimAppealedEvent({
      aggregateId: this.id,
      payload: {
        insuranceId: this.id,
        claimId: this._claim.id,
        fromStatus: 'rejected',
        toStatus: 'appealed',
        reason,
      },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  // ─── Factories ───
  static create(params: {
    id: string;
    props: Omit<InsuranceEntityProps, 'status' | 'isClaimed' | 'premium' | 'policyNumber'> & {
      status?: InsuranceStatusVO;
      premium?: InsurancePremiumVO;
      policyNumber?: PolicyNumberVO;
    };
    now: string;
  }): InsuranceEntity {
    const status = params.props.status ?? InsuranceStatusVO.pending();
    const premium = params.props.premium
      ?? InsurancePremiumVO.calculate(
        params.props.declaredValue.amount,
        params.props.type.premiumPercent,
        params.props.declaredValue.currency,
      );
    const policyNumber = params.props.policyNumber ?? PolicyNumberVO.generate(Date.now());
    const fullProps: InsuranceEntityProps = {
      ...params.props,
      status,
      premium,
      policyNumber,
      isClaimed: false,
    };
    const entity = new InsuranceEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(new InsuranceIssuedEvent({
      aggregateId: params.id,
      payload: {
        insuranceId: params.id,
        policyNumber: policyNumber.value,
        shipmentId: fullProps.shipmentId?.value,
        orderId: fullProps.orderId?.value,
        type: fullProps.type.value,
        declaredValue: fullProps.declaredValue.amount,
        premium: premium.amount,
        currency: fullProps.declaredValue.currency,
      },
      version: 1,
    }));
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string; createdAt: string; updatedAt: string;
    deletedAt?: string | null; props: InsuranceEntityProps; version?: number;
  }): InsuranceEntity {
    const entity = new InsuranceEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
