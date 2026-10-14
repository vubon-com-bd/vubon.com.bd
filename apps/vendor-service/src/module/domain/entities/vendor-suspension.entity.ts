/**
 * VendorSuspensionEntity — Child Entity
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import {
  VendorSuspensionVO,
  type VendorSuspensionVOProps,
} from '../value-objects/composites/vendor-suspension.vo.js';
import { SuspensionStatusVO } from '../value-objects/primitives/suspension-status.vo.js';

export interface VendorSuspensionEntityProps {
  readonly vo: VendorSuspensionVO;
}

export class VendorSuspensionEntity extends BaseEntity<string> {
  private _vo: VendorSuspensionVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorSuspensionEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorSuspensionVO { return this._vo; }
  get suspensionId() { return this._vo.id; }
  get vendorId() { return this._vo.vendorId; }
  get status() { return this._vo.status; }
  get reason() { return this._vo.reason; }
  get description(): string | undefined { return this._vo.description; }
  get suspendedAt(): string { return this._vo.suspendedAt; }
  get suspendedBy(): string { return this._vo.suspendedBy; }
  get durationDays(): number | undefined { return this._vo.durationDays; }
  get liftedAt(): string | undefined { return this._vo.liftedAt; }
  get liftedBy(): string | undefined { return this._vo.liftedBy; }
  get liftReason(): string | undefined { return this._vo.liftReason; }
  get appealDeadline(): string | undefined { return this._vo.appealDeadline; }
  get expectedLiftDate(): string | null { return this._vo.expectedLiftDate; }
  get daysRemaining(): number | null { return this._vo.daysRemaining; }

  // ═══ Predicates ═══
  isActive(): boolean { return this._vo.isActive(); }
  isLifted(): boolean { return this._vo.isLifted(); }
  isExpired(): boolean { return this._vo.isExpired(); }
  isUnderAppeal(): boolean { return this._vo.isUnderAppeal(); }
  isCurrentlyInEffect(): boolean { return this._vo.isCurrentlyInEffect(); }
  isSevere(): boolean { return this._vo.isSevere(); }
  isAutoResolvable(): boolean { return this._vo.isAutoResolvable(); }
  isPastExpectedLift(): boolean { return this._vo.isPastExpectedLift(); }
  canAppeal(): boolean { return this._vo.canAppeal(); }

  // ═══ Business Actions ═══
  lift(liftedBy: string, liftReason?: string, now: string = new Date().toISOString()): void {
    if (!this.isCurrentlyInEffect()) {
      throw new BusinessRuleError(
        `Cannot lift suspension in status "${this.status.value}"`,
        'SUSPENSION_CANNOT_BE_LIFTED',
        { suspensionId: this.id, status: this.status.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorSuspensionVO.create({
      ...current,
      status: SuspensionStatusVO.lifted(),
      liftedAt: now,
      liftedBy,
      liftReason,
    });
    this.touch(now);
  }

  expire(now: string = new Date().toISOString()): void {
    if (!this.isActive()) return;
    const current = this._vo.value;
    this._vo = VendorSuspensionVO.create({
      ...current,
      status: SuspensionStatusVO.expired(),
    });
    this.touch(now);
  }

  appeal(appealNotes: string, now: string = new Date().toISOString()): void {
    if (!appealNotes || appealNotes.trim().length === 0) {
      throw new ValidationError('Appeal notes required', 'appealNotes');
    }
    if (!this.canAppeal()) {
      throw new BusinessRuleError(
        'Cannot appeal: window closed or not active',
        'SUSPENSION_APPEAL_WINDOW_CLOSED',
        { suspensionId: this.id },
      );
    }
    const current = this._vo.value;
    this._vo = VendorSuspensionVO.create({
      ...current,
      status: SuspensionStatusVO.underAppeal(),
      appealNotes,
    });
    this.touch(now);
  }

  rejectAppeal(now: string = new Date().toISOString()): void {
    if (!this.isUnderAppeal()) return;
    const current = this._vo.value;
    this._vo = VendorSuspensionVO.create({
      ...current,
      status: SuspensionStatusVO.active(),
    });
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorSuspensionVO;
    now: string;
  }): VendorSuspensionEntity {
    return new VendorSuspensionEntity(params.id, params.now, params.now, { vo: params.vo }, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VendorSuspensionEntityProps;
  }): VendorSuspensionEntity {
    return new VendorSuspensionEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
