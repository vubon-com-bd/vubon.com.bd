/**
 * VendorSuspensionEntity — a single suspension record
 * @module vendor-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_SUSPENSION } from '@vubon/shared-constants/business';
import { SuspensionReasonVO } from '../value-objects/primitives/suspension-reason.vo.js';

export interface VendorSuspensionEntityProps {
  readonly vendorId: string;
  readonly reason: SuspensionReasonVO;
  readonly suspendedAt: string;
  readonly suspendedBy: string;
  readonly durationDays: number;
  readonly notes?: string;
  readonly appealDeadline?: string;
  readonly appealSubmittedAt?: string;
  readonly appealReason?: string;
  readonly liftedAt?: string;
  readonly liftedBy?: string;
  readonly autoLiftOnResolution: boolean;
}

export class VendorSuspensionEntity extends AggregateRoot<string> {
  private _reason: SuspensionReasonVO;
  private _durationDays: number;
  private _notes?: string;
  private _appealDeadline?: string;
  private _appealSubmittedAt?: string;
  private _appealReason?: string;
  private _liftedAt?: string;
  private _liftedBy?: string;

  private readonly _vendorId: string;
  private readonly _suspendedAt: string;
  private readonly _suspendedBy: string;
  private readonly _autoLiftOnResolution: boolean;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorSuspensionEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._reason = props.reason;
    this._suspendedAt = props.suspendedAt;
    this._suspendedBy = props.suspendedBy;
    this._durationDays = props.durationDays;
    this._notes = props.notes;
    this._appealDeadline = props.appealDeadline;
    this._appealSubmittedAt = props.appealSubmittedAt;
    this._appealReason = props.appealReason;
    this._liftedAt = props.liftedAt;
    this._liftedBy = props.liftedBy;
    this._autoLiftOnResolution = props.autoLiftOnResolution;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (Number.isNaN(Date.parse(this._suspendedAt))) {
      throw new ValidationError('suspendedAt must be a valid ISO timestamp', 'suspendedAt');
    }
    if (!Number.isInteger(this._durationDays) || this._durationDays <= 0) {
      throw new ValidationError('Duration must be a positive integer', 'durationDays');
    }
    if (this._durationDays > VENDOR_SUSPENSION.MAX_DURATION_DAYS) {
      throw new ValidationError(
        `Duration cannot exceed ${VENDOR_SUSPENSION.MAX_DURATION_DAYS} days`,
        'durationDays',
      );
    }
  }

  get vendorId(): string { return this._vendorId; }
  get reason(): SuspensionReasonVO { return this._reason; }
  get suspendedAt(): string { return this._suspendedAt; }
  get suspendedBy(): string { return this._suspendedBy; }
  get durationDays(): number { return this._durationDays; }
  get liftedAt(): string | undefined { return this._liftedAt; }
  get isLifted(): boolean { return this._liftedAt !== undefined; }

  get notes(): string | undefined { return this._notes; }
  get appealDeadline(): string | undefined { return this._appealDeadline; }
  get appealSubmittedAt(): string | undefined { return this._appealSubmittedAt; }
  get appealReason(): string | undefined { return this._appealReason; }
  get liftedBy(): string | undefined { return this._liftedBy; }
  get autoLiftOnResolution(): boolean { return this._autoLiftOnResolution; }

  calculateLiftDate(): Date {
    return new Date(Date.parse(this._suspendedAt) + this._durationDays * 24 * 60 * 60 * 1000);
  }

  isExpired(at: Date = new Date()): boolean {
    return at.getTime() >= this.calculateLiftDate().getTime();
  }

  daysRemaining(at: Date = new Date()): number {
    const diff = this.calculateLiftDate().getTime() - at.getTime();
    return diff <= 0 ? 0 : Math.ceil(diff / (24 * 60 * 60 * 1000));
  }

  isActive(at: Date = new Date()): boolean {
    return !this.isLifted && !this.isExpired(at);
  }

  canAppeal(at: Date = new Date()): boolean {
    if (this._appealSubmittedAt) return false;
    if (this.isLifted) return false;
    if (!this._appealDeadline) return false;
    return at.getTime() <= Date.parse(this._appealDeadline);
  }

  submitAppeal(reason: string, now: string = new Date().toISOString()): void {
    if (!this.canAppeal(new Date(now))) {
      throw new BusinessRuleError(
        'Appeal window has closed or already submitted',
        'APPEAL_NOT_AVAILABLE',
        { suspensionId: this.id },
      );
    }
    if (!reason || reason.trim().length === 0) {
      throw new ValidationError('Appeal reason is required', 'appealReason');
    }
    this._appealSubmittedAt = now;
    this._appealReason = reason.trim();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  lift(liftedBy: string, now: string = new Date().toISOString()): void {
    if (this.isLifted) {
      throw new BusinessRuleError(
        'Suspension already lifted',
        'SUSPENSION_ALREADY_LIFTED',
        { suspensionId: this.id },
      );
    }
    this._liftedAt = now;
    this._liftedBy = liftedBy;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  extend(days: number, now: string = new Date().toISOString()): void {
    if (this.isLifted) {
      throw new BusinessRuleError(
        'Cannot extend lifted suspension',
        'SUSPENSION_ALREADY_LIFTED',
        { suspensionId: this.id },
      );
    }
    const newDuration = this._durationDays + days;
    if (newDuration > VENDOR_SUSPENSION.MAX_DURATION_DAYS) {
      throw new ValidationError(
        `Extended duration cannot exceed ${VENDOR_SUSPENSION.MAX_DURATION_DAYS} days`,
        'durationDays',
      );
    }
    this._durationDays = newDuration;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  static computeAppealDeadline(suspendedAt: string): string {
    const base = new Date(suspendedAt);
    return new Date(base.getTime() + VENDOR_SUSPENSION.APPEAL_WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString();
  }

  static create(params: {
    id: string;
    vendorId: string;
    reason: SuspensionReasonVO;
    durationDays: number;
    suspendedBy: string;
    notes?: string;
    now: string;
  }): VendorSuspensionEntity {
    return new VendorSuspensionEntity(
      params.id,
      params.now,
      params.now,
      {
        vendorId: params.vendorId,
        reason: params.reason,
        suspendedAt: params.now,
        suspendedBy: params.suspendedBy,
        durationDays: params.durationDays,
        notes: params.notes,
        appealDeadline: VendorSuspensionEntity.computeAppealDeadline(params.now),
        autoLiftOnResolution: VENDOR_SUSPENSION.AUTO_LIFT_ON_RESOLUTION,
      },
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorSuspensionEntityProps;
    deletedAt?: string | null;
    version?: number;
  }): VendorSuspensionEntity {
    const entity = new VendorSuspensionEntity(
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
