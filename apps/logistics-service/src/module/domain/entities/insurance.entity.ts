/**
 * InsuranceEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { INSURANCE } from '@vubon/shared-constants/logistics';

import { InsuranceIdVO } from '../value-objects/primitives/insurance-id.vo.js';
import { InsuranceStatusVO } from '../value-objects/primitives/insurance-status.vo.js';
import { InsuranceTypeVO } from '../value-objects/primitives/insurance-type.vo.js';
import { InsuranceCoverageVO } from '../value-objects/primitives/insurance-coverage.vo.js';

import {
  InsuranceCreatedEvent,
  InsuranceActivatedEvent,
  InsuranceExpiredEvent,
  InsuranceCancelledEvent,
  InsuranceClaimSubmittedEvent,
  InsuranceClaimReviewedEvent,
  InsuranceClaimApprovedEvent,
  InsuranceClaimRejectedEvent,
  InsuranceClaimPaidEvent,
  InsuranceStatusChangedEvent,
} from '../events/insurance.events.js';

export interface ClaimState {
  readonly id: string;
  readonly claimNumber: string;
  readonly reason: string;
  readonly description?: string;
  readonly images?: readonly string[];
  readonly amount: number;
  readonly approvedAmount?: number;
  readonly status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'paid' | 'appealed';
  readonly submittedAt: string;
  readonly reviewedAt?: string;
  readonly approvedAt?: string;
  readonly rejectedAt?: string;
  readonly rejectionReason?: string;
  readonly paidAt?: string;
}

export interface InsuranceEntityProps {
  readonly policyNumber: string;
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly userId?: string;
  readonly status: InsuranceStatusVO;
  readonly type: InsuranceTypeVO;
  readonly coverages: InsuranceCoverageVO;
  readonly declaredValue: number;
  readonly premium: number;
  readonly currency: string;
  readonly startsAt: string;
  readonly expiresAt: string;
  readonly isClaimed: boolean;
  readonly provider?: string;
  readonly notes?: string;
  readonly claims?: readonly ClaimState[];
  readonly activatedAt?: string;
  readonly expiredAt?: string;
  readonly cancelledAt?: string;
  readonly cancelReason?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class InsuranceEntity extends AggregateRoot<string> {
  private _status: InsuranceStatusVO;
  private _isClaimed: boolean;
  private _claims: ClaimState[];
  private _activatedAt?: string;
  private _expiredAt?: string;
  private _cancelledAt?: string;
  private _cancelReason?: string;
  private _notes?: string;

  private readonly _policyNumber: string;
  private readonly _shipmentId?: string;
  private readonly _orderId?: string;
  private readonly _userId?: string;
  private readonly _type: InsuranceTypeVO;
  private readonly _coverages: InsuranceCoverageVO;
  private readonly _declaredValue: number;
  private readonly _premium: number;
  private readonly _currency: string;
  private readonly _startsAt: string;
  private readonly _expiresAt: string;
  private readonly _provider?: string;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: InsuranceEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._policyNumber = props.policyNumber;
    this._shipmentId = props.shipmentId;
    this._orderId = props.orderId;
    this._userId = props.userId;
    this._status = props.status;
    this._type = props.type;
    this._coverages = props.coverages;
    this._declaredValue = props.declaredValue;
    this._premium = props.premium;
    this._currency = props.currency;
    this._startsAt = props.startsAt;
    this._expiresAt = props.expiresAt;
    this._isClaimed = props.isClaimed;
    this._provider = props.provider;
    this._notes = props.notes;
    this._claims = props.claims ? [...props.claims] : [];
    this._activatedAt = props.activatedAt;
    this._expiredAt = props.expiredAt;
    this._cancelledAt = props.cancelledAt;
    this._cancelReason = props.cancelReason;
    this._metadata = props.metadata;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._policyNumber) {
      throw new ValidationError('Policy number required', 'policyNumber');
    }
    if (!this._currency || this._currency.length < 3) {
      throw new ValidationError('Currency must be at least 3 chars', 'currency');
    }
    if (this._declaredValue <= 0) {
      throw new ValidationError('Declared value must be positive', 'declaredValue');
    }
    if (this._declaredValue < INSURANCE.MIN_VALUE || this._declaredValue > INSURANCE.MAX_VALUE) {
      throw new ValidationError(
        `Declared value must be ${INSURANCE.MIN_VALUE}-${INSURANCE.MAX_VALUE}`,
        'declaredValue',
      );
    }
    if (this._premium < 0) {
      throw new ValidationError('Premium cannot be negative', 'premium');
    }
  }

  get policyNumber(): string { return this._policyNumber; }
  get shipmentId(): string | undefined { return this._shipmentId; }
  get orderId(): string | undefined { return this._orderId; }
  get userId(): string | undefined { return this._userId; }
  get status(): InsuranceStatusVO { return this._status; }
  get type(): InsuranceTypeVO { return this._type; }
  get coverages(): InsuranceCoverageVO { return this._coverages; }
  get declaredValue(): number { return this._declaredValue; }
  get premium(): number { return this._premium; }
  get currency(): string { return this._currency; }
  get startsAt(): string { return this._startsAt; }
  get expiresAt(): string { return this._expiresAt; }
  get isClaimed(): boolean { return this._isClaimed; }
  get provider(): string | undefined { return this._provider; }
  get notes(): string | undefined { return this._notes; }
  get claims(): readonly ClaimState[] { return this._claims; }
  get activatedAt(): string | undefined { return this._activatedAt; }
  get expiredAt(): string | undefined { return this._expiredAt; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get cancelReason(): string | undefined { return this._cancelReason; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): InsuranceIdVO { return InsuranceIdVO.reconstitute(this.id); }

  isPending(): boolean { return this._status.isPending(); }
  isActive(): boolean { return this._status.isActive(); }
  isInactive(): boolean { return this._status.isInactive(); }
  isExpired(): boolean { return this._status.isExpired(); }
  isCancelled(): boolean { return this._status.isCancelled(); }
  isClaimedStatus(): boolean { return this._status.isClaimed(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isClaimable(): boolean { return this._status.isClaimable(); }

  isExpiredByDate(ref: Date = new Date()): boolean {
    return new Date(this._expiresAt) < ref;
  }

  get activeClaim(): ClaimState | undefined {
    return this._claims.find(
      (c) => c.status !== 'rejected' && c.status !== 'paid',
    );
  }

  get claimCount(): number {
    return this._claims.length;
  }

  // ═══ Business Actions ═══
  activate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    const from = this._status.value;
    this._status = InsuranceStatusVO.active();
    this._activatedAt = now;
    this.emitStatusChange(from, 'active');
    this.addDomainEvent(
      new InsuranceActivatedEvent({
        aggregateId: this.id,
        payload: { insuranceId: this.id, activatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  expire(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('expired');
    const from = this._status.value;
    this._status = InsuranceStatusVO.create('expired');
    this._expiredAt = now;
    this.emitStatusChange(from, 'expired');
    this.addDomainEvent(
      new InsuranceExpiredEvent({
        aggregateId: this.id,
        payload: { insuranceId: this.id, expiredAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  cancel(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('cancelled');
    const from = this._status.value;
    this._status = InsuranceStatusVO.create('cancelled');
    this._cancelledAt = now;
    this._cancelReason = reason;
    this.emitStatusChange(from, 'cancelled', reason);
    this.addDomainEvent(
      new InsuranceCancelledEvent({
        aggregateId: this.id,
        payload: { insuranceId: this.id, reason, cancelledAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  submitClaim(
    params: {
      claimId: string;
      claimNumber: string;
      reason: string;
      description?: string;
      images?: readonly string[];
      amount: number;
    },
    now: string = new Date().toISOString(),
  ): void {
    if (!this.isClaimable()) {
      throw new BusinessRuleError(
        `Insurance is not claimable (status: "${this._status.value}", expired: ${this.isExpiredByDate()})`,
        'INSURANCE_CLAIM_NOT_ALLOWED',
        { insuranceId: this.id, status: this._status.value },
      );
    }
    if (this.activeClaim) {
      throw new BusinessRuleError(
        'An active claim already exists',
        'INSURANCE_ACTIVE_CLAIM_EXISTS',
        { insuranceId: this.id, activeClaimId: this.activeClaim.id },
      );
    }
    if (params.amount <= 0 || params.amount > this._declaredValue) {
      throw new ValidationError(
        `Claim amount must be 1-${this._declaredValue}`,
        'amount',
      );
    }

    const claim: ClaimState = {
      id: params.claimId,
      claimNumber: params.claimNumber,
      reason: params.reason,
      description: params.description,
      images: params.images,
      amount: params.amount,
      status: 'submitted',
      submittedAt: now,
    };
    this._claims.push(claim);
    this._isClaimed = true;
    this.addDomainEvent(
      new InsuranceClaimSubmittedEvent({
        aggregateId: this.id,
        payload: {
          insuranceId: this.id,
          claimId: params.claimId,
          claimNumber: params.claimNumber,
          amount: params.amount,
          currency: this._currency,
          submittedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  reviewClaim(claimId: string, now: string = new Date().toISOString()): void {
    const claim = this._claims.find((c) => c.id === claimId);
    if (!claim) {
      throw new BusinessRuleError(
        `Claim "${claimId}" not found`,
        'CLAIM_NOT_FOUND',
        { insuranceId: this.id, claimId },
      );
    }
    if (claim.status !== 'submitted') {
      throw new BusinessRuleError(
        `Cannot review claim in status "${claim.status}"`,
        'INVALID_CLAIM_STATUS',
        { claimId, status: claim.status },
      );
    }
    const idx = this._claims.indexOf(claim);
    this._claims[idx] = {
      ...claim,
      status: 'under_review',
      reviewedAt: now,
    };
    this.addDomainEvent(
      new InsuranceClaimReviewedEvent({
        aggregateId: this.id,
        payload: { insuranceId: this.id, claimId, reviewedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  approveClaim(
    claimId: string,
    approvedAmount: number,
    now: string = new Date().toISOString(),
  ): void {
    const claim = this._claims.find((c) => c.id === claimId);
    if (!claim) {
      throw new BusinessRuleError(
        `Claim "${claimId}" not found`,
        'CLAIM_NOT_FOUND',
        { insuranceId: this.id, claimId },
      );
    }
    if (claim.status !== 'under_review') {
      throw new BusinessRuleError(
        `Cannot approve claim in status "${claim.status}"`,
        'INVALID_CLAIM_STATUS',
        { claimId, status: claim.status },
      );
    }
    if (approvedAmount < 0 || approvedAmount > claim.amount) {
      throw new ValidationError(
        `Approved amount must be 0-${claim.amount}`,
        'approvedAmount',
      );
    }
    const idx = this._claims.indexOf(claim);
    this._claims[idx] = {
      ...claim,
      status: 'approved',
      approvedAmount,
      approvedAt: now,
    };
    this.addDomainEvent(
      new InsuranceClaimApprovedEvent({
        aggregateId: this.id,
        payload: {
          insuranceId: this.id,
          claimId,
          approvedAmount,
          currency: this._currency,
          approvedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  rejectClaim(
    claimId: string,
    reason: string,
    now: string = new Date().toISOString(),
  ): void {
    const claim = this._claims.find((c) => c.id === claimId);
    if (!claim) {
      throw new BusinessRuleError(
        `Claim "${claimId}" not found`,
        'CLAIM_NOT_FOUND',
        { insuranceId: this.id, claimId },
      );
    }
    if (claim.status !== 'submitted' && claim.status !== 'under_review') {
      throw new BusinessRuleError(
        `Cannot reject claim in status "${claim.status}"`,
        'INVALID_CLAIM_STATUS',
        { claimId, status: claim.status },
      );
    }
    const idx = this._claims.indexOf(claim);
    this._claims[idx] = {
      ...claim,
      status: 'rejected',
      rejectedAt: now,
      rejectionReason: reason,
    };
    this.addDomainEvent(
      new InsuranceClaimRejectedEvent({
        aggregateId: this.id,
        payload: {
          insuranceId: this.id,
          claimId,
          reason,
          rejectedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  payClaim(claimId: string, now: string = new Date().toISOString()): void {
    const claim = this._claims.find((c) => c.id === claimId);
    if (!claim) {
      throw new BusinessRuleError(
        `Claim "${claimId}" not found`,
        'CLAIM_NOT_FOUND',
        { insuranceId: this.id, claimId },
      );
    }
    if (claim.status !== 'approved') {
      throw new BusinessRuleError(
        `Cannot pay claim in status "${claim.status}"`,
        'INVALID_CLAIM_STATUS',
        { claimId, status: claim.status },
      );
    }
    const idx = this._claims.indexOf(claim);
    this._claims[idx] = {
      ...claim,
      status: 'paid',
      paidAt: now,
    };
    this.addDomainEvent(
      new InsuranceClaimPaidEvent({
        aggregateId: this.id,
        payload: {
          insuranceId: this.id,
          claimId,
          paidAmount: claim.approvedAmount ?? 0,
          currency: this._currency,
          paidAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid insurance status transition: "${this._status.value}" → "${target}"`,
        'INVALID_INSURANCE_STATUS_TRANSITION',
        { from: this._status.value, to: target, insuranceId: this.id },
      );
    }
  }

  private emitStatusChange(from: string, to: string, reason?: string): void {
    this.addDomainEvent(
      new InsuranceStatusChangedEvent({
        aggregateId: this.id,
        payload: { insuranceId: this.id, fromStatus: from, toStatus: to, reason },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: InsuranceIdVO;
    props: Omit<InsuranceEntityProps, 'status' | 'isClaimed' | 'claims'>;
    now: string;
  }): InsuranceEntity {
    const entity = new InsuranceEntity(
      params.id.value,
      params.now,
      params.now,
      {
        ...params.props,
        status: InsuranceStatusVO.create('pending'),
        isClaimed: false,
        claims: [],
      },
    );
    entity.addDomainEvent(
      new InsuranceCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          insuranceId: params.id.value,
          policyNumber: params.props.policyNumber,
          type: params.props.type.value,
          declaredValue: params.props.declaredValue,
          premium: params.props.premium,
          currency: params.props.currency,
          createdAt: params.now,
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
    props: InsuranceEntityProps;
    version?: number;
  }): InsuranceEntity {
    const entity = new InsuranceEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
